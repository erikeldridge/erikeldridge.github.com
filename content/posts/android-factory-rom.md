---
title: Android Factory ROM
date: 2026-10-01
tags:
  - android, postmarketos
categories:
  - technical-tools
---


## Context

My goal is to get VoLTE working on my Pixel 3a running postmarketOS (pmOS).  I've tried lots of things and currently the 3GPP status of the modem is blocked, apparently indicating the device doesn't have the correct MBN profile (Modem Binary configuration) for Tello/T-Mobile.

Android natively understands how to dynamically fetch MBN profiles, provision the eSIM, and flash the correct profile permanently into the modem's hardware storage.

For my own future reference, searching around for what MBN stood for uncovered a project called OpenIMSD that is building a tool called the qcom-baseband-profile-manager to manage MBN profiles for pmOS.

For now, this post just documents my experience reinstalling Android and verifying VoLTE functionality, but in the future this may no longer be necessary.

## Steps

1. Install eSIM
2. Switch to Debian
3. Download factory image
4. Install fastboot
5. Connect device
6. Flash image
7. Reboot

## Install eSIM

I did this using pmOS, but mention it here for completeness. Some combination of [lpa-gtk and mmcli bashing](https://erikeldridge.com/posts/tello-activation/) resulted in my eSIM being activated and installed in my EUICC chip. My understanding was that this installation was durable across an Android reinstallation.

## Switch To Debian

I don't think this is required, but it consistently felt like I was swimming upstream by using pmOS for a dev machine. Using a Chromebook for a dev machine is probably also inadvisable. Chromebook + pmOS might actually be a good combo, since Chromebooks are relatively resource constrained, but for now, I just acknowledged that I'm using the Chromebook as a dev machine, so it should use a glibc-based system.

## Download Factory Image

Google maintains a list of images going way back. Thank you, Google!

The code name for the [Pixel 3a is sargo](https://developers.google.com/android/ota#sargo). Download the zip archive for the image by clicking on the "link" link. For example, I downloaded  "9.0.0 (PD2A.190115.029, Mar 2019)".

Unzip that:

```sh
$ cd ~/Down	loads/
$ unzip sargo-pd2a.190115.029-factory-b05c97da.zip 
Archive:  sargo-pd2a.190115.029-factory-b05c97da.zip
   creating: sargo-pd2a.190115.029/
 extracting: sargo-pd2a.190115.029/image-sargo-pd2a.190115.029.zip  
  inflating: sargo-pd2a.190115.029/flash-all.bat  
  inflating: sargo-pd2a.190115.029/flash-all.sh  
  inflating: sargo-pd2a.190115.029/radio-sargo-g670-00011-190213-b-5306579.img  
  inflating: sargo-pd2a.190115.029/flash-base.sh  
  inflating: sargo-pd2a.190115.029/bootloader-sargo-b4s4-0.1-5262905.img
```

## Install Fastboot

Easy enough:

```sh
$ sudo apt install fastboot
```

## Connect Device

Boot the device into Fastboot mode by turning it off and then holding down the power and volume-down buttons. I connected it to the laptop using a USB A-to-C cable.

Initially, I hit the power button in the bootloader to pause it, thinking that was the Fastboot screen, but the device didn't appear for `adb devices`, `fastboot devices` or even `lsusb`.

Then I pressed the power again to "resume" the bootloader and held the power and volume-down buttons, and ended up in the pmOS debug shell, which also wasn't the Fastboot screen.

Then I rebooted from the shell, while holding down the power and volume-down buttons and somehow ended up in Fastboot. The text was red rather than the orange of the bootloader screen. In any case, `lsusb` started including the Pixel in the list of USB devices:

```sh
$ lsusb
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 004: ID 04f2:b567 Chicony Electronics Co., Ltd HD WebCam
Bus 001 Device 005: ID 8087:0a2a Intel Corp. Bluetooth wireless interface
Bus 001 Device 011: ID 18d1:4ee3 Google Inc. Nexus/Pixel Device (tether)
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
```

## Flash Image

In the unzipped image directory, there's a `flash-all.sh` script. I ran that:

```sh
$ ./flash-all.sh 
Warning: skip copying bootloader_b image avb footer (bootloader_b partition size: 0, bootloader_b image size: 8550056).
Sending 'bootloader_b' (8349 KB)                   OKAY [  0.430s]
Writing 'bootloader_b'                             (bootloader) Flashing Pack version b4s4-0.1-5262905
(bootloader) Flashing partition table for Lun = 0
(bootloader) Flashing partition xbl_b
(bootloader) Flashing partition xbl_config_b
(bootloader) Flashing partition tz_b
(bootloader) Flashing partition aop_b
(bootloader) Flashing partition hyp_b
(bootloader) Flashing partition keymaster_b
(bootloader) Flashing partition cmnlib_b
(bootloader) Flashing partition cmnlib64_b
(bootloader) Flashing partition abl_b
(bootloader) Flashing partition devcfg_b
(bootloader) Flashing partition qupfw_b
(bootloader) Flashing partition storsec_b
OKAY [  0.340s]
Finished. Total time: 1.151s
Rebooting into bootloader                          OKAY [  0.034s]
Finished. Total time: 0.085s
< waiting for any device >
Warning: skip copying radio_b image avb footer (radio_b partition size: 0, radio_b image size: 74739852).
Sending 'radio_b' (72988 KB)                       OKAY [  2.790s]
Writing 'radio_b'                                  (bootloader) Flashing Pack version SSD:g670-00011-190213-B-5306579
(bootloader) Flashing partition modem_b
OKAY [  0.500s]
Finished. Total time: 3.661s
Rebooting into bootloader                          OKAY [  0.028s]
Finished. Total time: 0.079s
--------------------------------------------
Bootloader Version...: b4s4-0.1-5262905
Baseband Version.....: g670-00011-190213-B-5306579
Serial Number........: 123QWEASDZXC
--------------------------------------------
extracting android-info.txt (0 MB) to RAM...
Checking 'product'                                 OKAY [  0.056s]
Checking 'version-bootloader'                      OKAY [  0.058s]
Checking 'version-baseband'                        OKAY [  0.057s]
Setting current slot to 'b'                        OKAY [  0.067s]
archive does not contain 'fastboot-info.txt'
extracting boot.img (64 MB) to disk... took 0.571s
archive does not contain 'init_boot.img'
extracting dtbo.img (8 MB) to disk... took 0.041s
archive does not contain 'dt.img'
archive does not contain 'pvmfw.img'
archive does not contain 'recovery.img'
extracting vbmeta.img (0 MB) to disk... took 0.000s
archive does not contain 'vbmeta_system.img'
archive does not contain 'vbmeta_vendor.img'
archive does not contain 'vendor_boot.img'
archive does not contain 'vendor_kernel_boot.img'
archive does not contain 'super_empty.img'
archive does not contain 'super_empty.img'
archive does not contain 'super_empty.img'
archive does not contain 'super_empty.img'
archive does not contain 'super_empty.img'
archive does not contain 'super_empty.img'
archive does not contain 'super_empty.img'
archive does not contain 'super_empty.img'
archive does not contain 'super_empty.img'
archive does not contain 'super_empty.img'
archive does not contain 'super_empty.img'
archive does not contain 'boot_other.img'
archive does not contain 'odm.img'
archive does not contain 'odm_dlkm.img'
archive does not contain 'product.img'
extracting system.img (2271 MB) to disk...fastboot: error: 
failed to extract 'system.img': I/O error
```

The `flash-all-sh` script is actually pretty simple:

```sh
$ cat flash-all.sh 
...
fastboot flash bootloader bootloader-sargo-b4s4-0.1-5262905.img
fastboot reboot-bootloader
sleep 5
fastboot flash radio radio-sargo-g670-00011-190213-b-5306579.img
fastboot reboot-bootloader
sleep 5
fastboot -w update image-sargo-pd2a.190115.029.zip
```

The bootloader and radio flashes succeeded, but the update failed.
 
I checked my storage space, in case I was running out, but I had plenty:

```sh
$ df -h .
Filesystem      Size  Used Avail Use% Mounted on
/dev/mmcblk0p2   27G  8.6G   17G  35% /
```

Gemini noticed that the drive path mmcblk0p2 indicated emmc storage, so the system might be choking on the large system image unzipping.

I tried unzipping the image manually, which succeeded:

```sh
$ unzip image-sargo-pd2a.190115.029.zip 
Archive:  image-sargo-pd2a.190115.029.zip
  inflating: android-info.txt        
  inflating: abl.img                 
  inflating: aop.img                 
  inflating: boot.img                
  inflating: cmnlib.img              
  inflating: cmnlib64.img            
  inflating: devcfg.img              
  inflating: dtbo.img                
  inflating: hyp.img                 
  inflating: keymaster.img           
  inflating: modem.img               
  inflating: qupfw.img               
  inflating: system.img              
  inflating: system_other.img        
  inflating: tz.img                  
  inflating: vbmeta.img              
  inflating: vendor.img              
  inflating: xbl.img                 
  inflating: xbl_config.img
```

Gemini then recommended installing the images manually, which also succeeded:

```sh
$ fastboot flash boot boot.img 
Sending 'boot_b' (65536 KB)                        OKAY [  2.424s]
Writing 'boot_b'                                   OKAY [  0.648s]
Finished. Total time: 3.387s

$ fastboot flash dtbo dtbo.img 
Sending 'dtbo_b' (8220 KB)                         OKAY [  0.317s]
Writing 'dtbo_b'                                   OKAY [  0.417s]
Finished. Total time: 1.205s

$ fastboot flash vbmeta vbmeta.img 
Sending 'vbmeta_b' (4 KB)                          OKAY [  0.120s]
Writing 'vbmeta_b'                                 OKAY [  0.376s]
Finished. Total time: 0.811s

$ fastboot flash vendor vendor.img 
Warning: skip copying vendor_b image avb footer (vendor_b partition size: 805306368, vendor_b image size: 140731786458496).
Sending sparse 'vendor_b' 1/3 (262140 KB)          OKAY [  9.645s]
Writing 'vendor_b'                                 OKAY [  0.374s]
Sending sparse 'vendor_b' 2/3 (262040 KB)          OKAY [  8.981s]
Writing 'vendor_b'                                 OKAY [  0.374s]
Sending sparse 'vendor_b' 3/3 (12276 KB)           OKAY [  1.205s]
Writing 'vendor_b'                                 OKAY [  0.459s]
Finished. Total time: 21.367s

$ fastboot flash system system.img 
Warning: skip copying system_b image avb footer (system_b partition size: 3267362816, system_b image size: 140730946922176).
Sending sparse 'system_b' 1/9 (262140 KB)          OKAY [  9.368s]
Writing 'system_b'                                 OKAY [  0.374s]
Sending sparse 'system_b' 2/9 (262140 KB)          OKAY [  8.934s]
Writing 'system_b'                                 OKAY [  0.374s]
Sending sparse 'system_b' 3/9 (262140 KB)          OKAY [  9.415s]
Writing 'system_b'                                 OKAY [  0.374s]
Sending sparse 'system_b' 4/9 (262140 KB)          OKAY [  9.464s]
Writing 'system_b'                                 OKAY [  0.374s]
Sending sparse 'system_b' 5/9 (262140 KB)          OKAY [  9.364s]
Writing 'system_b'                                 OKAY [  0.374s]
Sending sparse 'system_b' 6/9 (262140 KB)          OKAY [  9.654s]
Writing 'system_b'                                 OKAY [  0.374s]
Sending sparse 'system_b' 7/9 (262140 KB)          OKAY [  9.604s]
Writing 'system_b'                                 OKAY [  0.374s]
Sending sparse 'system_b' 8/9 (258620 KB)          OKAY [  9.384s]
Writing 'system_b'                                 OKAY [  0.374s]
Sending sparse 'system_b' 9/9 (232288 KB)          OKAY [  8.604s]
Writing 'system_b'                                 OKAY [  1.451s]
Finished. Total time: 88.579s
```

Then wipe user data:

```sh
$ fastboot -w
Erasing 'userdata'                                 OKAY [  5.363s]
Erase successful, but not automatically formatting.
File system type raw not supported.
wipe task partition not found: cache
Erasing 'metadata'                                 OKAY [  0.188s]
Erase successful, but not automatically formatting.
File system type raw not supported.
Finished. Total time: 5.929s
```

## Reboot

Finally, restart into Android:

```sh
$ fastboot reboot
Rebooting                                          OKAY [  0.013s]
Finished. Total time: 0.068s
```

Once Android had booted, I went through the new phone onboarding flow. I connected to wifi, but didn't enable Google services. At the end, I saw the phone was connected to Tello LTE. I sent a test SMS, which went through, and then, the final test, a voice call, which ... 🥁 ... went through!!!

## Summary

So, what did I learn? I spent a lot of time debugging VoLTE support for my Pixel 3a, which familiarized me with the system, but in the end Android just worked. 

My dream of one OS to rule them all seems less feasible now. pmOS is great for edge devices, less so for dev machines.

pmOS is probably better for Linux phones than mass-market Android phones that need to be pried open, though I haven't tested with a Linux phone yet.

Next, I'd like to try the alternative approach of accepting that proprietary firmware is a fact of life, and shimming them might be a more tractable strategy for extending the lives of mass-market Android phones than reverse engineering them. With this in mind, I'll give LineageOS a spin. I'm also curious about trying pmOS with hardware intended for Linux.