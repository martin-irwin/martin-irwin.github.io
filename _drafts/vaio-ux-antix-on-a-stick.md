---
title: "TODO 漢字 — Two VAIO UXes, one antiX stick"
excerpt: "TODO one line: a 2006 pocket PC becomes a jack-in terminal, booting a whole antiX install from a USB stick so either of two UXes is the same machine."
date: 2026-11-15
tags:
  - linux
  - antix
  - vaio
  - umpc
  - ventoy
  - tailscale
  - technology
header:
  image: /assets/images/TODO-ux-01.jpg
  teaser: /assets/images/TODO-ux-01.jpg
  og_image: /assets/images/TODO-ux-01.jpg
categories:
  - blog
published: false
---

<!--
DRAFT SKELETON. Headings + prompts are for Martin's prose; the "Technical
flow" blocks are the facts and commands from the build, safe to keep or trim.
Before publishing:
  - photos: the two UXes side by side; the Ventoy F6 menu; the desktop
  - TODO values below are not measured yet (boot time etc.): measure, don't guess
  - link the theme repo only once it is public (see the checklist in the PR)
  - nothing here names networks, IPs, users or other machines; keep it that way
-->

## Prompt: why a UX, why now

- What is the VAIO UX (2006, 4.5" 1024×600, sliding keyboard, Core Solo)?
- How did you end up with *two*?
- Callback to the MacBook 12 post: "AntiX on retro devices … for another day". This is that day.
- The idea: not a computer, a **terminal** you pick up and SSH from. kuroshi (the VAIO P) already does this.
- The twist: keep Windows on the internal disk (resale), so the whole system lives on a stick.

## Prompt: the hardware, honestly

Technical flow:
- Unit 1: VGN-UX91S, Intel Core Solo U1500 1.33 GHz (32-bit only, PAE), 1 GB RAM (soldered), 1024×600 LVDS.
- Wi-Fi Broadcom BCM4311 (`b43`), Ethernet Marvell 88E8036, Sony extras via the `sony-laptop` module.
- Linux sees: `GUNZE USB Touch Panel`, `Sony Vaio Keys`, `Sony Vaio Jogdial`, ALPS stick, battery as `BAT1`.
- 32-bit only → antiX 23.2 **386** (same build as kuroshi). Most distros have dropped i686.
- Prompt: what it feels like to hold one in 2026.

## Prompt: one stick, any machine, same identity

- The goal in one line: boot the stick on either UX and it *is* `ux`: same files, same theme, same tailnet node.
- Why not install on each internal disk: two machines that drift apart, and Windows stays for resale.

## Prompt: the plan that didn't work (persistence on Ventoy)

Technical flow:
- The stick was a Ventoy multi-ISO stick. antiX supports persistence (`persist_all`, `persist_static`, with `pdev=`, `plabel=`, `pdir=`); its initrd even carries exFAT and ntfs-3g.
- But Ventoy maps the ISO through device-mapper and **holds the exFAT data partition busy**. Neither a kernel mount nor FUSE (`exfat-fuse`) can open it while booted from it, so antiX can't keep persistence files there.
- Read-only peek that *does* work (handy for listing what is on the stick):
  ```
  L=$(sudo losetup -r -f --show /dev/sdX1)
  sudo mount -o ro "$L" /mnt
  ```
- Prompt: the moment you realised the "obvious" plan was a dead end.

## Prompt: the plan that did (Ventoy with reserved space + a real install)

Technical flow:
1. Copy what you want off the stick first (reinstalling Ventoy wipes it).
2. Reinstall Ventoy with space reserved at the end, MBR (the UX BIOS is legacy-only):
   ```
   sudo ./Ventoy2Disk.sh -I -r 16384 /dev/sdX
   ```
3. Partition 3 in the reserved space, ext4, labelled so it can be found on any machine:
   ```
   sudo parted -s -a optimal /dev/sdX mkpart primary ext4 <end-of-part-2>MiB 100%
   sudo mkfs.ext4 -L ANTIX-UX /dev/sdX3
   ```
4. Put the antiX ISO back on the Ventoy partition.
- Gotcha worth a paragraph: on a desktop with an automounter (udiskie), the first Ventoy run failed with "unable to inform the kernel of the change". The automounter had remounted a partition the instant the table changed. Fix: pause it (`pkill -STOP -f bin/udiskie`, `-CONT` afterwards), unmount everything, `blockdev --rereadpt`, then run Ventoy.

## Prompt: installing the live system onto the stick it booted from

Technical flow (mirrors antiX's own `cli-installer`, minus GRUB):
- Boot the antiX ISO from Ventoy, then copy the running system to partition 3:
  `rsync -aHAXx /live/aufs/ /mnt/ux/` (`-x` so it never wanders into other mounts).
- fstab by **label**, plus stick-friendly options:
  ```
  LABEL=ANTIX-UX  /     ext4   defaults,noatime,commit=60            0 1
  tmpfs           /tmp  tmpfs  defaults,noatime,mode=1777,size=256M  0 0
  ```
- In a chroot: remove the live user, add yours (same groups), hostname, timezone, `live-to-installed`, remove `live-init-antix`, `update-initramfs -u -k all`, enable ssh.
- antiX ships no `/vmlinuz` link. Add `/vmlinuz` and `/initrd.img` links and `do_symlinks = yes` in `/etc/kernel-img.conf` so kernel updates keep them current.
- Boot it from Ventoy's **F6** menu with `ventoy/ventoy_grub.cfg`:
  ```
  menuentry "ux  //  antiX installed" --class=custom {
      search --no-floppy --label ANTIX-UX --set=root
      linux /vmlinuz root=LABEL=ANTIX-UX ro quiet
      initrd /initrd.img
  }
  ```
- Make it the default after a timeout in `ventoy/ventoy.json` (`VTOY_DEFAULT_IMAGE` "F6>…", `VTOY_MENU_TIMEOUT`). TODO: confirm the exact string that worked.
- Measured: copying the ~4.3 GB system ran at about **1 MB/s**; the CPU sat ~95% in I/O wait. USB 2.0 + a stick reading and writing small files at once is the worst case. TODO: total install time.
- Prompt: is it "fast enough"? TODO: boot time from power-on to desktop; how it feels once booted (terminal work lives in RAM).

## Prompt: Tailscale when the machine is a stick

Technical flow:
- The node identity is `/var/lib/tailscale/tailscaled.state`. On a full install it persists, so the stick is one node whichever UX boots it.
- antiX is sysvinit: Tailscale's apt repo has an i386 build; add a small `/etc/init.d/tailscaled` and `update-rc.d tailscaled defaults`.
- `tailscale up --hostname=ux` (otherwise it registers as the live hostname).
- Gotchas: don't remaster a live image while logged in (the key gets baked into the image); keep key expiry on; a lost stick is a logged-in node, so remove it in the admin console.

## Prompt: Wi-Fi, touch, buttons, fan (the little things)

Technical flow (fill in as they get done):
- Wi-Fi: BCM4311 needs `firmware-b43-installer` (downloads the firmware, so do it on Ethernet first). TODO: result.
- Touch: `xinput_calibrator` for the GUNZE panel, saved to an xorg.conf.d snippet. TODO: result.
- Jack-in button: the button under the Intel sticker → Super+G's `jack`. TODO: what it emitted (`xev` / `evtest` on "Sony Vaio Keys").
- Fan: firmware-controlled; `sony-laptop` exposes `fanspeed`, but writing it fights the firmware. Measured 52–53 °C under heavy I/O. The safer lever is capping the CPU at 1.07 GHz.

## Prompt: what others have done with UXes

- Very little recent Linux-on-UX writing exists. Notable: a 2025 proposal for an Orange Pi CM5 drop-in board for the VGN-UX ([Tom's Hardware](https://www.tomshardware.com/desktops/mini-pcs/enthusiast-mulls-reviving-sonys-retro-micro-pc-orange-pi-cm5-planned-as-mainboard-upgrade)); the famous Core 2 Duo / 128 GB UX490 mod ([UMPC Portal](https://www.umpcportal.com/umpc/reviews-umpc/modded-sony-vaio-ux-does-everything-and-then-some-voice-3g-quad-boot-core-2-duo-is-this-the-fastest-most-versatile-umpc-in-the-world/)); [Linux Mint 17 on a UX490N](https://modelrail.otenko.com/vaio-ux/linux-mint-17-on-the-sony-vaio-ux490n-umpc); recovery images at [VAIO UX Plaza](https://vaio-ux-plaza.arjanvlek.nl/vaio-ux-recovery-disks/).
- Prompt: why this feels like new ground; Rabbit's VAIO-P-inspired cyberdeck as a sign of the times?

## Prompt: use it yourself

- Link to the scripts / theme repo (TODO once public).
- What you'd do differently (a faster stick? build the filesystem on a fast machine and write it in one sequential pass?).
