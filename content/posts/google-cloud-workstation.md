---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "48509495924"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2019-03-02T22:02:00+00:00"
guid: http://blog.erikeldridge.com/?p=1754
parent_post_id: null
post_id: "1754"
timeline_notification: "1599344288"
title: Google Cloud workstation
url: /2019/03/02/google-cloud-workstation/

---
## Assumptions

- [Netbook](https://erikeldridge.com/notes/netbook-development) set up with SSH key pair

## Create project

We need a [Google Cloud project](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project) to own workstation VM instances. It's helpful to make it independent of other projects.

## Create instance

In Google Cloud console:

1. Nav to Compute Engine and create new micro instance
1. Name "ubuntu"
1. Region "us-west"
1. Size "custom (1 vCPU, 4 GB memory)", so we have enough memory to install things like Ruby and IntelliJ
1. OS Ubuntu LTS
1. Start instance
1. Copy external IP address

## SSH access

Enable laptop to connect to cloud instance, as described in the [project-wide SSH keys documentation](https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys#project-wide). In Google Cloud console:

1. Search for "SSH key" and select "metadata"
1. Copy public key contents from local machine using Text and paste into Cloud console
1. Open Secure Shell on local machine, select key, paste IP address and connect

## GitHub

Define an SSH key pair to enable communication with GitHub:

1. Define SSH key pair, per [github SSH key generation docs](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key):  
`ssh-keygen -t rsa -b 4096 -C '<project>.<instance>@<cloud provider>'`
1. Copy public key contents into GitHub settings

## Vim

1. Copy over \`.vimrc\` from dotfiles repo
1. Launch vim and install plugins defined in vimrc: \`:PlugInstall\`

## Desktop

The [Chrome Remote Desktop (CRD) docs](https://support.google.com/chrome/answer/1649523) are pretty good, but assume you already have a desktop with Chrome running. For a cloud VM, we need a way to bootstrap without a desktop. A couple ([1](https://productforums.google.com/forum/#!msg/chrome/CTnqSKj6uts/8xg88ribRxQJ), [2](https://productforums.google.com/d/msg/chrome/WvcFOblHMik/hGlM875QAwAJ)) Chrome support threads were helpful. Steps:

1. Install lightweight window manager:  
`sudo apt install -y xubuntu-desktop`
1. Download CRD:  
`wget https://dl.google.com/linux/direct/chrome-remote-desktop_current_amd64.deb`
1. Install CRD:  
`sudo dpkg -i chrome-remote-desktop_current_amd64.deb`
1. Define ~/.chrome-remote-desktop:  
`exec /usr/sbin/lightdm-session "startxfce4"`  
Note: misconfiguration of this file (including misnaming) results in "… Session process terminated … " errors.
1. Restart CRD to load the config:  
`sudo /etc/init.d/chrome-remote-desktop restart`
1. Use [http://remotedesktop.google.com/headless](http://remotedesktop.google.com/headless) to generate the command required to register a host and set an access pin ([credit](https://groups.google.com/d/msg/gce-discussion/tN9oZs8xWps/b2PtOBTeAQAJ)), and then run this command on the workstationNote: we used to have to edit the Compute Engine instance firewall to enable [udp:all and tcp:443,5222 open for ingress and egress](https://support.google.com/chrome/answer/1649523), but this no longer seems required
1. On the netbook, launch CRD app, select the host created above and enter the access pin you defined
