---
_edit_last: "5360656"
_oembed_4f7847ae87e336b9b3e58680e7a42a73: '{{unknown}}'
_oembed_49ca0877f9bf22b639b20a2aea36aed3: '{{unknown}}'
_oembed_4602cd445e8a9baa50fb346ee5f6350a: '{{unknown}}'
_oembed_22270b5dc50b532e06f7af0d1ff16870: '{{unknown}}'
_oembed_fdc9a12276717d81fd10dbe3b3439577: '{{unknown}}'
_wp_old_slug: ""
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-10-07T05:35:37+00:00"
guid: http://erikeldridge.wordpress.com/?p=842
parent_post_id: null
post_id: "842"
tags:
  - appengine
  - eclipse
  - gae
  - google
  - java
title: Getting started with Google Eclipse plugin
url: /2010/10/06/getting-started-with-google-eclipse-plugin/

---
This post is a record of my first experience with Google's [plugin](http://code.google.com/appengine/docs/java/tools/eclipse.html) for Eclipse Helios (3.6)

First impression: anyone who can get Eclipse to install a plugin without multiple errors deserves commendation. Good job, Google.

Doh! Spoke too soon. After running step 5 in the _[Creating a Project](http://code.google.com/appengine/docs/java/tools/eclipse.html#Creating_a_Project)_ section of the plugin documentation I got "The project cannot be built until build path errors are resolved ... Unknown Java Problem"

Sigh. Ok. [Searching Stack Overflow ...](http://stackoverflow.com/search?q=eclipse+build+path) OMG. I can't believe Eclipse has been around as long as it has and it's still simply un-runnable. Maybe it's a Java thing. Searching ... "Build path entry is missing: org.eclipse.jdt.launching.JRE\_CONTAINER" ... Wow. A couple hours later and no luck.

Back to Ruby for a little pick-me-up :)

**update (Oct. 15)**

A friend with more experience helped me sort this out:

1. Find your JDK.  On Mac, 10.6 it's in _/System/Library/Frameworks/JavaVM.framework_
1. In Eclipse menu bar, go to Eclipse > Preferences... > Java > Installed JREs
1. Click "Add..."
1. Either click "Directory..." and browse to the location of the JDK from step 1, or just enter the path if you know it.  In my case, it was
   _/System/Library/Frameworks/JavaVM.framework/Versions/1.6.0/Home/_
1. Give it a name.  Mine is "JDK 6"
1. Click _OK_ to save

Before trying again with the Google Eclipse plugin, I ran the software update ( _Help > Check for Updates_) and restarted, for good luck.
