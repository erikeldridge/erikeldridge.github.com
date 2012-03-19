---
layout: post
title: mobile web application development toolkit
---

* toc
{:toc}

## Feature detection

Use [Divining Rod](https://github.com/mdp/divining_rod) for feature detection in Ruby.

Use [Modernizr](http://www.modernizr.com/) for feature detection in JS.

## Performance

## HTML5 DB

From [Suggestions for better performance](http://googlecode.blogspot.com/2009/06/gmail-for-mobile-html5-series.html):

* version schemas and incrementally upgrade minor versions, rather than completely reinitialize the DB for each upgrade, to avoid expensive table creation/deletion costs.
* reduce and/or defer queries
* replace multiple, sequential update queries with triggers

## App cache

* Cache the login page, and perform authentication asyncronously rather than trying to launch an app and bouncing the user to log in if unauthenticated.
* List as few URLs as possible in the manifest to avoid expensive refreshes when the manifest version changes
* Including a version number in a comment in the manifest. Increment the version to force a cache refresh

## Dev environment

* Use [webkit nightly builds](http://nightly.webkit.org/) to take advantage of the latest dev tools

## Resources

* [Dive into HTML5](http://diveintohtml5.info/)
* [Webkit's blog](http://www.webkit.org/blog), esp:
  * [Discussion of CSS 3D transforms](http://www.webkit.org/blog/386/3d-transforms/)
  * [Discussion of client-side database storage](http://www.webkit.org/blog/126/webkit-does-html5-client-side-database-storage/)
* The Gmail for Mobile HTML5 Series:
  * [HTML5 and Webkit pave the way for mobile web applications](http://googlecode.blogspot.com/2009/04/html5-and-webkit-pave-way-for-mobile.html)
  * Using AppCache to Launch Offline, [part 1](http://googlecode.blogspot.com/2009/04/gmail-for-mobile-html5-series-using.html), [part 2](http://googlecode.blogspot.com/2009/05/gmail-for-mobile-html5-series-part-2.html), [part 3](http://googlecode.blogspot.com/2009/05/gmail-for-mobile-html5-series-part-3.html)
  * [A Common API for Web Storage](http://googlecode.blogspot.com/2009/05/gmail-for-mobile-html5-series-common.html)
  * [Suggestions for better performance](http://googlecode.blogspot.com/2009/06/gmail-for-mobile-html5-series.html)
  * [Cache pattern for offline HTML5 web application](http://googlecode.blogspot.com/2009/06/gmail-for-mobile-html5-series-cache.html)
