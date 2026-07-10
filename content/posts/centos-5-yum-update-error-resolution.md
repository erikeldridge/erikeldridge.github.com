---
author: erikeldridge
categories:
  - technical-tools
date: "2009-12-24T02:36:28+00:00"
guid: http://erikeldridge.wordpress.com/2009/12/23/centos-5-yum-update-error-resolution/
image_size: ""
parent_post_id: null
post_id: "483"
title: centos 5 yum update error &amp; resolution
url: /2009/12/23/centos-5-yum-update-error-resolution/

---
I just tried to update my centos 5 install via yum and got the following error messages:

```
filelists.sqlite.bz2                                                                                                                                                                 | 1.5 MB     00:01
http://centos.eecs.wsu.edu/5.4/updates/i386/repodata/filelists.sqlite.bz2: [Errno -1] Metadata file does not match checksum
Trying other mirror.
filelists.sqlite.bz2                                                                                                                                                                 | 1.1 MB     00:00
http://mirror.facebook.net/centos/5.4/updates/i386/repodata/filelists.sqlite.bz2: [Errno -1] Metadata file does not match checksum
Trying other mirror.
....

```

I searched on line for “yum update Metadata file does not match checksum” and found [a helpful blog post](http://www.electrictoolbox.com/yum-error-metadata-file-does-not-match-checksum/). Following the post suggestion, I ran `yum clean all`, which seems to have fixed the problem.
