---
title: "Never Forget to Hydrate Again: A Minimalist Shell Script with Rofi + systemd"
description: "A no-nonsense shell script that nudges you to drink water on the hourly, using a slick Rofi prompt and systemd timers. Stay refreshed with zero fluff and all the simplicity."
pubDatetime: 2025-09-25T10:00:00Z
tags:
  - shell
  - rofi
  - bash
  - systemd
  - scripting
  - health
draft: false
featured: false
---

Let’s cut the crap and get straight to what really matters: reminding yourself to drink water without annoying pop-ups or battery-killing apps.

## Why?

Because if you’re like me, juggling code and caffeine, it’s way too easy to forget the simplest but most important habit: hydration. So here’s a tiny shell script that uses Rofi - yes, the ultimate app launcher turned popup wizard - as a front-end prompt to remind you to hydrate.

## The Super Simple Script: hydrate.sh

Drop this bad boy anywhere you like. I stash mine in `~/.config/rofi/applets/bin` because I roll with [Aditya Shakya’s fabulous Rofi templates](https://github.com/adi1090x/rofi).

```sh file=hydrate.sh

#!/bin/bash

if [ -z "$DISPLAY" ]; then
    echo "No DISPLAY found. Exiting."
    exit 0
fi

yes='Done'
no='Later'
# You can also use nerd fonts to make these prettier:  

selected=$(
    echo -e "$no\n$yes" | rofi -theme-str 'window {location: center; anchor: center; fullscreen: false; width: 350px;}' \
        -theme-str 'mainbox {orientation: vertical; children: [ "message", "listview" ];}' \
        -theme-str 'listview {columns: 2; lines: 1;}' \
        -theme-str 'element-text {horizontal-align: 0.5;}' \
        -theme-str 'textbox {horizontal-align: 0.5;}' \
        -dmenu \
        -p 'Confirmation' \
        -mesg 'Time to drink some water' \
        -theme $HOME/.config/rofi/applets/type-1/style-2.rasi
)

if [[ $selected == $yes ]]; then
    echo "Done"
else
    echo "Later"
    sleep 300
    exec $0
fi
```

Make it executable with `chmod +x hydrate.sh` and you’re golden.

## Making It Automatic: systemd To The Rescue

```systemd file=~/.config/systemd/user/hydrate.service

[Unit]
Description=Remind the user to drink water

[Service]
Type=oneshot
ExecStart=/home/barinr/.config/rofi/applets/bin/hydrate.sh
```

```systemd file=~/.config/systemd/user/hydrate.timer

[Unit]
Description=Hourly reminder to drink water

[Timer]
OnCalendar=hourly
Persistent=true

[Install]
WantedBy=timers.target
```

Put both in `~/.config/systemd/user/`, then:

- Run `systemctl --user enable --now hydrate.timer`
- Voilà! You’ve got hourly hydration nudges without lifting a finger.

## A Couple of Pro-Tips

- The script checks for `$DISPLAY` to make sure your GUI session is live. No display, no popup. Simple.
- You can remove the `-theme-str` options if you’re not using Aditya’s Rofi themes—but hey, you should check them out. They’re 🔥
- The timer is your best friend here. It makes sure the script runs hourly without any hacks or cron mess.

## What’s the takeaway?

Just a few lines of bash, a bit of Rofi magic, and systemd’s timer power make keeping hydrated way more fun and less annoying. If you’re tired of dry mouths and forgetful days, give this a shot. Your body (and your code) will thank you.

Cheers! 💧
