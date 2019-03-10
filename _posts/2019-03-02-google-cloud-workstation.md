---
layout: post
title: 'Google Cloud workstation '
date: 2019-03-09 16:21:54 -0800
tags:
- netbook
- gcloud
- github
- ssh
- toolkit
- remote
- desktop
- chrome
- ubuntu
comments: true

---
## Assumptions

* [netbook](netbook-development "my notes on netbook development") set up with SSH key pair
* [Google Cloud project](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project "Google Cloud project docs") created

## Create project

We need a project to own VM instances.

In Google Cloud console:

1. Create "workstations" project

## Create instance

In Google Cloud console:

1. Nav to Compute Engine and create new micro instance
2. Name "ubuntu"
3. Region "us-west"
4. Size "g1-small", so we have enough memory to install things like Ruby
5. OS ubuntu LTS
6. Start instance
7. Copy external IP address

## SSH access

Enable laptop to connect to cloud instance. In Google Cloud console:

1. Search for "SSH key" and select "metadata" result
2. Copy public key contents from local machine using Text and paste into Cloud console https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys#project-wide
3. Open Secure Shell on local machine, select key, paste IP address and connect

## Desktop

The [Chrome Remote Desktop (CRD) docs](https://support.google.com/chrome/answer/1649523) are pretty good, but assume you already have a desktop with Chrome running. For a cloud VM, we need a way to bootstrap without a desktop. A couple ([1](https://productforums.google.com/forum/#!msg/chrome/CTnqSKj6uts/8xg88ribRxQJ), [2](https://productforums.google.com/d/msg/chrome/WvcFOblHMik/hGlM875QAwAJ)) Chrome support threads were helpful. Steps:

1. Install lightweight window manager

        sudo apt install -y xubuntu-desktop
2. Download CRD

        wget https://dl.google.com/linux/direct/chrome-remote-desktop_current_amd64.deb
3. Install CRD

        sudo dpkg -i chrome-remote-desktop_current_amd64.deb
4. Define \~/.chrome-remote-desktop:

        exec /usr/sbin/lightdm-session "startxfce4"

   Note: misconfiguration of this file (including misnaming) results in "… Session process terminated … " errors.
5. Restart CRD to load the config:

        sudo /etc/init.d/chrome-remote-desktop restart
6. Use [http://remotedesktop.google.com/headless](http://remotedesktop.google.com/headless "http://remotedesktop.google.com/headless") to generate the command required to register a host and set an access pin ([credit](https://groups.google.com/d/msg/gce-discussion/tN9oZs8xWps/b2PtOBTeAQAJ)), and then run this command on the workstation

   Note: we used to have to edit the Compute Engine instance firewall to enable [udp:all and tcp:443,5222 open for ingress and egress](https://support.google.com/chrome/answer/1649523 "Access another computer with Chrome Remote Desktop docs"), but this no longer seems required
7. On the netbook, launch CRD app, select the host created above and enter the access pin you defined

## Github

Define an SSH key pair to enable communication with Github:

1. Define SSH key pair, per [github SSH key generation docs](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key "Github SSH key generation documentation"):

        ssh-keygen -t rsa -b 4096 -C '<project>.<instance>@<cloud provider>'
2. Copy public key contents into github settings