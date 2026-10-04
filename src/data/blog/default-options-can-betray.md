---
title: "Not Every Default Is Made for You"
description: "My i3status battery number never went above 90.53%, and it turned out the default shows battery health instead of charge. This is how I found out, fixed it, and ended up writing a systemd unit to keep my charge limit at 80%."
pubDatetime: 2026-04-14T12:00:00Z
tags:
    - linux
    - i3
    - battery
    - systemd
    - upower
draft: false
featured: false
---

Today I learned that the default battery number in i3status is not the one I expected. It shows battery health, not the current charge. I think this is a strange default, because most people want to know how much charge is left, not how worn out the battery is. It made me realize that a default is not always chosen with the average user in mind.

## The odd number

I noticed that the highest value my status bar ever showed was 90.53%. Something about that looked off. I had set a charging limit at the firmware level, so I expected a round number like 80% or 90%. A value with a ".53" on the end did not fit either of them, so I went looking.

## Two numbers that sound similar

A battery reports a few values. You can read them directly:

```bash
cat /sys/class/power_supply/BAT0/energy_now
cat /sys/class/power_supply/BAT0/energy_full
cat /sys/class/power_supply/BAT0/energy_full_design
```

- `energy_now` is the charge in the battery right now.
- `energy_full` is how much the battery can hold today. It shrinks as the battery ages.
- `energy_full_design` is how much it could hold when it was new. The manufacturer writes this value.

The current battery percentage is:

```
energy_now / energy_full
```

Battery health is:

```
energy_full / energy_full_design
```

i3status was dividing by the design capacity. So the number it showed was tied to how much the battery had aged, and a full battery would never show 100%. In my case the ceiling was 90.53%.

## Confirming with upower

To check, I looked at what upower reports:

```bash
upower -i $(upower -e | grep BAT)
```

The output includes `energy-full`, `energy-full-design`, `percentage` and `capacity`. The `capacity` line is the health number, and it matched what my bar was showing.

## Changing the default

i3status has an option for this. In the battery block of `~/.config/i3status/config`, set `last_full_capacity` to true:

```
battery all {
    format = "%status %percentage"
    last_full_capacity = true
}
```

Reload i3 with `$mod+Shift+r`. Now the percentage is measured against the last full charge instead of the design capacity.

## Firmware settings do not follow you between installs

While looking at the upower output, I found a second thing. It said my 80% charging limit was in place, but the laptop was still charging all the way to 100%.

This showed me that firmware settings do not carry over between operating systems. That includes two different Linux installs on the same machine. I had set the limit in an earlier install, and the new one did not have it applied, even though upower still reported it as active.

If your laptop supports a charge limit, you can check the current value with:

```bash
cat /sys/class/power_supply/BAT0/charge_control_end_threshold
```

The exact path can differ between laptops, so look inside `/sys/class/power_supply/` to find yours.

## My workaround: a systemd unit

Sometimes the limit sticks and sometimes it does not, so I stopped trusting it. Instead, I made a small systemd unit that runs as root and sets the limit to 80 on every start.

Create the file `/etc/systemd/system/charge-limit.service`:

```ini
[Unit]
Description=Set battery charge limit to 80%

[Service]
Type=oneshot
ExecStart=/bin/sh -c 'echo 80 > /sys/class/power_supply/BAT0/charge_control_end_threshold'

[Install]
WantedBy=multi-user.target
```

Then enable it and start it right away:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now charge-limit.service
```

Check that it worked:

```bash
cat /sys/class/power_supply/BAT0/charge_control_end_threshold
```

It should print `80`. Now it does not matter whether the firmware remembers the limit or not, because the unit sets it again on every boot.

## What I took from this

Defaults are made by someone for some kind of user, and that user is not always you. A number on your screen can be correct and still not answer the question you are asking. It is worth reading the docs for the tools you use every day, even for the things that seem to be working fine.
