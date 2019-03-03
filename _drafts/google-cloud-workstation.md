---
layout: post
title: Google Cloud workstation
date: 2019-03-02 19:25:21 -0800
tags:
- netbook
- gcloud

---
## Assumptions

* netbook set up with SSH key pair
* Google Cloud project created

## Create instance

In Google Cloud console:

1. nav to Compute Engine and create new micro instance with name "workstation", region "us-west" and size "f1-micro"
1. Start instance
1. Copy external IP address

# Enable SSH access

In Google Cloud console:

1. Search for "SSH key" and select "metadata" result
1. Copy public key contents from local machine using Text and paste into Cloud console https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys#project-wide
3. Open Secure Shell on local machine, select key, paste IP address and connect

# Enable desktop

1. Install lightweight window manager

		sudo apt install -y xubuntu-desktop

2. Download Chrome Remote Desktop (CRD)

    	wget https://dl.google.com/linux/direct/chrome-remote-desktop_current_amd64.deb

1. Install CRD

		sudo dpkg -i chrome-remote-desktop_current_amd64.deb 
