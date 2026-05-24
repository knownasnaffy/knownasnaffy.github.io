---
title: "Never Ignore a Good Project README"
description: "My tantrum and advice after almost loosing my cool due to a piece of software"
pubDatetime: 2026-01-16T10:00:00Z
tags:
  - readme
  - documentation
  - debugging
  - configuration
  - linux
  - developer-mistakes
draft: false
featured: false
---

Do you know why people add a README to their project before making it open source? (This is usually the case, some people are just special and don’t fall into this category.)

Well, I thought I did too… until I forgot.

Where did things go wrong, you ask?

I recently came across a really nice README. It answered questions before I even got the chance to ask them. The tiny problem was that I decided it couldn’t possibly get any better. So I skipped the testing, credits, etc. sections at the bottom, because, in my experience, they’re mostly useless.

Maybe you should follow along just to see for yourself:

[xdg-desktop-portal-termfilechooser](https://github.com/hunkyburrito/xdg-desktop-portal-termfilechooser)

I followed the setup precisely according to my requirements and eventually reached the point where I could finally start using the file chooser. But I wanted a different terminal to use with yazi, because I didn’t want to customize kitty. I kept reading the README and found out how to do that. Cool.

Then I did it.

In several ways.

Some of which weren’t even described in the guide. And maybe not even meant to be used in any scenario.

The first method failed because of my short-term memory, I named the config folder incorrectly while symlinking it to my dotfiles.

The rest failed because… well… I didn’t read the full README.

Here’s the fun part and the root cause: I decided to test the file chooser right after setting it up, and I got the command using zenity from ChatGPT. As I previously said, this was the confirmation that the approach was working.

But the README would have told me about this exact testing method too, if I hadn’t skipped the testing section.

Can you guess what else I skipped in that section?

How to reload config changes.

This tiny, crucial detail was sitting right there, hidden (from my dumb eyes) in the testing section.

I figured this out approximately **2 hours, 20 prompts, 10 GitHub issues, 1 `~/.config` removal with unsaved changes, ~100 commands, and 1 coffee** later.

The configuration loss hurt the most. I had just finished a Wayland recording script and a custom stylesheet for swaync using the TokyoNight theme. Thankfully, I had sent the recording script to ChatGPT a few hours earlier for suggestions, so I could recreate that.

The stylesheet? Gone. Reduced to atoms.

This also made me feel a little proud about maintaining a dotfiles repo... until I realized that if I didn’t maintain one, I wouldn’t have casually nuked `~/.config` in the first place, and none of this would’ve happened. So yeah, there was a significant neuron loss involved.

I finally found the solution when I had almost lost hope, after surfing deep in some GitHub issues, which then redirected me to the README. I applied it, and everything just worked.

I was trying to use `systemctl --user restart xdg-desktop-portal` in hopes that it would reflect my changes, but the solution was to use `systemctl --user restart xdg-desktop-portal-termfilechooser`

Lesson learned: **Read the README.**

It’s named that for a reason.
