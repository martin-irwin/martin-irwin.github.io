---
title: "After the long summer"
excerpt: "A few things from a long summer: a stubborn ThinkPad, a MiniDisc rabbit hole, Swiss bureaucracy, and what AI is actually good for."
date: 2026-10-14
tags:
  - ai
  - claude
  - linux
  - minidisc
  - gtr
  - watches
  - switzerland
header:
  image: /assets/images/IMG20260903202006.jpg
  teaser: /assets/images/IMG20260903202006.jpg
  og_image: /assets/images/IMG20260903202006.jpg
categories:
  - blog
published: true
summer_gallery:
  - url: /assets/images/IMG20260831154105.jpg
    image_path: /assets/images/IMG20260831154105.jpg
    alt: Pour-over coffee at home
  - url: /assets/images/IMG20260823103204.jpg
    image_path: /assets/images/IMG20260823103204.jpg
    alt: Three small plush animals by a window
  - url: /assets/images/IMG20260905172822.jpg
    image_path: /assets/images/IMG20260905172822.jpg
    alt: A cow sculpture outside a building
  - url: /assets/images/IMG20260803074406.jpg
    image_path: /assets/images/IMG20260803074406.jpg
    alt: A grey Alfa Romeo parked on a cobbled street
minidisc_gallery:
  - url: /assets/images/IMG20260829210632.jpg
    image_path: /assets/images/IMG20260829210632.jpg
    alt: An opened MiniDisc deck with its display board
  - url: /assets/images/1788597244296.jpg
    image_path: /assets/images/1788597244296.jpg
    alt: The inside of a disassembled MiniDisc deck
  - url: /assets/images/IMG20260804190717.jpg
    image_path: /assets/images/IMG20260804190717.jpg
    alt: A PSP playing music
car_and_watch_gallery:
  - url: /assets/images/IMG20260803165202.jpg
    image_path: /assets/images/IMG20260803165202.jpg
    alt: A Seiko watch on the wrist
  - url: /assets/images/IMG_20261007_1615482.jpg
    image_path: /assets/images/IMG_20261007_1615482.jpg
    alt: The rear of a Nissan GT-R
  - url: /assets/images/IMG20261011222416.jpg
    image_path: /assets/images/IMG20261011222416.jpg
    alt: A Nissan GT-R parked outside a dealership
cli_gallery:
  - url: /assets/images/IMG20260914161920.jpg
    image_path: /assets/images/IMG20260914161920.jpg
    alt: Claude Code running in a mobile terminal
---

It's been a good, long summer, and it's starting to wrap up. The trees are turning fantastic colours, and the heat is abating. The photo above is taken deep within the Swiss Alps one evening after work.

A few things I've been doing outside work.

{% include gallery id="summer_gallery" layout="half" caption="A few scenes from the summer; click to enlarge. Hario Coffee, plushies, Nissan GTR, and Alpha 4C." %}

## AI n stuff

**The ThinkPad that wouldn't boot.** My ThinkPad T480s stopped booting one evening: GRUB couldn't find a kernel. We spent the evening at the GRUB prompt piecing together partitions by hand, found a stale kernel from February on the EFI partition from an old Limine install, and limped into a running system.

The root cause, which I'd never have found alone: a pacman hook from the Omarchy Quattro migration was quietly shadowing the stock mkinitcpio hook. Every kernel update was trying to write a 63 MB image to a 100 MB EFI partition I'd inherited from a previous Windows install, failing, and the cleanup hook was then dutifully deleting the old kernel anyway. The machine had been running on borrowed time for nine days.

Fix: an LTS kernel as a safety net, a printed recovery card, and the permanent fix deferred until I wasn't tired. I also pushed back on its first suggested fix. I was right to: Omarchy overwrites `pacman.conf` wholesale on refresh. It agreed and came up with something better.

That's the sort of workflow I find interesting. Most people I speak with aren't using AI day to day. When they do, they use it more like an "advanced Google": searching for answers. [This article](https://yyhh.org/blog/2026/10/ai-is-a-tool/) explores that idea.

{% include gallery id="cli_gallery" layout="half" caption="PSP playing FLAC. Who would have thought?" %}

## Giving AI my hands

I routinely try fixing up my collection of busted gadgets from 20 years ago; namely minidisc players. My second NH1 reads every disc as blank. Laser power drift, almost certainly. The proper fix needs a laser power meter and Sony test discs that no longer exist. My idea: reverse-engineer the USB service protocol and sweep the read power in software until the TOC reads. I've been keeping track of the collection on my [MiniDisc page](/minidisc/).

Claude's first response was, roughly, "I don't have hands and I can't see your USB port." Correct, and slightly deflating. But then we split the work properly: I capture the traffic, it does the protocol archaeology, and Claude Code on the actual machine handles the hardware. It's a multi-week project and it's still going. [Do by doing](https://kuroshi.net/blog/2026/04/16/do-by-doing/), and all that.

Totally unrelated to AI, I fixed my LAM-Z05 twice; once for the opening mech and then again when the damn internal motor came loose from deep inside.

{% include gallery id="minidisc_gallery" layout="third" caption="The hardware end of the rabbit hole; click to enlarge" %}

{% include gallery id="car_and_watch_gallery" layout="third" caption="Confidently wrong about cars and watches; click to enlarge" %}

Finally, a very good friend gave me his old Blackberry KeyOne. Actually it's his girlfriend's, well it was until he posted it to me. Anyway, in my hands, I installed Tailscale and Terminus to allow a terminal access into my main always-on computer, meaning I can do some serious computing whilst away from the computer. Doesn't sound it I guess, but for me this is actually a huge workflow improvement. But this highlights how I use these systems very differently to most; I don't use the apps from AI providers at all.

---

*Written by a human even though it might be terrible*
