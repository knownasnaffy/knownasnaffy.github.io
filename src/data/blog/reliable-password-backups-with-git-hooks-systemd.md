---
title: "Reliable Password Backups with Git Hooks and Systemd Timers"
description: "A simple and effective way to keep your password store backed up immediately after each change, with automatic retries handled by systemd timers if the push fails."
pubDatetime: 2025-11-25T10:00:00Z
tags:
  - pass
  - git-hooks
  - systemd
  - automation
  - backups
draft: false
featured: false
---

Backing up your password store is more than just pushing commits on a schedule. It requires pushing right after adding a new password. For someone who works on the computer for a lot of time, losing new passwords due to crashes or connectivity issues is a problem worth solving.

## Initial setup

Initially, I used a systemd timer to push .password-store once daily. It worked but was unreliable. I recently found out that OnCalendar=daily does not mean the timer starts on boot. Instead, the timer runs at the exact same time every day, often around midnight, which could be even less reliable as a backup method.

## Better approach

Git hooks are useful for automation, and more so for this use case of mine, as they can start pushing immediately after commits. If the push fails, a systemd timer retries every hour. The timer disables itself after a successful push.

## How it works

- The post-commit hook tries to push on every commit.
- If the push fails, a systemd timer is enabled for retries.
- The timer retry script tries pushing hourly until successful.
- On success, the timer disables automatically.

## Code highlights

**Post-commit hook:**

```bash file=post-commit.sh

#!/bin/sh
if git push origin main; then
    echo "Push succeeded."
else
    echo "Push failed. Starting pass-push.timer for retry..."
    systemctl --user enable pass-push.timer
fi
```

**Retry script:**

```bash file=pass-push.sh

#!/bin/bash
cd $HOME/.password-store || exit 1
if git push origin main; then
    echo "$(date): Push successful, stopping pass-push.timer"
    systemctl --user disable pass-push.timer
else
    echo "$(date): Push failed, retrying later."
    exit 1
fi
```

**Pass push timer:**

```systemd file=~/.config/systemd/user/pass-push.timer

[Unit]
Description=Hourly git push backup for pass in case of failure in the post-commit push

[Timer]
OnCalendar=hourly
Persistent=true

[Install]
WantedBy=timers.target
```

**Pass push service:**

```systemd file=~/.config/systemd/user/pass-push.service

[Unit]
Description=Push pass git store to remote

[Service]
Type=oneshot
ExecStart=%h/.local/bin/pass-push.sh
```

## Why this works well

- Immediate push attempts keep backups up to date.
- Hourly retries ensure backups happen even during connectivity issues.
- Self-disabling timers avoid wasting resources.
- Hope this was useful to you.
