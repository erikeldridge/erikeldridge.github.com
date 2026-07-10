---
_edit_last: "5360656"
_oembed_0ddb25b0220e1310eb3c9036b945c250: '{{unknown}}'
_oembed_2aa37ad1f80a4c8001086dfc3df4f9c3: '{{unknown}}'
_oembed_3ffa9f552f57c7ca4a37e7933428abb8: '{{unknown}}'
_oembed_5e726248bb62caad231baf9850e0529c: '{{unknown}}'
_oembed_05f4c105a2af349c188d8328214c5e38: '{{unknown}}'
_oembed_66c07161d1872ae99cab621a10460ec6: '{{unknown}}'
_oembed_253617ef44a4204ebf6e27100576169d: '{{unknown}}'
_oembed_a7df453305af5c5b6ea9d24395a442a0: '{{unknown}}'
_oembed_a54b2f066015fd9154f866e5da63374d: '{{unknown}}'
_oembed_a70b61d9ca21cd4cb86f4e60a2426bb0: '{{unknown}}'
_oembed_a266f043e8df6adbf2270d4e69a43b75: '{{unknown}}'
_oembed_cbd0430a5b0dc083f215b8c4b7af2d77: '{{unknown}}'
_oembed_ccaa18983e8544780fcba4706264261f: '{{unknown}}'
_oembed_da7580b9f22fddd1eac705f17a17a171: '{{unknown}}'
_oembed_e32d770edefd04c75982db6f6e9ef8e7: '{{unknown}}'
_oembed_ec16dc187553632dfebc111931912f19: '{{unknown}}'
_oembed_ec70204d07bba36b588d72363eba8d60: '{{unknown}}'
_oembed_f78848afa5754b60d54bb33b2f3337a2: '{{unknown}}'
_oembed_f646178bc09e2a31b30c377c1c38e0cf: '{{unknown}}'
_oembed_f27258895b94e3cbba72a8e802c1d103: '{{unknown}}'
_wp_old_slug: installing-lamp-on-a-centos-52-vmware-image
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-06T05:48:47+00:00"
guid: http://erikeldridge.wordpress.com/?p=249
parent_post_id: null
post_id: "249"
tags:
  - apache
  - centos
  - mysql
  - php
  - vmware
title: installing Apache MySQL PHP on a CentOS 5.2 VMWare image
url: /2009/05/05/installing-amp-on-a-centos-52-vmware-image/

---
install apache and php

- ref: http://articles.slicehost.com/2008/2/6/centos-installing-apache-and-php5
- install apache w/ ssl support:
  sudo yum install httpd mod\_ssl
- launch apache:
  sudo /etc/init.d/httpd start
- browse to your vm's address (run ifconfig in the vm if you don't know the address)
- if your browser can't find the address, write an iptable rule to allow access to port 80:
  - ref: http://www.cyberciti.biz/faq/howto-rhel-linux-open-port-using-iptables/
  - open the iptable definition file:
    vi /etc/sysconfig/iptables
  - plug in the new rule:
    -A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
  - note: the leading '-' in the rule is intentional
  - restart the iptables process:
    /etc/init.d/iptables restart
- install php:
  sudo yum install php-common php-gd php-mcrypt php-pear php-pecl-memcache php-mhash php-mysql php-xml
- reload apache:
  sudo /etc/init.d/httpd reload

set up mysql

- ref: http://articles.slicehost.com/2009/4/7/centos-installing-mysql-with-rails-and-php-options
- as per the article above, install mysql:
  sudo yum install mysql-server mysql mysql-devel
- launch the mysql daemon:
  sudo /etc/init.d/mysqld start
- set a root user/password:
  /usr/bin/mysqladmin -u root password 'new-password'
- confirm new account was set up correctly:
  mysql -uroot -ppassword
- then quit out of mysql:
  mysql> quit;

upgrade beyond stock centos support so we can get php version > 5.2.2, which is required for phpmyadmin

- ref: http://www.jasonlitka.com/yum-repository/
- import his GPG key:
  rpm --import http://www.jasonlitka.com/media/RPM-GPG-KEY-jlitka
- create a file called:
  /etc/yum.repos.d/utterramblings.rep
- paste the following into it:
  \[utterramblings\]
  name=Jason's Utter Ramblings Repo
  baseurl=http://www.jasonlitka.com/media/EL$releasever/$basearch/
  enabled=1
  gpgcheck=1
  gpgkey=http://www.jasonlitka.com/media/RPM-GPG-KEY-jlitka
- run yum update:
  yum update

install phpmyadmin

- ref: http://www.phpmyadmin.net/documentation/#quick\_install
- copy the distribution to your server from:
  http://sourceforge.net/project/showfiles.php?group\_id=23067&package\_id=16462
- un-zip and -tar the package, rename it to something more convenient, e.g., "phpmyadmin", and cd into it
- create a "config.inc.php" file by running:
  cp config.sample.inc.php config.inc.php
- define a random string for the "blowfish\_secret" variable in config.inc.php, e.g., 'weuriwuer9182309812iewuoriuwo'
- in the browser, navigate to yourdomain.com/phpmyadmin
- enter the mysql root username/password created above to log in

related post: [running a CentOS 5.2 server using VMWare on Mac OS X 10.5](/2009/05/03/running-a-centos-52-server-using-vmware-fusion-on-mac-os-x-105/)
