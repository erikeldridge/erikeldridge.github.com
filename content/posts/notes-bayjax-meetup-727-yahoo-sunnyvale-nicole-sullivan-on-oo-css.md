---
_edit_last: "5360656"
_oembed_4119101eaaa2531548d381428e5cba30: '{{unknown}}'
_oembed_d7d8f38063d41d0407ed130e0a15d51d: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-07-28T03:14:53+00:00"
guid: http://erikeldridge.wordpress.com/?p=369
parent_post_id: null
post_id: "369"
tags:
  - bayjax
  - css
  - nicolesullivan
  - objectorientedcss
  - yahoo
title: 'notes: Bayjax Meetup @ Yahoo! Sunnyvale (7/27): Nicole Sullivan on OO CSS'
url: /2009/07/27/notes-bayjax-meetup-727-yahoo-sunnyvale-nicole-sullivan-on-oo-css/

---
\[caption id="" align="aligncenter" width="500" caption="Nicole Sullivan talking about Object Oriented CSS"\] [![Nicole Sullivan talking about Object Oriented CSS](http://farm4.static.flickr.com/3568/3766311086_dff61a329a.jpg)](http://www.flickr.com/photos/erikeldridge/3766311086/in/photostream/)\[/caption\]

meetup: [http://www.meetup.com/BayJax/calendar/10852424/](http://www.meetup.com/BayJax/calendar/10852424/)

nicole sullivan (@stubbornella) on object-oriented css

\- slides are on slideshare/stubbornella

\- how we are doing css wrong:

\-\- we require expert-level developers to be effective

\-\- filesize is growing out of control

\-\- code re-use is almost nonexistant

\-\- code is too fragile

\- most important mistake: we write overly clever modules; everything is a one-off

\-\- so size increases best-case at a 1-1 rate

\- so what is oocss?

\-\- stubbornella did write an open-source framework

\-\- oocss lives to the left of the curly braces

\- pieces: selctors

\-\- the size of the css file is one of the largest factors in css performance; focus on http requests

\-\- reflows and rendering is not that important

\-\- duplication is worse than stale rules

\-\- define default values; don't repeat defaults

\-\- define structure in a separate class

\-\- style classes rather than elements; define styles to be dom-independant

\-\- avoid styling elements; define styles in classes

\-\- give all our rules the same strength; make every rule to have the same speceficity

\-\- use hacks sparingly

\-\-\- we should only need hacks for ie 5.5, 6, and maybe 7; nothing else requires it

\-\-\- use underscore and star instead of js to apply browser hacks

\-\- avoid specifying location, eg use .sidenave instead of .nav ul

\-\- avoid overly-specific classes

\-\- avoid singeltons, ie aoid using ids

\-\-\- ids kill re-use

\-\- use mixins

\-\- use encapsulation

\-\-\- if an object can live on its own, use wrapper classes.  Otherwise, avoid cascading

\- heading

\-\- componenets are like reusable legos

\-\- \> reusing elements makes them performance freebees <

\-\- avoid duplication

\-\- avoid nearly identical modules

\-\-\- rule: if two modules are two similar to include next to each other, they're too close for the same site

\-\- avoid location-depemdent styles

\-\-\- "HEADING" shouldn't become "heading" on another part of the page

\-\-\- define global defaults

\-\-\- apply styles to classes instead of elements

\-\-\-\- respects semantics while allowing visual flexibility

\-\- do we really need more than 6 headings?

\- module

\- grid

\- questiojns

\-\- if the html is broken, nice css wont work, right?

\-\-\- yes.  a css obj is composed of html and css

\-\- any research into compilation?

\-\-\- the w3c should implement "extends" and "inherits" instead of us using compilation
