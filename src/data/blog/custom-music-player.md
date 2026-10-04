---
title: "I Built My Music Player Out of Small Tools"
description: "I did not want ads, shady mods, or an app I could not fully trust. So I put together mpv, playerctl, rofi and a sandboxed spotdl into a music player that lives inside my Sway desktop."
pubDatetime: 2026-10-04T12:00:00Z
tags:
    - linux
    - sway
    - mpv
    - music
    - bubblewrap
    - rofi
draft: false
featured: true
---

There is a lot of software out there that can download music, play it, or manage it. Sometimes one app does all three, sometimes you need a few. Most of it comes from people I have no reason to trust.

## The options I looked at

Spotify is good, but I can't download songs there and I still get ads. YouTube Music lets me download, but it also has ads.

A Spotify client with mods is another option, but mods are a security risk. There are also complete apps that use the Spotify API for song details and YouTube Music for downloads. That works, but then I have to trust the app.

I could run one of those apps inside a sandbox. The problem is that I don't really like GUIs, and I haven't found a good terminal app for this yet.

After going around in circles, I decided to stop looking for the perfect screwdriver online. I would build something from the most basic and trusted tools I already use.

## The pieces

- **mpv** plays the music.
- **mpris plugin for mpv** lets other programs see and control mpv as a music player.
- **playerctl** is a command line tool that controls any music player that supports MPRIS.
- **spotdl** downloads songs, and **bubblewrap** runs it in a sandbox.
- **rofi** is the menu where I pick songs and playlists.
- **notify-send** shows the current track.
- **Sway** ties it all together with keybindings.

## mpv as a music player

I only found out recently that mpv works well as a music player. On its own it was not enough, because I had no easy way to control it from outside. With the mpris plugin, it shows up as a normal music player, and playerctl can control it:

```bash
playerctl play-pause
playerctl next
playerctl previous
playerctl position 5+
playerctl metadata title
```

This became my common interface. Anything I want mpv to do goes through playerctl.

## Downloading safely with spotdl

spotdl reads song details from Spotify and downloads the audio from YouTube Music. I am fine with using it, but I do not want to give it access to my whole home folder.

So I wrapped it in bubblewrap. It runs a program inside a box that can only see the folders you allow. Here is my wrapper, `~/.local/bin/spotdl-wrapper`:

```bash
#!/usr/bin/env bash

BASE="$HOME/Music/spotdl"
OUTPUT_DIR="."
ARGS=()

while (($#)); do
    case "$1" in
        -d|--directory)
            if [[ -z "$2" ]]; then
                echo "error: $1 requires a directory name" >&2
                exit 1
            fi

            OUTPUT_DIR="$2"
            mkdir -p "$BASE/$OUTPUT_DIR"
            shift 2
            ;;

        *)
            ARGS+=("$1")
            shift
            ;;
    esac
done

bwrap \
    --ro-bind /usr /usr \
    --ro-bind /bin /bin \
    --ro-bind /lib /lib \
    --ro-bind /lib64 /lib64 \
    --ro-bind /etc /etc \
    --proc /proc \
    --dev /dev \
    --tmpfs /tmp \
    --dir /home \
    --dir /home/$USER \
    --bind "$BASE" "/home/$USER" \
    --unshare-all \
    --share-net \
    --new-session \
    spotdl \
        --output "/home/$USER/$OUTPUT_DIR/{title}.{output-ext}" \
        "${ARGS[@]}"
```

Here is what the sandbox does:

- System folders like `/usr` and `/bin` are mounted read only, so spotdl can use them but not change them.
- `/tmp` is a fresh empty folder.
- The only folder it can write to is `~/Music/spotdl`. Inside the sandbox, that folder looks like the home folder.
- Everything else is cut off, except the network, because spotdl needs the internet.

The `-d` option picks a subfolder, so each playlist can have its own folder:

```bash
spotdl-wrapper -d lofi download "https://open.spotify.com/playlist/..."
```

## Picking music with rofi

I wrote two small scripts. The first one lists every mp3 file and lets me pick one. It plays that song on repeat. This is `~/.local/bin/rofi-song`:

```sh
#!/bin/sh

BASE="$HOME/Music"

SONG=$(
    find "$BASE" -type f \
        ! -path '*/.*' \
        -iname '*.mp3' \
        -print |
    rofi -dmenu -i -p "Song"
)

[ -n "$SONG" ] && (
    pkill -x mpv
    mpv --loop=inf --no-audio-display "$SONG"
)
```

The second one lists every folder that has at least one mp3 in it. I pick a folder, and mpv plays it shuffled and in a loop. This is `~/.local/bin/rofi-playlist`:

```sh
#!/bin/sh

BASE="$HOME/Music"

DIR=$(
    find "$BASE" -type d ! -path '*/.*' -print0 |
    while IFS= read -r -d '' dir; do
        find "$dir" -type f -iname '*.mp3' ! -path '*/.*' -print -quit |
            grep -q . && printf '%s\n' "$dir"
    done |
    rofi -dmenu -i -p "Music"
)

[ -n "$DIR" ] && (pkill -x mpv; mpv --no-video --loop-playlist=yes --shuffle "$DIR")
```

Both scripts stop any running mpv first, so I never end up with two songs playing at once. Make them executable:

```bash
chmod +x ~/.local/bin/rofi-song ~/.local/bin/rofi-playlist ~/.local/bin/spotdl-wrapper
```

## Controlling it from Sway

Sway has a feature called submaps (it calls them modes). You press one key to enter a mode, and then a single key does an action. This keeps my normal keybindings free. This is in `~/.config/sway/config.d/60-keybinds-submaps`:

```
mode "play" {
        bindsym p exec --no-startup-id ~/.local/bin/rofi-playlist; mode "default"
        bindsym s exec --no-startup-id ~/.local/bin/rofi-song; mode "default"

        bindsym q mode "default"
        bindsym Escape mode "default"
}

mode "music" {
        bindsym Space exec --no-startup-id playerctl play-pause; mode "default"
        bindsym e exec --no-startup-id pkill -x mpv; mode "default"

        bindsym n exec --no-startup-id playerctl next; mode "default"
        bindsym Shift+n exec --no-startup-id playerctl previous; mode "default"

        bindsym s exec --no-startup-id playerctl position 5+
        bindsym Shift+s exec --no-startup-id playerctl position 5-

        bindsym i exec --no-startup-id sh -c "notify-send '$(playerctl metadata title)' '$(playerctl metadata artist)'"; mode "default"

        bindsym p mode "play"

        bindsym q mode "default"
        bindsym Escape mode "default"
}

bindsym $mod+m mode "music"
```

I press `$mod+m` to enter the music mode. From there:

- `Space` plays or pauses.
- `n` goes to the next song, `Shift+n` goes to the previous one.
- `s` seeks forward 5 seconds, `Shift+s` seeks back 5 seconds.
- `i` shows a notification with the current song and artist.
- `p` opens the play mode, where `p` picks a playlist and `s` picks a song.
- `e` quits mpv.
- `q` or `Escape` leaves the mode.

The seek keys do not leave the mode on purpose. That way I can tap `s` a few times to skip ahead.

## What I want to add next

I plan to add a small cache file that remembers the last playlist or song I played. Then I can bring it back with one key.

## How it feels now

I now have a music player built straight into my desktop. It does not have ads, it does not need a mod I can't trust, and the only part that touches the internet runs in a sandbox. Every piece is a small tool I already know, so if one part breaks, I know where to look.
