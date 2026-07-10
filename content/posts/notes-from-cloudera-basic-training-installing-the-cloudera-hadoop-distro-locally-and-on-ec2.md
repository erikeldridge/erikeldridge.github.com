---
_edit_last: "5360656"
_oembed_3f198bbbd5703b87876e1a85faea54ad: '{{unknown}}'
_oembed_4d1d789e371a77d7f481590c70cc090f: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-06-11T23:38:17+00:00"
guid: http://erikeldridge.wordpress.com/?p=354
parent_post_id: null
post_id: "354"
tags:
  - cloudera
  - hadoop
title: notes from cloudera basic training &gt; installing the cloudera hadoop distro locally and on ec2
url: /2009/06/11/notes-from-cloudera-basic-training-installing-the-cloudera-hadoop-distro-locally-and-on-ec2/

---
ref: [http://www.cloudera.com/hadoop](http://www.cloudera.com/hadoop)
installing cloudera distro on a cluster
\- motivation: hadoop is complocated to install
\- cloudera uses Alternatives to manage a\|b testing
\- cloudera has created a "configurator" that will generate an rpm customized to your cluster
\-\- generates the configuration files and a custom installer. Each can optionally be used together or separately
\- alternatively, you can install an unconfigured distro
\- for large scale deployment, use puppet, bcfg2, cfengine, etc. to manage the cluster
\-\- cloudera's tool can still be used to generate config scripts
\- storing data in ebs takes advantage of locality and is much faster than s3
\-\- ebs is more performant than normal hard drives
