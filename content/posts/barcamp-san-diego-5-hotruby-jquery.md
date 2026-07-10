---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-31T23:00:40+00:00"
guid: http://erikeldridge.wordpress.com/?p=310
parent_post_id: null
post_id: "310"
tags:
  - barcamp
  - barcampsd
  - barcampsd5
  - bcsd5
  - hotruby
  - jquery
  - strd6
title: 'barcamp san diego 5: "hotruby + jquery"'
url: /2009/05/31/barcamp-san-diego-5-hotruby-jquery/

---
\- how to use ruby in the browser w/ using jquery
\- history of js
\-\- created by brendan eich in 1994
\-\- based on scheme and lisp
\-\- netscape got partnership w/ sun, so the language had to look like java
\-\- IE duplicates it
\-\- netscape tries to standardize it
\-\- prototype -> implemented -> deployed -> standardized very quickly

\- js is not dead yet
\-\- most common platform (now on server w/ rhino)
\-\- the most common programming lang
\-\- the lang of the internet
\-\- most problems aren't so bad

\- hotruby
\-\- may be more performant than interpreted ruby
\-\- write in ruby, compile it, and exec it in js vm
\-\- not much changed after 2007
\-\- original hotruby on github
\-\- takes ruby bytecode as an input and runs it via js in the browser(!)
\-\- now plugin req'd

\- speaker's work
\-\- speaker has been updating it to ruby 1.9.1
\-\- app.srtd6.com/compile
\-\-\- run this and look at response in firebug to see ruby bytecode
\-\- sends text boxt content to server, compiles it to ruby bytecode, sends it back, and runs it using hotruby interpreter
\-\- will run in all browsers
\-\- look for "hotruby" in [github.com/strd6/](http://github.com/STRd6/hotruby/tree/master "github.com/stdr6")
