---
title: Netbook development
layout: post
date: 2017-12-24 00:00:00 +0000
tags:
- netbook
- chromebook
- cloud9
- toolkit
---
## Context

I'm looking for a laptop for side-projects, mostly server-side.

I've been using a Web-based editor at work, which makes my Macbook feel like a glorified netbook.

## Hardware

The 15" Macbook is great, but $2500 is steep for my needs. I think an actual netbook would be sufficient, but I have little experience w them.

I like Chromebook's simplicity. The Pixelbook seems well designed, but it's too pricey. Looking around, $500 seems like a reasonable experiment.

At this point I'm looking for a Chromebook with:

* High ratings in general
* Something close to Pixelbook specs
* Close to 15" screen
* [Support for Android](https://sites.google.com/a/chromium.org/dev/chromium-os/chrome-os-systems-supporting-android-apps), so I can use [1Password](https://discussions.agilebits.com/discussion/67454/does-1password-work-on-a-chromebook-chrome-os)
* USB ports (so I can charge my phone :)

The Acer Chromebook 14 is highly rated on Amazon, provides 4GB ram, 32GB storage, USB 3, Wi-FI AC, HD video, supports Android and costs \~$300, and I can pick it up immediately at a local BestBuy, which provides a surprisingly nice Instacart-like experience.

## IDE

Now that I have a screen, keyboard and internet connection, I need a machine to develop on. A colleague recommended [Cloud9](https://aws.amazon.com/cloud9/), which layers a Web-based IDE on EC2.

Cloud9's original incarnation as [c9.io]() is great, and has a free tier, but the terminal would hang (due to resource sharing, I presume) and maintaining it probably has lower priority than maintaining the new AWS version.

I have little experience maintaining AWS resources, but [Amazon estimates the cost at \~$2/mo](https://aws.amazon.com/cloud9/pricing/), which also seems like a reasonable experiment.

Setting up Cloud9 was straightforward. Kudos to that team for a great product, and AWS for integrating it well.

## Source control

Now I need a place to persist source code. Bitbucket provides free private repos. After generating an SSH key pair in Cloud 9's terminal and adding the public key to my Bitbucket account Git works as expected. We'll see if the key pair persists through [hibernation](https://aws.amazon.com/cloud9/faqs/).

## Summary

All in all, I'm pleased with the new setup.