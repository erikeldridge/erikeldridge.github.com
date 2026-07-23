---
title: Installing pmOS On Pixel 3a
date: 2026-07-21
tags:
  - postmarketos
  - pixel
categories:
  - technical-tools
---
## Context
My [previous post](/posts/chromebook-pmos-host) describes my experience setting my laptop as a postmarketOS (pmOS) host, including initializing `pmbootstrap`. This post documents my experience using that host to flash pmOS on a Pixel 3a.

At a high level, the steps are:
1. Install `android-tools` on the host
2. Use `pmbootstrap` to build a system image
3. Boot Pixel 3a into Fastboot mode 
4. Unlock the Bootloader
5. Use `pmbootstrap` to flash pmOS 
6. Reboot into pmOS
## Install android-tools
I need `android-tools` to get the `fastboot` CLI. The installation is straightforward:
```sh
$ sudo apk add android-tools
[sudo] password for erik:         
The following NEW packages will be installed:
  android-tools android-tools-adb android-tools-append2simg
  android-tools-avbtool android-tools-e2fsdroid android-tools-ext2simg
  android-tools-fastboot android-tools-img2simg android-tools-lpadd
  android-tools-lpdump android-tools-lpflash android-tools-lpmake
  android-tools-lpunpack android-tools-make_f2fs android-tools-mkbootimg
  android-tools-mkdtboimg android-tools-mke2fs.android
  android-tools-repack_bootimg android-tools-simg2img android-tools-sload_f2fs
  android-tools-unpack_bootimg fmt
...
OK: 2732.6 MiB in 1045 packages
```
## Build The System Image
I previously [initialized `pmbootstrap`](/posts/chromebook-pmos-host). Now I need to build the rootfs and kernel package for the Pixel 3a. `pmbootstrap` downloads necessary chroots and package the OS. I'll include all the details since this is the first time I'm going through this:
```sh
$ pmbootstrap install
Choose a password for the user 'erik': 
Confirm password for 'erik': 
[15:47:33] *** (1/4) PREPARE NATIVE CHROOT ***
[15:47:34] Update package index for x86_64 (4 file(s))
[15:47:37] Download http://dl-cdn.alpinelinux.org/alpine/v3.24/main/x86_64/apk-tools-static-3.0.6-r0.apk
[15:47:38] (native) Creating chroot
[15:47:44] (native) install cryptsetup util-linux parted
[15:47:47] *** (2/4) CREATE DEVICE ROOTFS ("google-sargo") ***
[15:47:55] (native) install qemu-aarch64
[15:47:57] Register qemu binfmt (aarch64)
[15:47:58] (rootfs_google-sargo) Creating chroot
[15:47:58] Update package index for aarch64 (4 file(s))
[15:48:31] (rootfs_google-sargo) install postmarketos-base-systemd
[15:55:14] (rootfs_google-sargo) install postmarketos-base device-google-sargo postmarketos-ui-phosh postmarketos-base-ui-audio-backend-pulseaudio postmarketos-base-ui-wifi-wpa_supplicant postmarketos-base-nofde sudo-rs phosh-mobile-settings phosh-tour decibels firefox-esr flatpak fprintd g4music gnome-calculator gnome-calendar gnome-clocks gnome-console gnome-contacts gnome-maps gnome-software gnome-software-plugin-apk gnome-text-editor gnome-user-share gnome-weather gst-libav gst-plugins-bad gst-plugins-good gst-plugins-rs-dav1d gvfs-full loupe nautilus papers rygel showtime snapshot tuned-ppd font-droid font-droid-nonlatin font-twemoji lang font-droid font-droid-nonlatin font-twemoji lang calls chatty mobile-config-firefox postmarketos-tweaks-setting-definitions ttyescape
[sudo] password for erik:         
[16:04:52] (rootfs_google-sargo) install postmarketos-mkinitfs
[sudo] password for erik:         
[16:05:02] (rootfs_google-sargo) mkinitfs
[16:06:44]  *** SET LOGIN PASSWORD FOR: 'erik' ***
[16:06:46] NOTE: No valid keymap specified for device
[16:07:40] *** (3/4) PREPARE INSTALL BLOCKDEVICE ***
[16:07:42] (native) create google-sargo.img (3236M)
[16:07:42] (native) mount /dev/install (google-sargo.img)
[16:07:42] (native) partition /dev/install (boot: 512M)
[16:07:43] Mounting partitions of /dev/loop0 inside the chroot
[16:07:43] (native) install e2fsprogs
[16:07:45] (native) format /dev/installp2 (pmOS_root, ext4)
[16:07:45] (native) mount /dev/installp2 to /mnt/install
[16:07:46] (native) install dosfstools
[16:07:47] (native) format /dev/installp1 (pmOS_boot, fat32)
[16:07:48] (native) create /etc/fstab
[16:07:48] (rootfs_google-sargo) mkinitfs
[16:09:22] *** (4/4) FILL INSTALL BLOCKDEVICE ***
[16:09:22] (native) copy rootfs_google-sargo to /mnt/install/
[16:14:17] (native) make sparse rootfs
[16:14:18] (native) install android-tools
...
[16:19:57] *** FLASHING INFORMATION ***
[16:19:57] Run the following to flash your installation to the target device:
[16:19:57] * pmbootstrap flasher flash_rootfs
[16:19:57]   Flashes the generated rootfs image to your device:
[16:19:57]   /mnt/pmos_usb/pmbootstrap/chroot_native/home/pmos/rootfs/google-sargo.img
[16:19:57]   (NOTE: This file has a partition table, which contains /boot and / subpartitions. That way we don't need to change the partition layout on your device.)
[16:19:57] * pmbootstrap flasher flash_vbmeta
[16:19:57]   Flashes vbmeta image with verification disabled flag.
[16:19:57] * pmbootstrap flasher flash_kernel
[16:19:57]   Flashes the kernel + initramfs to your device:
[16:19:57]   /mnt/pmos_usb/pmbootstrap/chroot_rootfs_google-sargo/boot
[16:19:57]   (NOTE: fastboot also supports booting the kernel/initramfs directly without flashing. Use 'pmbootstrap flasher boot' to do that.)
[16:19:57] * If the above steps do not work, you can also create symlinks to the generated files with 'pmbootstrap export' and flash outside of pmbootstrap.
[16:19:57] 
[16:19:57] *** SSH DAEMON INFORMATION ***
[16:19:57] SSH daemon is enabled (disable with --no-sshd).
[16:19:57] Login as 'erik' with the password given during installation.
[16:19:57] 
[16:19:57] *** FIREWALL INFORMATION ***
[16:19:57] Firewall is enabled, but may not work (couldn't determine if kernel supports nftables).
[16:19:57] For more information: https://postmarketos.org/firewall
[16:19:57] 
[16:19:57] NOTE: chroot is still active (use 'pmbootstrap shutdown' as necessary)
[16:19:57] DONE!
```
## Boot Into Fastboot
1. Power off the Pixel 3a completely
2. Press and hold Volume Down + Power simultaneously until the Fastboot screen (Android bootloader menu) appears.
3. Press the Volume Down button at least once to cancel the default "start" option, otherwise the device will continue booting as usual
4. Plug the Pixel 3a into the host laptop via USB
5. Verify the phone is detected:
   ```sh
    $ fastboot devices
    93RAY0EQWZ	 fastboot
   ```
## Unlock the Bootloader
1. Run the unlock command:
   ```sh
    $ fastboot flashing unlock
    OKAY [  0.100s]
    Finished. Total time: 0.100s
   ```
   This will cause the phone to display a confirmation.
2. Confirm using the Volume and Power buttons. The phone will restart into Fastboot. As above, press the Volume Down button to cycle past the default "start" option

## Flash postmarketOS
1. Erase the Android device tree overlay (DTBO) to prevent kernel conflicting issues:
   ```sh
    $ fastboot erase dtbo
    Erasing 'dtbo_b'                                   OKAY [  0.398s]
    Finished. Total time: 0.564s
   ```
2. Flash the system images:
   ```sh
    $ pmbootstrap flasher flash_rootfs
    ...
    Finished. Total time: 104.767s
    [16:51:00] NOTE: chroot is still active (use 'pmbootstrap shutdown' as necessary)
    [16:51:00] DONE!
   ```
3. Flash the kernel:
   ```sh
    $ pmbootstrap flasher flash_kernel
    [16:52:13] (rootfs_google-sargo) install device-google-sargo
    [16:52:16] (rootfs_google-sargo) install postmarketos-mkinitfs
    [16:52:19] (rootfs_google-sargo) mkinitfs
    [16:54:05] INFO: config-postmarketos-qcom-sdm670.aarch64 has suboptimal configuration (category:default), run 'pmbootstrap kconfig check' for details!
    [16:54:08] (native) flash kernel postmarketos-qcom-sdm670
    [16:54:11] (native) install android-tools
    Sending 'boot_b' (25164 KB)                        OKAY [  0.645s]
    Writing 'boot_b'                                   OKAY [  0.250s]
    Finished. Total time: 1.310s
    [16:54:13] You will get an IP automatically assigned to your USB interface shortly.
    [16:54:13] Then you can connect to your device using ssh after pmOS has booted:
    [16:54:13] ssh erik@172.16.42.1
    [16:54:13] NOTE: If you enabled full disk encryption, you should make sure that Unl0kr has been properly configured for your device
    [16:54:13] NOTE: chroot is still active (use 'pmbootstrap shutdown' as necessary)
    [16:54:13] DONE!
   ```
## Reboot To pmOS
   ```sh
    $ fastboot reboot
    Rebooting                                          OKAY [  0.016s]
    Finished. Total time: 0.118s
   ```

 First, the Fastboot screen will display a reboot is pending, then the device will reboot into the Google boot screen, and then the pmOS boot screen(!)
## Debug SSH
The output from `flash_rootfs` mentions I can ssh into the phone:
```sh
...
[16:54:13] Then you can connect to your device using ssh after pmOS has booted:
[16:54:13] ssh erik@172.16.42.1
...
```

But when I try, `ssh` hangs. [pmOS' USB Network doc](https://wiki.postmarketos.org/wiki/USB_Network), explains this is the default IP address for a pmOS installation:

> Out of the box, a postmarketOS device uses a static address of 172.16.42.1/24 on any USB network interface ... If you have multiple postmarketOS devices connected, you may want to manually set IP via `setup-interfaces` both on host and on second phone to 172.16.42.x (or any other) to have internet access on all devices.

Since I'm also using pmOS as the host, trying to ssh from the host to that address actually results in an attempt to ssh into the host, which fails.

To fix this, I need to change the address of the host machine. Here are the steps:
1. Identify the USB interface ID of the host
2. Manually set the host's USB IP address
3. Verify the fix

My host's USB interface ID is `usb0`: 
```sh
$ ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP qlen 1000
    link/ether 1e:cd:0f:e0:06:4f brd ff:ff:ff:ff:ff:ff
4: usb0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP qlen 1000
    link/ether 9a:78:42:21:77:07 brd ff:ff:ff:ff:ff:ff
```

Now I'll give that interface a new address:
```sh
$ sudo ip address add 172.16.42.2/24 dev usb0
```

I can ping to verify:
```sh
$ ping 172.16.42.1
PING 172.16.42.1 (172.16.42.1): 56 data bytes
64 bytes from 172.16.42.1: seq=0 ttl=42 time=6.965 ms
...
```

But the true test is ssh:
```sh
$ ssh erik@172.16.42.1
...
Welcome to postmarketOS! o/
...
pixel3a:~$ 
```
## Clean Up
Since I'm using a USB disk for my `pmbootstrap` storage location, I need to clean things up when I'm done before I can eject the disk. `pmbootstrap` mounts several things, so a simple `umount` on the partition is insufficient for unmounting it. A symptom of this is running `umount` successfully and then observing the partition is still mounted.

Check the starting state:
```sh
$ lsblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda            8:0    1 116.1G  0 disk 
└─sda1         8:1    1 116.1G  0 part /mnt/pmos_usb
mmcblk0      179:0    0 29.1G  0 disk 
...
```

Tell `pmbootstrap` to clean itself up:
```sh
$ pmbootstrap shutdown
```

This command is relatively lightweight, leaving all the artifacts created by `init` in place. I can just resume work later with `pmbootstrap install`.

`pmbootstrap` creates bind mounts manually using root/kernel privileges and these mounts bypass UDisks entirely, so I can't use `udisksctl` to unmount. Instead, I use `umount` to directly tell the Linux kernel to unmount the disk, regardless of who or what mounted it:
```sh
$ sudo umount /mnt/pmos_usb
```

Verify the unmount:
```sh
$ lsblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda            8:0    1 116.1G  0 disk 
└─sda1         8:1    1 116.1G  0 part 
mmcblk0      179:0    0 29.1G  0 disk 
...
```

Flush the cache:
```sh
$ sync
```

Eject the disk:
```sh
udisksctl power-off -b /dev/sda
```

Verify the eject:
```sh
$ lsblk
NAME         MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
mmcblk0      179:0    0 29.1G  0 disk 
├─mmcblk0p1  179:1    0  243M  0 part /boot
└─mmcblk0p2  179:2    0 28.9G  0 part /
```
## Future Work
Ideally, the installed image would have a couple conveniences:
1. Syncthing installed and registered with systemd
2. Flathub configured, so non-technical users can install apps, such as Obsidian, from the Gnome Software app
3. Valent pre-installed via Flatpak, so GSConnect works out of the box
