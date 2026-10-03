---
title: "Six months of asking Claude about everything except work"
excerpt: "Laser diodes, boot loaders, Swiss bureaucracy and watches I probably shouldn't buy. An honest audit of what an LLM was actually good for outside the day job."
date: 2026-10-03
tags:
  - ai
  - claude
  - linux
  - minidisc
  - gtr
  - watches
  - switzerland
header:
  image: /assets/images/PLACEHOLDER.jpg
  teaser: /assets/images/PLACEHOLDER.jpg
  og_image: /assets/images/PLACEHOLDER.jpg
categories:
  - blog
published: false
---

I use Claude every day for work. That's not what this post is about. This is about the other stuff: the evenings, the weekends, the "quick question" at 1am that turns into a three-hour session. I asked it to go back through everything non-work I'd thrown at it this year and tell me what we'd actually done. Then I read the list and thought, huh, that's a blog post.

Some of it was brilliant. Some of it was annoying. Most of it was the kind of thing I'd have otherwise lost an afternoon to on forums.

---

## The good

**The ThinkPad that wouldn't boot.** This is the war story. My T480s, the main Omarchy machine, simply stopped booting one evening. GRUB couldn't find a kernel. We spent the evening at the GRUB prompt piecing together partitions by hand, found a stale kernel from February sitting on the EFI partition from an old Limine install, and limped into a running system on it.

The root cause, which I'd never have found alone: a pacman hook from the Omarchy Quattro migration was quietly shadowing the stock mkinitcpio hook. Every kernel update was trying to write a 63 MB image to a 100 MB EFI partition I'd inherited from a previous Windows install, failing, and the cleanup hook was then dutifully deleting the old kernel anyway. The machine had been running on borrowed time for nine days.

Fix: an LTS kernel as a safety net, a printed recovery card, and the permanent fix deferred until I wasn't tired. I also pushed back on its first suggested fix, and I was right to, because Omarchy overwrites `pacman.conf` wholesale on refresh. It agreed and came up with something better. That's the dynamic I want.

**Swiss bureaucracy, in German.** Doing things in Switzerland as a Brit often involves documents the UK no longer issues. Claude found the gov.uk page saying exactly that, drafted the letter to the Zivilstandsamt, and the reply came back. Selling my Speed Triple produced a Kaufvertrag, emails to the StVA and AXA, and later, when the buyer got flashed at 79 in a 50 before re-registering the bike, a contest letter in English and German. None of this is glamorous. All of it would have taken me far longer and been more stressful.

---

## The ambitious

My second NH1 reads every disc as blank. Laser power drift, almost certainly. The proper fix needs a laser power meter and Sony test discs that no longer exist. My idea: reverse engineer the USB service protocol and sweep the read power in software until the TOC reads.

Claude's first response was, roughly, "I don't have hands and I can't see your USB port". Which is correct and slightly deflating. But then we split the work properly: I capture the traffic, it does the protocol archaeology, and Claude Code on the actual machine handles the hardware. It's a multi-week project and it's still going. [Do by doing](https://kuroshi.net/blog/2026/04/16/do-by-doing/), and all that.

---

## The frustrating

It gets things wrong, confidently. It told me Litchfield sell their own wheels. They don't. It got my Grand Seiko as 44mm and my Speedmaster as 42mm; they're 40 and 39. In both cases I corrected it and it fixed itself immediately, but you have to know enough to catch it. If you don't, you'd never notice.

The other recurring friction is context. More than once I've had to say "it's in the contract I sent you, bro" because it asked for a plate number that was sitting in a photo three messages up. Small thing. Adds up.

---

## Is it worth it?

Yes. Not because it's always right, it isn't, but because it holds a lot of state, reasons through failure modes faster than I can, and writes better formal German than I do. The best sessions felt like working with a very well read colleague who has never touched a screwdriver. The worst felt like correcting an intern.

The trick, as with most tools, is knowing enough to tell which one you're getting.

---

*Written on the M4 Air.*
