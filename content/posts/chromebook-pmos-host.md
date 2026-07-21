---
title: Chromebook PostmarketOS Host
date: 2026-07-21
tags:
  - postmarketos
  - chromebook
categories:
  - technical-tools
---
## Context
I'm using an [Acer Chromebook 14, running PostmarketOS (pmOS) v26](/posts/postmarketos-on-chromebook/), as a host for installing pmOS on a Pixel 3a. My main concern is pmOS' `pmbootstrap` builds the OS for a target device before installing it and this Chromebook only has 30GB of storage and the storage is eMMC which is relatively fragile. This post documents the set up.
## Zram
Prevent OOM (Out Of Memory) crashes during heavy package compilations by configuring ZRAM to allocate around 150-200% of total RAM size as compressed swap space:
```sh
$ sudo apk add postmarketos-zram-systemd
...
$ sudo vi /etc/systemd/zram-generator.conf
$ sudo systemctl daemon-reload
$ sudo systemctl start /dev/zram0
$ zramctl
NAME       ALGORITHM DISKSIZE  DATA  COMPR  TOTAL STREAMS MOUNTPOINT
/dev/zram0 zstd          5.7G    1G 183.1M 190.8M         [SWAP]
```

I see /dev/zram0 mapped to zstd compression with the newly defined disk size limit ✔️
## Augmented Storage
Next, I'll protect the host eMMC write endurance and provide the ~20GB+ needed for `pmbootstrap` chroots by using an external drive for the `pmbootstrap` work space.

I have a 120GB USB disk I've been using as a boot device when installing pmOS on my Chromebook. Now I want to use it as the workspace for `pmbootstrap`, to take storage pressure off the Chromebook.

I see the identifier is `/dev/sda` and one of the partitions is mounted:

```sh
$ lsblk -f
NAME FSTYPE FSVER LABEL UUID FSAVAIL FSUSE% MOUNTPOINTS
sda                                                                              
├─sda1                                                                           
└─sda2                       101.4G  5%     /run/media/erik/pmOS_root
...
```

Unmount it:
```sh
sudo umount /dev/sda*
```

NOTE: the `wipefs` command below is destructive, so verify your drive identifier with `lsblk` before executing `wipefs`.

Wipe the disk clean:
```sh
$ sudo wipefs -a /dev/sda
...       
/dev/sda: 5 bytes were erased at offset 0x00008001 (iso9660): 43 44 30 30 31
/dev/sda: 8 bytes were erased at offset 0x00000200 (gpt): 45 46 49 20 50 41 52 54
/dev/sda: 8 bytes were erased at offset 0x1d041ffe00 (gpt): 45 46 49 20 50 41 52 54
/dev/sda: 2 bytes were erased at offset 0x000001fe (PMBR): 55 aa
/dev/sda: calling ioctl to re-read partition table: No error information
```

Use fdisk to create a standard partition table and a new partition for the ext4 filesystem:

1. Open the disk utility:
2. Type **`g`** and press `Enter` to create a new, empty GPT partition table.
3. Type **`n`** and press `Enter` to create a new partition. Press `Enter` for all subsequent prompts to accept the default sizes (this allocates the whole drive).
4. Type **`w`** and press `Enter` to write the changes and exit.

```
$ sudo fdisk /dev/sda
...
Command (m for help): g
Created a new GPT disklabel (GUID: C4CF7C96-639D-48CC-B88A-4205042F455B).

Command (m for help): n
Partition number (1-128, default 1): 
First sector (2048-243404766, default 2048): 
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-243404766, default 243402751): 

Created a new partition 1 of type 'Linux filesystem' and of size 116.1 GiB.

Partition #1 contains a vfat signature.
Do you want to remove the signature? [Y]es/[N]o: Y

The signature will be removed by a write command.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.

```

The new partition shows up as `sda1`:
```sh
$ lsblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda            8:0    1 116.1G  0 disk 
└─sda1         8:1    1 116.1G  0 part 
...
```

Run the format command:
```sh
sudo mkfs.ext4 /dev/sda1
...
mke2fs 1.47.4 (6-Mar-2025)
Creating filesystem with 30425088 4k blocks and 7610368 inodes
Filesystem UUID: 95251614-a755-4a93-8590-48bd34935ea1
Superblock backups stored on blocks: 
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
        4096000, 7962624, 11239424, 20480000, 23887872

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (131072 blocks): done
Writing superblocks and filesystem accounting information: done   
```

## Configure Pmbootstrap To Use External Storage
Now, I can mount the drive to a target directory:
```sh
$ sudo mkdir -p /mnt/pmos_usb
$ sudo mount /dev/sda1 /mnt/pmos_usb
```

TIP: create an fstab entry to automatically remount on boot.

Set directory ownership to my unprivileged user so `pmbootstrap` can write to it without root:
```sh
$ sudo chown -R $USER:$USER /mnt/pmos_usb
```

Initialize `pmbootstrap` with USB as storage location:
```
$ pmbootstrap init                                                                                                                                           
[14:35:40] Location of the 'work' path. Multiple chroots (native, device arch, device rootfs) will be created in there.                                                  
[14:35:40] Work path [/home/erik/.local/var/pmbootstrap]: /mnt/pmos_usb/pmbootstrap                                                                                      
[14:35:45] Location of the 'pmaports' path, containing package definitions.                                                                                       
[14:35:45] pmaports path [/mnt/pmos_usb/pmbootstrap/cache_git/pmaports]:                                                                                          
[14:36:06] Setting up the native chroot and cloning the package build recipes (pmaports)
...
[14:36:50] Choose the postmarketOS release channel.
[14:36:50] Available (14):
[14:36:50] * edge: Rolling release / Most devices / Occasional breakage: https://postmarketos.org/edge             
[14:36:50] * v26.06: Latest release / Recommended for best stability
[14:36:50] * v25.12: Old release (supported until 2026-07-31)   
[14:36:50] Channel [edge]: v26.06
...
[14:37:11] Choose your target device vendor (either an existing one, or a new one for porting).
[14:37:11] Available vendors (75): acer ... google ... zte
[14:37:11] Vendor [qemu]: google                                                 

[14:37:17] Devices are categorised as follows, from best to worst:               ...
* Community: often mostly usable, but may lack important functionality.          ...
Available devices by codename (25): asurada (community) ... sargo (community) ... x64cros (community)
[14:37:17] Device codename: sargo

[14:37:47] Username [user]: erik 

[14:37:54] Available providers for postmarketos-base-ui-audio-backend (2):
[14:37:54] * pulseaudio: Use pulseaudio as the audio backend. (default)
... 
[14:37:54] Provider [default]:

[14:38:02] Available providers for postmarketos-base-ui-wifi (2):
[14:38:02] * wpa_supplicant: Use wpa_supplicant as the WiFi backend. (default)
...
[14:38:02] Provider [default]:

[14:38:04] Available providers for postmarketos-usb-moded-default-profile (2): 
[14:38:04] * developer: Make 'developer mode' the default usb-moded profile (always enables usb networking) (default)
...
[14:38:04] Provider [default]:

[14:38:09] Available user interfaces (27):
[14:38:09] * phosh: (Wayland) Mobile UI using GNOME components and apps          ...                    
[14:38:09] User interface [console]: phosh 

[14:38:18] Based on your UI selection, 'default' will result in choosing systemd.
[14:38:18] Which service manager should be used? (default/openrc/systemd) [default]:

[14:38:40] Additional options: extra free space: 0 MB, boot partition size: 512 MB, parallel jobs: 4, ccache per arch: 5G, sudo timer: False, mirror: http://mirror.postmarketos.org/postmarketos/ 
[14:38:40] Change them? (y/n) [n]:

[14:38:51] Additional packages that will be installed to rootfs. Specify them in a comma separated list (e.g.: vim,file) or "none"
[14:38:51] Extra packages [none]:

[14:39:01] Your host timezone: America/Los_Angeles
[14:39:01] Use this timezone instead of GMT? (y/n) [y]:

[14:39:07] Choose your preferred locale, like e.g. en_US. Only UTF-8 is supported, it gets appended automatically. Use tab-completion if needed.
[14:39:07] Locale [en_US]:

[14:39:15] Device hostname (short form, e.g. 'foo') [google-sargo]: pixel3a

[14:39:53] SSH public keys found (1):
...
[14:39:53] Would you like to copy these public keys to the device? (y/n) [n]: 

[14:40:01] After pmaports are changed, the binary packages may be outdated. If you want to install postmarketOS without changes, reply 'n' for a faster installation.    
[14:40:01] Build outdated packages during 'pmbootstrap install'? (y/n) [y]:

[14:40:05] DONE!
```

## Limit Build Concurrency
Prevent CPU starvation on a low-power processor by telling `pmbootstrap` to limit parallel jobs when compiling larger components: 
```sh
$ pmbootstrap config jobs 2
jobs = 2
```
