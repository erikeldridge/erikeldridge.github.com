---
title: Netbook development
layout: post
date: 2017-12-27 16:00:09 -0800
tags:
- netbook
- chromebook
- cloud9
- toolkit
- prototype
- javascript
- aws
---
## Context

I'm looking for a laptop for side-projects, mostly server-side.

I've been using a Web-based editor at work, which makes my Macbook feel like a glorified netbook.

## Hardware

The 15" Macbook is great, but $2500 is steep for my needs. I think an actual netbook would be sufficient, but I have little experience w them.

I like Chromebook's simplicity. The Pixelbook seems well-designed, but it's pricey. Looking around, $500 seems like a reasonable experiment.

At this point I'm looking for a Chromebook with:

* High ratings in general
* Close to Pixelbook specs
* Close to 15" screen
* [Support for Android](https://sites.google.com/a/chromium.org/dev/chromium-os/chrome-os-systems-supporting-android-apps), so I can use [1Password](https://discussions.agilebits.com/discussion/67454/does-1password-work-on-a-chromebook-chrome-os)
* USB ports (so I can charge my phone :)

The Acer Chromebook 14 is highly rated on Amazon, provides 4GB ram, 32GB storage, USB 3, Wi-FI AC, HD video, supports Android and costs \~$300, and I can pick it up immediately at a local BestBuy, which provides a surprisingly nice Instacart-like experience.

## IDE

Now that I have a screen, keyboard and internet connection, I need a machine to develop on. A colleague recommended [Cloud9](https://aws.amazon.com/cloud9/), which layers a Web-based IDE on EC2.

Cloud9's original incarnation as [c9.io](https://c9.io/) is great, and has a free tier, but the terminal  frequently hangs (due to resource sharing, I presume) and I'd guess maintaining it  has lower priority than building the new AWS version.

I have little experience with AWS, but [Amazon estimates the cost at \~$2/mo](https://aws.amazon.com/cloud9/pricing/), which also seems like a reasonable amount to experiment with. I created a budget for $10/mo just in case. After a few hours of usage over the past few days, my bill is $0.15, mostly for EC2, but a few cents for S3 (Cloud9-managed EBS) and data transfer too.

Cloud9 provides an "auto-hibernation" setting to save cost. This appears to stop the associated EC2 instance. Opening the IDE after manually stopping the instance restarts it.

Cloud9 configures EC2 and EBS, but I remember seeing a doc mention security is still our responsibility. The [Node docs](http://docs.aws.amazon.com/cloud9/latest/user-guide/sample-nodejs.html) describe an easy way to stay up to date: `sudo yum -y update`.

Cloud9 provides a terminal, but I was also able to successfully access via Secure Shell (with "open as window" enabled, so I can use ctrl+w) as follows:

1. Use the Cloud9 terminal to generate an SSH key pair manually (I named mine "chromebook" and omitted the passphrase): `ssh-keygen -t rsa -b 2048 -v`
2. Enable read permissions on the private key: `chmod 400 chromebook`
3. Authorize the public key (Cloud9 also maintains a key there, so don't clobber the file): `echo "\`cat chromebook.pub\`" >> \~/.ssh/authorized_keys`
4. Download both keys (chromebook and chromebook.pub) by control-clicking on the files in Cloud9's file tree and selecting "download"
5. Grab public DNS hostname from the EC2 console, eg ec2-51-88-231-95.us-west-2.compute.amazonaws.com
6. In Secure Shell, specify the Cloud9 user ("ec2-user") and hostname copied above, and import the public **and** private keys. (The identity field should change from "default" to "chromebook".)

Setting up Cloud9 was straightforward. Kudos to that team for a great product, and AWS for integrating it well.

## Source control

Now I need a place to persist source code. Bitbucket provides free private repos. After generating an SSH key pair in Cloud 9's terminal and adding the public key to my Bitbucket account Git works as expected. Cloud9 automatically persists to EBS, so the key pair survives [hibernation](https://aws.amazon.com/cloud9/faqs/).

To simplify SSH passphrase usage, I had to run `eval "$(ssh-agent)"` and then `ssh-add` after each restart.

## Development HTTP

I like using JavaScript for [prototyping](prototype-toolkit "Prototype toolkit") ideas, so:

1. In Cloud9 IDE, create [express server](https://expressjs.com/en/starter/hello-world.html)
2. In EC2 console,
   1. Create a security group with a "Custom TCP Rule" exposing port 3000
   2. Add this security group to the instance created by Cloud9
   3. Note instance's "Public DNS" hostname
3. In browser, load host with scheme http and port 3000

## Emoji

There's an [onscreen keyboard](https://support.google.com/chromebook/answer/6076237?hl=en) with emoji support, but it takes a million clicks to get to. Still on the lookout for a [Rocket](http://matthewpalmer.net/rocket/)-like emoji picker.

## Summary

After a day of experience, setting things up and drafting this post, I'm pleased with the set up. Seems like a success so far.