---
title: Netbook development
layout: post
date: 2018-04-28 12:47:00 -0700
tags:
- netbook
- chromebook
- cloud9
- toolkit
- prototype
- javascript
- aws
- ubuntu
- ssh
- ec2
- chrome-remote-desktop
- googlecloud
---
## Context

I'm looking for a laptop for side-projects, mostly server-side.

I've been using a Web-based editor at work, which makes my Macbook feel like a glorified netbook.

## Hardware

The 15" Macbook is great, but $2500 is steep for my needs. I think an actual netbook would be sufficient, but I have little experience w them.

I like Chromebook's simplicity. The Pixelbook seems well-designed, but it's pricey. Looking around, $500 seems like a reasonable experiment.

At this point I'm looking for a Chromebook with:

* High ratings in general (crowd wisdom)
* Close to Pixelbook specs
* Close to 15" screen
* [Support for Android](https://sites.google.com/a/chromium.org/dev/chromium-os/chrome-os-systems-supporting-android-apps), so I can use [1Password](https://discussions.agilebits.com/discussion/67454/does-1password-work-on-a-chromebook-chrome-os)
* USB ports (so I can charge my phone :)

The Acer Chromebook 14 is highly rated on Amazon, provides 4GB ram, 32GB storage, USB 3, Wi-FI AC, HD video, supports Android and costs \~$300, and I can pick it up immediately at a local BestBuy, which provides a surprisingly nice Instacart-like experience.

### Updates

[Acer is the genus of trees](https://www.inaturalist.org/taxa/47727-Acer) containing maples :) 🍁

The keyboard, esp the space bar, is flaky compared w a mac. (On the upside, it's improving my touch-typing :)

After using the chromebook for a few months, 4GB is just enough. It's great for having a few Chrome tabs open. But jumping between a dozen, esp email and slack, with a few different apps running, esp video conference, pushes the limits.

Android interop is great, but not all apps work well. For example, 1Password is fine, but Slack is crashy. Also, not all apps are compatible, ie just because I have an app on my phone doesn't mean it can be installed on my chromebook. I'd guess the same would be true with a tablet.

## Dev machine

Now that I have a screen, keyboard and internet connection, I need a machine to develop on. [Cloud9](https://aws.amazon.com/cloud9/), which layers a Web-based IDE on EC2, is good, but lately I've just been using an Ubuntu instance on Google Cloud.

This whole plan of using a chromebook + cloud really shines wrt dynamic resource changes, ie as compared w upgrading hardware. I've been playing around with large data sets recently using [Anaconda](https://www.anaconda.com/download/#linux), and ran out of storage with the default Cloud9 configuration (8GB). [Upgrading the EBS "volume"](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/console-modify.html) to 16GB was fast and easy (once I found it):

1. open the EC2 console
2. stop the EC2 instance created by Cloud9
3. in the left column, find Elastic Block Store > Volumes
4. ctrl click on the volume and select modify

## SSH

[Google Cloud Shell](https://cloud.google.com/shell/docs/) (or Cloud9's shell) makes it easy to create SSH keys I can use to access VMs via [Secure Shell](https://chrome.google.com/webstore/detail/secure-shell/pnhechapfaindjhompbnflcldabbghjo/support?hl=en) ([with "open as window" enabled](https://chromium.googlesource.com/apps/libapps/+/master/nassh/doc/FAQ.md#How-do-I-send-Ctrl_W_Ctrl_N-or-Ctrl_T-to-the-terminal), so I can use ctrl-w and have more conventional alt-tab navigation).

Here's what worked for me:

1. Use the shell to generate an SSH key pair:

        ssh-keygen -t rsa -b 2048 -v -C "erikeldridge@ubuntu.gcloud" -f admin
2. Enable read permissions on the private key (so Secure Shell can read it):

        chmod 400 admin
3. Download both keys (copy/paste to local files)
4. Create a new VM, copying the public key created above into the settings, and start the VM
5. Grab the external IP from the VM console. (Note this changes every time the instance stops.)
6. In Secure Shell, specifying the user (eg "ec2-user" on EC2) and IP copied above, and import [both the public and private key](https://chromium.googlesource.com/apps/libapps/+/master/nassh/doc/FAQ.md#Can-I-connect-using-a-public-key-pair-or-certificate). (The identity field should change from "default" to the key name, eg "admin".)

It took me awhile to figure out how [paste text into Secure Shell](https://chromium.googlesource.com/apps/libapps/+/master/nassh/doc/FAQ.md#How-do-I-paste-text-to-the-terminal "Secure Shell paste docs"): two-finger tap.

### EC2

EC2 distributes private keys (corresponding with public keys on VMs) via .pem files

Several people have documented the [process of generating a public key from the private key](http://www.mattburns.co.uk/blog/2012/11/15/connecting-to-ec2-from-chromes-secure-shell-using-only-a-pem-file/).

## Source control

Storage-backed VMs, like Google Cloud's and EBS-backed EC2, maintain state, so public keys are durable for use w source control hosts like Github, BitBucket, etc.

Create a new SSH key pair with the default "id_rsa" name for each VM that needs to connect to a host, and add the public key to the SSH settings in the host.

## Remote desktop

I'd like to explore Android development using this set up.

The first step is setting up remote desktop, so I can run Android Studio and an emulator.

### Install Chrome Remote Desktop (CRD)

The [CRD docs](https://support.google.com/chrome/answer/1649523) are pretty good, but assume you already have a desktop with Chrome running. For a cloud VM, we need a way to bootstrap without a desktop. A couple ([1](https://productforums.google.com/forum/#!msg/chrome/CTnqSKj6uts/8xg88ribRxQJ), [2](https://productforums.google.com/d/msg/chrome/WvcFOblHMik/hGlM875QAwAJ)) Chrome support threads were helpful. Steps:

1. Install a window manager:

        $ sudo apt-get install xfce4
2. Download the CRD installer and install:

        $ wget https://dl.google.com/linux/direct/chrome-remote-desktop_current_amd64.deb
        ...
        $ sudo dpkg -i chrome-remote-desktop_current_amd64.deb
3. Define \~/.chrome-remote-desktop-session:

        exec /usr/sbin/lightdm-session "startxfce4"
4. Restart CRD to load the config:

        $ sudo /etc/init.d/chrome-remote-desktop restart
5. Authenticate, register the host and set an access pin:

        $ /opt/google/chrome-remote-desktop/start-host

   Note: this step directs you to a url, which redirects to another url. [The auth token is a query param of the redirect url](https://askubuntu.com/questions/795703/chrome-remote-desktop-access-to-headless-ubuntu-server-16-04-machine#comment1587657_953269).
6. Install the CRD extension on the chromebook and launch it. You should see your host listed in the "my computers" section.
7. Click on your host and enter the access pin you defined

## Development HTTP

I like using JavaScript for [prototyping](prototype-toolkit "Prototype toolkit") ideas. Given we're just working in Ubuntu, running a server is standard. We just need to open a port to call the server

1. Create a security group with a "Custom TCP Rule" exposing port 3000
1. Add this security group to the VM
1. Note instance's external IP
1. In browser, load IP with scheme http and port 3000
