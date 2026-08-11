---
title: "Putting My Browser in a Podman Container"
description: "I wanted to run my browser inside a rootless container without giving up the normal Wayland desktop experience. This is how I got Qutebrowser running as a regular Sway window with GPU access."
pubDatetime: 2026-08-11T19:00:00Z
tags:
    - linux
    - podman
    - wayland
    - sway
    - containers
draft: false
featured: true
---

I've been using containers more heavily on my Linux system, and eventually I started wondering whether I could put my browser inside one too.

Not because browsers need another way to install them. I was more interested in the isolation.

I wanted the browser to have its own filesystem and environment while still behaving like a normal desktop application. If I opened Qutebrowser, I wanted it to simply appear as another window in Sway.

No virtual machine. No nested desktop. No weird remote display setup.

Just a browser in a container, talking to my existing Wayland session.

## Distrobox was the obvious starting point

The idea actually came from Distrobox.

Distrobox is very good at taking a container and making it feel like part of your normal Linux environment. You can install packages inside the container and run them almost like native applications.

That sounded pretty close to what I wanted.

But there was an important difference.

Distrobox is designed around **integration**, not **application isolation**.

For a development environment, that's exactly what you want. You generally want the container to have access to your home directory, devices, sockets, and other parts of the host.

For a browser sandbox, I wanted almost the opposite.

I wanted to decide exactly what the browser could access.

I could have spent time figuring out which parts of Distrobox I needed to override, but I had a feeling that I'd end up fighting the tool instead of solving the actual problem.

So I started looking at what was underneath Distrobox.

## There were other obvious options

The first was Flatpak.

Flatpak already solves a large part of this problem. It packages applications and their dependencies and provides a sandbox around them.

But I didn't really want to go down that road for this experiment.

Flatpak brings its own ecosystem of runtimes, portals, permissions, packaging conventions, and dependencies. Those are useful when you're distributing applications, but that wasn't what I was trying to do.

I didn't want to spend time understanding an entire application distribution system just to put one browser in a box.

Then there was Bubblewrap.

In hindsight, **Bubblewrap was probably the most obvious tool for what I was trying to accomplish.**

It is specifically designed for creating application sandboxes. You start with a restricted environment and explicitly expose the things the application needs.

That's almost exactly what I wanted.

And I don't really have a good excuse for not starting there.

The reason I ended up with Podman was mostly practical. I was already working with Podman and its storage setup, and I liked the idea of giving the browser a complete Fedora userspace of its own.

That gave me a clean environment where I could install Firefox, Qutebrowser, and whatever libraries they needed without touching the host.

So I decided to try the slightly heavier solution first.

## The plan

The basic idea was simple:

```text
Host
 │
 └── Sway
      │
      └── Wayland socket
              │
              ▼
        Podman container
              │
              └── Qutebrowser
                    │
                    └── GPU render node
```

The container would have its own filesystem and user environment, but the browser would still use the host's Wayland compositor.

## Building the image

I started with a very small Fedora image:

```dockerfile
FROM fedora:latest

RUN --mount=type=cache,target=/var/cache/dnf \
    --mount=type=cache,target=/var/cache/libdnf5 \
    dnf install -y \
        firefox \
        qutebrowser

RUN useradd -m -u 1000 -s /bin/bash browser

RUN mkdir -p /tmp/runtime && \
    chown browser:browser /tmp/runtime && \
    chmod 700 /tmp/runtime

USER browser
WORKDIR /home/browser
```

There are two details worth pointing out.

First, the browser runs as a normal user. I didn't want to disable the browser sandbox just because the process happened to be inside a container.

Second, I created a private runtime directory for the container. Wayland and Qt expect `XDG_RUNTIME_DIR` to have the right ownership and permissions.

With the image built, it was time to figure out how to connect it to Sway.

## Finding the Wayland socket

On the host, the relevant environment variables were:

```text
XDG_RUNTIME_DIR=/run/user/1000
WAYLAND_DISPLAY=wayland-1
```

So the actual Wayland socket was:

```text
/run/user/1000/wayland-1
```

My first assumption was that passing `WAYLAND_DISPLAY` into the container would be most of the work.

It wasn't.

`WAYLAND_DISPLAY` is only the name of the display. The browser also needs access to the Unix socket behind it.

So I mounted only that socket into the container:

```text
/run/user/1000/wayland-1
              │
              ▼
/tmp/runtime/wayland-1
```

I deliberately didn't mount the entire `/run/user/1000` directory.

If I'm trying to isolate an application, giving it access to every runtime socket on my desktop would be a strange place to start.

## The first problem: UID mapping

The container already had a `browser` user with UID 1000:

```text
browser:x:1000:1000
```

My host user was also UID 1000. So I expected the Wayland socket to work. It didn't.

The problem was rootless Podman's user namespace. UID 1000 inside the container wasn't automatically the same identity as UID 1000 on the host.

The browser couldn't access the Wayland socket. The fix was:

```bash
--userns=keep-id
```

This tells Podman to preserve the current user's identity inside the container. Once I added that, the browser could access the Wayland socket.

We were finally talking to Sway.

## Then the GPU got involved

The next problem was GPU access. The browser could connect to Wayland, but Mesa couldn't find a usable GPU device.

On the host, I had:

```text
/dev/dri/card0
/dev/dri/renderD128
```

I didn't want to expose the entire GPU device tree just to render a browser window.

The render node was enough, so I passed only:

```bash
--device /dev/dri/renderD128
```

That fixed the GPU rendering problem.

I didn't need `--privileged`, and I didn't need to give the container broad access to `/dev`. That was a useful confirmation that the container could remain fairly narrow.

## And then it worked

The final command was:

```bash
podman run --rm -it \
  --userns=keep-id \
  --device /dev/dri/renderD128 \
  -e WAYLAND_DISPLAY="$WAYLAND_DISPLAY" \
  -e XDG_RUNTIME_DIR=/tmp/runtime \
  -v "$XDG_RUNTIME_DIR/$WAYLAND_DISPLAY:/tmp/runtime/$WAYLAND_DISPLAY" \
  localhost/browser \
  qutebrowser
```

Qutebrowser appeared as a completely normal window in Sway. There was no nested desktop.

No X11 forwarding. No virtual display.

The browser was simply running inside the container and talking directly to the host's Wayland compositor.

## There are still some rough edges

The browser works, but this is not yet a finished desktop environment.

Qutebrowser currently reports that it can't connect to D-Bus:

```text
Failed to connect to the bus:
Failed to connect to socket /run/dbus/system_bus_socket
```

There is also a VA-API warning from Nouveau:

```text
libva error: /usr/lib64/dri/nouveau_drv_video.so init failed
```

Neither prevents the browser from opening and rendering, so I haven't tackled them yet.

There are also several pieces of desktop integration still missing:

* Clipboard
* Audio
* Desktop portals
* File dialogs
* Persistent browser profile
* Hardware video decoding

I want to add these individually rather than throwing the entire host environment into the container.

## What I actually ended up building

The interesting thing is how little the browser needs from the host. At the moment, the important pieces are basically:

```text
Wayland socket
       +
GPU render node
       +
host user identity
```

Everything else can be added when there is an actual reason for it.

That's also why I'm interested in trying Bubblewrap eventually. It may be a better fit for the pure application-sandbox part of this experiment.

But Podman has one advantage that I like here: the browser gets a complete, reproducible Fedora userspace without me having to install its packages directly on the host.

So I ended up with something that sits somewhere between a traditional container and an application sandbox.

The browser lives in its own environment, but it still feels like a normal Linux application. And that was the whole point.

## Future work

The browser can render and use the GPU now, but there are still a few desktop integrations to figure out.

The biggest one is **file access**. Since the container doesn't have access to the host filesystem, features like file pickers and downloads will need explicit bridges back to the host. Desktop portals look like the right approach here, since they can give the browser access to a file without exposing the rest of the filesystem.

The same idea applies to other desktop features such as the clipboard, PipeWire audio, and screen sharing. A persistent browser profile will also need to be added so the container can remain disposable while the browser's data survives.

The goal is to keep adding these integrations without losing the isolation that motivated this experiment in the first place.
