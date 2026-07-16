---
title: PostmarketOS On Chromebook
date: 2026-07-16T05:02:00-05:00
tags:
  - postmarketos
  - chromebook
categories:
  - technical-tools
---
## Context
I've previously installed Debian and Alpine on my Chromebook and now I want to get experience with PostmarketOS (PMOS).
## Environment
I'm running Alpine on an Acer Chromebook 14. I have a 150 GB USB drive to boot from.
## Pmbootstrap
PMOS differs from other Linux distributions by providing an installation utility called [`pmbootstrap`](https://wiki.postmarketos.org/wiki/Pmbootstrap) rather than ISO image files. As I understand it, PMOS originally targeted mobile devices, and flashing an OS configured for a device directly to the device is more common in that context.

In short, the process below builds and flashes an OS to a USB, which then acts as a host device for installing an OS onto the Chromebook. It's a bit of a mind-bender, but I like the idea that any device can be used to install the OS on any other device.

I installed it like this:
```sh
$ doas apk add pmbootstrap
```

I [initialized](https://docs.postmarketos.org/pmbootstrap/main/usage.html) it like this:
```sh
$ pmbootstrap init
```

The initialization logic asks several questions about the OS to build, such as architecture (x86_64), desktop manager (gnome), packages to include (gnome-console), etc.

Then I can install the OS like this:
```sh
$ pmbootstrap install --disk=/dev/sda --no-recommends --add pmbootstrap,gnome-console
```

To get the disk identifier, I ran `lsblk`, installed via `util-linux`. I didn't copy down the exact output, but it was something like this:
```sh
$ lsblk
NAME         MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda            8:0    1 116.1G  0 disk 
├─sda1         8:1    1   243M  0 part 
└─sda2         8:2    1 115.8G  0 part
mmcblk0      179:0    0 29.1G  0 disk 
├─mmcblk0p1  179:1    0    1K  0 part /
├─mmcblk0p2  179:2    0    1K  0 part /
└─mmcblk0p3  179:3    0 28.9G  0 part /boot
mmcblk0boot0 179:8    0    4M  1 disk 
mmcblk0boot1 179:16   0    4M  1 disk
```

The `sda` disk is my USB drive.

The `no-recommends` flag alleviated an issue where `pmbootstrap` ran out of space unpacking firmware for the OS. Since the Chromebook doesn't need any firmware, I could omit it.

But just passing no-recommends results in a system so minimal it doesn't even have a shell I can use to install additional packages, so I pass the `add` flag to include that, and since my intent is to use `pmbootstrap` to install an OS on the Chromebook, I include `pmbootstrap` too.
## USB Host
Once the install completes, I have an OS on the USB I can use to boot the Chromebook, so the next step is to do just that. I plug the USB into the Chromebook, reboot it, press `esc` at the Tianocore boot screen, navigate to the `boot menu` and select the USB. The Chromebook then boots to PMOS!

But as mentioned above, it's an actual PMOS installation, not an installer, so now I have to repeat the process to install PMOS on the Chromebook. In other words:
```sh
$ pmbootstrap install --disk=/dev/mmcblk0 --no-recommends
```
## eMMC
Before I do that, though, I optimize for the eMMC storage. Apparently, eMMC isn't as good as SSD at wear-leveling, so we generally want to minimize writes. 

A few best-practices:
- minimize partitions
- swap to zram, not storage
- minimize file metadata updates
- log to ram, not storage
- configure browsers to minimize storage

ChromeOS is known to create a lot of partitions, so I clear all the partitions on the disk:
```sh
$ doas wipefs --all /dev/mmcblk0
```

PMOS appears to be aware of eMMC best-practices, so I run `pmbootstrap install` next.

Then I verify what it did, starting by just dumping the output of `lsblk` into Gemini. It tells me PMOS set everything up perfectly! It's using zram for swapping and sets swappiness to 180.

Since the basics are in place, I shutdown at this point, remove the USB and reboot.

The next recommendation is to update the root partition in /etc/fstab to use `noatime`, so the OS updates file metadata less frequently.

Related, `/tmp` and `/var/log` should write to RAM instead of storage. I see `/tmp` is already doing the right thing, but `/var/log` isn't:
```sh
$ df -h /tmp
Filesystem                Size      Used Available Use% Mounted on
tmpfs                     1.9G      8.0K      1.9G   0% /tmp
$ df -h /var/log
Filesystem                Size      Used Available Use% Mounted on
/dev/mmcblk0p2           28.3G      4.9G     21.9G  18% /
```

I drop the output from`ls /var/log` into Gemini, which says the only concern is journald. I can check the current state: 
```sh
$ journalctl --disk-usage
Archived and active journals take up 347M in the file system.
```

I can create a `/etc/systemd/journald.conf` to route these logs to RAM:
```init
[Journal]
Storage=volatile
RuntimeMaxUse=64M
```

The final recommendation is to configure Firefox to disable disk caching, enable ram caching and persist session data less frequently. I don't actually get much value from things like reopening tabs after a crash, so I just disable the session-related features.
## Recap
The eMMC optimizations are a rabbit hole, but PMOS sets reasonable defaults and I can just keep an eye on the basic idea of minimizing writes.

I think it's much more important to acknowledge that I now have PMOS running!
