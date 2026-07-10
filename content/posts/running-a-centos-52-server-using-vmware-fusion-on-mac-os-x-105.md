---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-04T04:14:37+00:00"
guid: http://erikeldridge.wordpress.com/?p=245
parent_post_id: null
post_id: "245"
tags:
  - centos
  - mac
  - tutorial
  - vmware
title: running a CentOS 5.2 server using VMWare Fusion on Mac OS X 10.5
url: /2009/05/03/running-a-centos-52-server-using-vmware-fusion-on-mac-os-x-105/

---
prerequisites:

- An installation of VMWare Fusion Version 1.1 (62573)
- A Mac w/ OS X 10.5.2 installed

installation

1. get CentOS
   a) Go to CentOS's site and navigate to a download of this first install disk, e.g., "Downloads" -> "CentOS-5 ISOs" -> "i386" -> "ftp://mirror.atlantic.net/pub/centos/5.3/isos/i386/" -> "CentOS-5.3-i386-bin-1of6.iso".  I downloaded the torrent "CentOS-5.3-i386-bin-1to6.torrent", but deselected all except the torrent for disk 1, i.e., it says "1to6", but you can specify any or all of them, and we only need the first one.
1. Once the iso is downloaded, launch VMware and create a new virtual machine
   a) Launch the wizard by clicking "File" -> "New..."
   b) Select "Linux" and "Red Hat Enterprise Linux 5" for the operating system and version, respectively, and click "Continue"
   c) Accept the defaults for name and location and continue
   d) Accept the default size for the virtual hard disk, e.g., 8GB, and continue
   e) Leave "Start virtual machine and install ..." checked, select "Use operating system installation disk image file", browse to the location of the iso you downoaded in step 1, and click "Finish"
1. VMWare will now boot CentOS off the install disk.  Follow this guide ( http://www.msamir.net/install-centos-5-server-setup-cd1-and-text-mode/ ) regarding the configuration details of a bare-bones server installation.  Once the installation is complete, you'll be prompted to reboot and, ba-boom, you'll have a CentOS virtual machine running on your Mac.

possible next steps

- ssh into your vm using this tutorial: http://intranation.com/entries/2009/03/development-virtual-machines-os-x-using-vmware-and/
- install apache and php: http://articles.slicehost.com/2008/2/6/centos-installing-apache-and-php5 .  Note: if you can't browse to your vm, edit your iptable to allow traffic on port 80.  More info on this here: http://www.cyberciti.biz/faq/howto-rhel-linux-open-port-using-iptables/
