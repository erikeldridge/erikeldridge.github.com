---
title: Mobile Device Sources
date: 2026-07-17T19:39:00-05:00
tags:
  - postmarketos
categories:
  - technical-tools
---
## TLDR
- Search Swappa for unlocked phones with a specific model number and ask the seller to verify the device is "OEM unlockable"
- Sendero sells refurbished OnePlus 6T with pmOS installed 
- Murena sells refurbished Pixels with eOS, an Android fork, installed
- The Google Store sells refurbished Pixels
## Context
I want to extend the life of my phone (Pixel 8) by installing an alternative OS when it stops receiving updates from the manufacturer.

I'm targeting postmarketOS (pmOS) as the alternative OS, so this narrows the problem down to identifying devices supported by pmOS.

[The pmOS device list](https://wiki.postmarketos.org/wiki/Devices) grades the Pixel 8 as non-booting, so I'll focus on devices that do boot. This turns out to be surprisingly tricky!

I can get a "linux" phone that's hard to find, but likely to work, or continue in my current state with an "android" phone that's easy to find, but unlikely to work.

Fortunately, an earlier version of the Pixel (3a) has one of the highest levels of support, so I can start there.  But where can I get a Pixel 3a?
## eBay
eBay is what first came to mind when thinking about where to buy an old phone. It would be amazing to just be able to grab a cheap device there and flash it, but I knew the device had to be unlocked to be able to install an alternative OS and there didn't seem to be an easy way to filter for that.
## Back Market
This was my next stop. It appears to be in part a view over eBay vendors, but with more quality control and a generous return policy. Given I'm new to this, that was probably advisable. The site has a search filter for "unlocked" and had Pixel 3a phones in stock, so I bought one.

When it arrived, I observed Developer Options  > OEM Unlockable was grayed out with a note saying the device was carrier locked. Turns out, there are two types of unlocked: network and bootloader! The former means the device is free to use on different carriers. The latter means the device allows a new OS to be flashed. Most of the time "unlocked" refers only to network unlocked.

More specifically, devices sold through a carrier like Verizon often have a permanently locked bootloader.

Fortunately, Back Market support is great. I messaged them and they walked me through the return process.
## Swappa
Next, I searched around for Pixel 3a with bootloader unlocked and came up with a model number G020G. Searching for that turned up a listing on Swappa, and the listing prominently displayed the model number. For comparison, I also found listings on eBay, but they would say things like "the model can be any one of G013A, G013C, G020G, G020E", which is confusing.

I'd heard it was also advisable to double-check with seller. Swappa make this easy, and the seller replied quickly. I purchased the device and it was OEM unlockable!

Now, I can accept doing all this because I have a specific use case in mind, but it's hard for me to imagine the average phone user doing it. This line of thought led me to start thinking about alternatives, which I'll document below.
## Android Vs Linux Phones
I see a general distinction between "android" and "linux" phones. The former doesn't just mean it has Android on it. It means the manufacturer likely installed closed source drivers. For comparison Linux phones are built from hardware with open source drivers. Installing Linux on an Android phone is challenging because the community has to reverse engineer the drivers.

There are a few common Linux phones:
- PinePhone
- FairPhone
- Librem
- ShiftPhone

So, there's a decision to be made: Do I want to get a mass produced Android device and reverse engineer drivers, or do I want to get a niche Linux device that's much more likely to work?

PinePhone is my ideal. It's designed to be repairable. The manufacturer even sells the components and publishes the CAD files! But my overall goal is to identify devices that can meet most people where they are, so that puts me in the Android device camp.
## Bootloader Unlocking
As noted above, I must be able to unlock the bootloader to install the alternative OS, and Android phones with unlocked bootloaders are relatively rare. Pixels bought from the Google Store are least likely to be locked. These are also referred to as "factory" or "OEM" unlocked. Apple, Samsung and anything sold by a carrier is likely to have a permanently locked bootloader.
