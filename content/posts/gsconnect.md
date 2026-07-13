---
title: GSConnect
date: 2026-07-13T14:00:00-05:00
tags:
  - syncthing
  - gsconnect
  - gnome
  - alpine
categories:
  - technical-tools
---
## Context
I'm exploring ways to bridge my mobile and desktop devices. I've had a good experience with Syncthing, but it's focused on file synchronization. Now I want to get experience with UX synchronization.

Gnome provides an [extension called GSConnect](https://extensions.gnome.org/extension/1319/gsconnect/), which appears to be the canonical device bridging solution.
## Installation
Installing the extension appears to be very simple: just navigate to the Gnome extension portal, search for "GSConnect", and click install.

On Android, install the [KDEConnect app from the Play Store](https://play.google.com/store/apps/details?id=org.kde.kdeconnect_tp&hl=en_US).
## Pairing
In Android:
1. Open the KDE Connect app and observe the laptop is listed as a peer device
2. Tap the device and request pairing

In Gnome:
1. Click the menu bar in the top right
2. Observe the Android device is listed in the GSConnect menu
## Mounting
In Gnome:
1. Open the GSConnect menu bar item
2. Select "Mount"
3. Open the Files app
4. Observe an IP address appears to be mounted
5. Click on the IP address and observe an error saying you don't have permission to access "/"
6. Manually edit the location to append "storage/emulated/0", so it looks something like sftp://192.168.x.x:1750/storage/emulated/0
7. Observe you can now see files!
8. Tip: bookmark the edited location to make it easier to return to



