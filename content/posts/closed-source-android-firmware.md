---
title: Closed-source Android Firmware
date: 2026-07-20T01:08:00-05:00
tags:
  - android
  - postmarketos
  - linux
categories:
  - organizational-tools
---
I've been thinking about why it's easier to install mobile Linux on so-called Linux phones than Android phones, and for that matter, why it's easier to install Linux on a desktop than a phone.

Installing Linux on my laptop mostly concerned the distribution I wanted to use. I had my choice from dozens.

Installing Linux on a phone was entirely different. I documented my hardware considerations in my post on [mobile device sources](/posts/mobile-device-sources/). This post just underscores a realization: even though Android is open-source, a large part of the functionality comes from closed-source firmware installed by the manufacturer.

This closed-source firmware is used to interact with specialty components on the devices. For example, if the camera is a differentiating feature of a phone, the manufacturer has little incentive to share the source.

[PostmarketOS' Mainlining document](https://wiki.postmarketos.org/wiki/Mainlining) describes it this way:

>The cold hard truth is that the downstream code is simply not meant to be maintained or get used outside Android. The code quality is often several magnitudes worse, which makes maintenance rather complicated. Often large parts of the drivers are moved into proprietary parts in Android userspace - which are generally impossible to use without emulating the expected Android environment. At the end, the effort to make such drivers work properly on long term is often as much as rewriting them properly for mainline. 

[PostmarketOS: The Linux OS Giving Abandoned Smartphones a Second Life](https://www.mayhemcode.com/2026/03/postmarketos-linux-os-giving-abandoned.html) provides a helpful clarification:

> A downstream kernel is a vendor-modified fork. When a manufacturer builds a phone, they take the Linux kernel, add proprietary drivers for their specific hardware, modify it extensively, and publish the result. That forked kernel may never be updated again after the phone’s market life ends. Many smartphone components — camera systems, proprietary modems, fingerprint sensors — were written specifically for these downstream kernels and have no mainline equivalents ... Camera support deserves specific mention because it is the most common point of disappointment. The camera subsystem on Android phones typically depends on vendor-specific drivers written for downstream kernels. Porting those drivers to mainline Linux requires enormous engineering effort and, in many cases, cooperation from hardware vendors who have no incentive to provide it.

For contrast, Linux phones, like the PinePhone, are intentionally constructed from components for which the drivers are well-supported by Linux. Installing Linux on these devices is relatively straightforward, but the devices themselves are hard to come by.
