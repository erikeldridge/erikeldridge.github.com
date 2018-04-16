---
title: Netbook development
layout: post
date: 2018-04-15 19:34:35 -0700
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

## IDE

Now that I have a screen, keyboard and internet connection, I need a machine to develop on. A colleague recommended [Cloud9](https://aws.amazon.com/cloud9/), which layers a Web-based IDE on EC2.

Cloud9 provides an "auto-hibernation" setting, which stops the associated EC2 instance,  to save cost. Opening the IDE after manually stopping the instance restarts it.

Cloud9 configures EC2 and EBS, but I remember seeing a doc mention security is still our responsibility. The [Node docs](http://docs.aws.amazon.com/cloud9/latest/user-guide/sample-nodejs.html) describe an easy way to stay up to date: `sudo yum -y update`.

Aside: the Lambda editor seems like a simplified Cloud9 IDE 🤔

Setting up Cloud9 was straightforward. Kudos to that team for a great product, and AWS for integrating it well.

### Updates

The past couple months' AWS bills are around $1, mostly for EBS (The OS alone is 4GB).

This whole plan of using a chromebook + cloud really shines wrt dynamic resource changes, ie as compared w upgrading hardware. I've been playing around with large data sets recently using [Anaconda](https://www.anaconda.com/download/#linux), and ran out of storage with the default Cloud9 configuration (8GB). [Upgrading the EBS "volume"](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/console-modify.html) to 16GB was fast and easy (once I found it):

1. open the EC2 console
2. stop the EC2 instance created by Cloud9
3. in the left column, find Elastic Block Store > Volumes
4. ctrl click on the volume and select modify

## SSH

Cloud9 provides a terminal, but I also wanted to play around with [Secure Shell](https://chrome.google.com/webstore/detail/secure-shell/pnhechapfaindjhompbnflcldabbghjo/support?hl=en) ([with "open as window" enabled](https://chromium.googlesource.com/apps/libapps/+/master/nassh/doc/FAQ.md#How-do-I-send-Ctrl_W_Ctrl_N-or-Ctrl_T-to-the-terminal), so I can use ctrl-w and have more conventional alt-tab navigation). Here's what worked for me:

1. Use the Cloud9 terminal to generate an SSH key pair in your \~/.ssh dir (we can also use this key for github, bitbucket, etc; I use the default id_rsa name and omitted the passphrase): `ssh-keygen -t rsa -b 2048 -v`
2. Enable read permissions on the private key: `chmod 400 id_rsa`
3. Authorize the public key (Cloud9 also maintains a key there, so don't clobber the file):

        echo "`cat id_rsa.pub`" >> ~/.ssh/authorized_keys
4. Download both keys (id_rsa and id_rsa.pub) by control-clicking on the files in Cloud9's file tree and selecting "download"
5. Grab public DNS hostname from the EC2 console, eg ec2-51-88-231-95.us-west-2.compute.amazonaws.com (Note this changes every time the instance stops.)
6. In Secure Shell, specify the Cloud9 user ("ec2-user") and hostname copied above, and import [both the public and private key](https://chromium.googlesource.com/apps/libapps/+/master/nassh/doc/FAQ.md#Can-I-connect-using-a-public-key-pair-or-certificate). (The identity field should change from "default" to "id_rsa".)

It took me awhile to figure out how [paste text into Secure Shell](https://chromium.googlesource.com/apps/libapps/+/master/nassh/doc/FAQ.md#How-do-I-paste-text-to-the-terminal "Secure Shell paste docs"): two-finger tap.

## Source control

EBS-backed EC2 instances, like Cloud9, persist to EBS on shutdown, so public keys are durable for use w services like Github, BitBucket, etc.

## Compute

Cloud9 is nice, but sometimes I'd like to work with the [compute](/compute) layer directly.

### EC2

Click the "create instance" button on the EC2 dashboard.

I prefer to use Ubuntu, so select the general purpose 16.04 AMI.

Click the "review and launch" button.

Create an "ssh" security group that accepts connections from anywhere, but otherwise accept the defaults and click the "launch" button.

Create an "admin" key pair at the prompt.

Note: the names of the security group and key pair are arbitrary.

The admin.pem downloaded when creating a key pair isn't immediately usable in this chromebook setup. We need a key pair and the private key needs to be readable.

So, launch a Cloud9 session, create a file called "admin", copy/paste the pem file contents in it, and grant read permissions, eg `chmod 400 admin`.

Create a public key from the private key: `ssh-keygen -y -f admin > admin.pub`.

Download "admin" and "admin.pub" to the chromebook and use it with the Secure Shell, as described above.

## Remote desktop

I'd like to explore Android development using this set up.

The first step is setting up remote desktop, so I can run Android Studio and an emulator.

### Create instance with window manager

I like Ubuntu, and there's lots of support for it. The [AMI browser on ubuntu.com](https://cloud-images.ubuntu.com/locator/ec2/) makes it easy to find an LTS (stable version) backed by HVM (recommended by [EC2 docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)) EBS (like Cloud9's configuration) in my region (close by for low latency).

[EC2's getting started docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html) do a good job explaining how to set up an instance with sane defaults. One caveat: I was able to launch an instance as documented, but if I tried to reuse the pub key created above, the instance never acquired a public IP. So, it seems I need to use an EC2 key pair, which requires a bit of finagling as chromebook's SSH app requires a private key with restricted permissions and a public key, but EC2's key pair generation only provides a private key with open permissions. Workaround:

1. Create a key pair and download the .pem file as instructed. (I'll use "admin" as a name here per the docs [recommendation to create an "Administrator" account](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html#create-an-iam-user).)
2. Open the admin.pem file using chromebook's Text app and copy the contents
3. In the Cloud9 terminal
   1. Create a new file \~/.ssh/id_rsa and paste the .pem contents into it
   2. Restrict permissions (`chmod 400 \\\\\\\~/.ssh/id_rsa`) and download as described above
   3. Generate a public key (`-keygen -y -f \\\\\\\~/.ssh/id_rsa > \\\\\\\~/.ssh/id_rsa.pub`) and download that too
4. In the chromebook, import these keys into the SSH app as described above
5. SSH into the ubuntu instance using the username "ubuntu", ie as opposed to "ec2-user" for Amazon Linux.

### Install Chrome Remote Desktop (CRD)

The [CRD docs](https://support.google.com/chrome/answer/1649523) are pretty good, but assume you already have a desktop with Chrome running. For EC2, we need a way to bootstrap without a desktop. A couple ([1](https://productforums.google.com/forum/#!msg/chrome/CTnqSKj6uts/8xg88ribRxQJ), [2](https://productforums.google.com/d/msg/chrome/WvcFOblHMik/hGlM875QAwAJ)) Chrome support threads were helpful. Steps:

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