---
layout: post
title: performance toolkit
---

## Tools

* Mac OS X trafic shaping http://www.macgeekery.com/hacks/software/traffic_shaping_in_mac_os_x
* Web Page Test (recommended by SPDY developer) http://www.webpagetest.org/
* Boomerang http://yahoo.github.com/boomerang/doc/
* JavaScript performance playground: http://jsperf.com/
* YSlow

## YSlow for command line

1. Install yslow via npm as described on the YDN site: [http://developer.yahoo.com/yslow/commandline/](http://developer.yahoo.com/yslow/commandline/)
1. Load page to evaluate in a browser supporting .har export, e.g., chrome
1. Open developer tools panel and click network tab
1. Right-click on the network traffic and select "Save All as HAR" (or equivalent)
1. Run yslow on the file (assuming we're interested in example.com and saved the har file to the desktop): `yslow -i all --format plain ~/Desktop/example.com.har`