---
_edit_last: "5360656"
_oembed_0c61b327c5bbd8cb0aab20b2c7ace644: '{{unknown}}'
_oembed_d7d8f38063d41d0407ed130e0a15d51d: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-07-28T02:41:24+00:00"
guid: http://erikeldridge.wordpress.com/?p=366
parent_post_id: null
post_id: "366"
tags:
  - bayjax
  - yahoo
  - yui3
title: 'notes: Bayjax Meetup @ Yahoo! Sunnyvale (7/27): Satyen Desai on YUI3 architecture'
url: /2009/07/27/notes-bayjax-meetup-727-yahoo-sunnyvale-yui3/

---
\[caption id="" align="aligncenter" width="500" caption="Satyen Desai describing architecture of YUI3"\] [![Satyen Desai describing architecture of YUI3](http://farm3.static.flickr.com/2648/3765515795_48683a8194.jpg)](http://www.flickr.com/photos/erikeldridge/3765515795)\[/caption\]

satyen desai talking about YUI 3 arch concepts & lessons learned

\- mtivation

\-\- yui2 is mature, why change it?

\-\- lighter

\-\-\- allow fine-grained include control

\-\-\- rethink the way we use code: move away from traditional inheritance model towards js augmentation & mixins

\-\- make it easier

\-\-\- yui2 has four different widget api classes; yui3 has a single, standard api

\-\-\- make common actions easier

\-\-\-\- iteration

\-\-\-\- chaining

\-\- runtime performance, ie make it faster

\-\-\- yui2 has always used a good namespace

\-\-\- yui3 takes namespacing further by giving you instance-level control

-examples

\-\- self-populating

\-\-\- yui3 pulls down dependencies in an optimized way

\-\-\-\- no more file-order concerns

\-\- yui3 offers protection

\-\-\- each instance is sandboxed and pulls in its dependencies indeendant of other instances

\-\- self-populating

\-\-\- naturally creates anonymous function wrappers

\-\- code re-use

\-\-\- yui3 avoids the kitchen sink by breaking libs into sub-modules and allowing the developer to only load the submodules required

\- plugins and examples

\-\- in yui2, all instances of a class contain the kitchen sink

\-\- in yui3, we can use and extend at the sub-module-level

\- events

\-\- built from decoupled code

\-\- event facades wrap events in a consistent, normalized interface

\-\- facedes wrap custom events as well

\-\- on and after events are built into the event publisher

\-\- bubbling

\-\-\- yui3 affords more control over the event stack

\-\- detaching listeners

\- node facade

\-\- a single location for wrking w/ anything html related

\-\- enhances and normalizes

\-\- yui3 build utils into the facade as opposed to yui2's library-based orientation

\-\- extendable

\-\-\- we can attach plug-ins to a node, eg an io object

\-\- iterationa and batch operations are suported

\- core lang convneineces

\-\- isType methods

\- questions

\-\- cross domain?

\-\-\- managed via flash object

\-\- multiple versions?

\-\-\- the last version loaded is the current version available

\-\- what does yui3 do better than other libs?

\-\-\- yui3 excels in readability and maintainablility

\-\- can yui3 be used on top of yui2?

\-\-\- currently, you can use both on a page, but not necessarily build one on the other

\- this talk is available online

\[caption id="" align="aligncenter" width="500" caption="Satyen Desai describing YUI3 architecture"\] [![Satyen Desai describing YUI3 architecture](http://farm3.static.flickr.com/2648/3765515795_48683a8194.jpg)](http://www.flickr.com/photos/erikeldridge/3765515795)\[/caption\]

meetup: [http://www.meetup.com/BayJax/calendar/10852424/](http://www.meetup.com/BayJax/calendar/10852424/)

Satyen Desai talking about YUI 3 arch concepts & lessons learned

\- motivation

\-\- yui2 is mature, why change it?

\-\- lighter

\-\-\- allow fine-grained include control

\-\-\- rethink the way we use code: move away from traditional inheritance model towards js augmentation & mixins

\-\- make it easier

\-\-\- yui2 has four different widget api classes; yui3 has a single, standard api

\-\-\- make common actions easier

\-\-\-\- iteration

\-\-\-\- chaining

\-\- runtime performance, ie make it faster

\-\-\- yui2 has always used a good namespace

\-\-\- yui3 takes namespacing further by giving you instance-level control

-examples

\-\- self-populating

\-\-\- yui3 pulls down dependencies in an optimized way

\-\-\-\- no more file-order concerns

\-\- yui3 offers protection

\-\-\- each instance is sandboxed and pulls in its dependencies indeendant of other instances

\-\- self-populating

\-\-\- naturally creates anonymous function wrappers

\-\- code re-use

\-\-\- yui3 avoids the kitchen sink by breaking libs into sub-modules and allowing the developer to only load the submodules required

\- plugins and examples

\-\- in yui2, all instances of a class contain the kitchen sink

\-\- in yui3, we can use and extend at the sub-module-level

\- events

\-\- built from decoupled code

\-\- event facades wrap events in a consistent, normalized interface

\-\- facedes wrap custom events as well

\-\- on and after events are built into the event publisher

\-\- bubbling

\-\-\- yui3 affords more control over the event stack

\-\- detaching listeners

\- node facade

\-\- a single location for wrking w/ anything html related

\-\- enhances and normalizes

\-\- yui3 build utils into the facade as opposed to yui2's library-based orientation

\-\- extendable

\-\-\- we can attach plug-ins to a node, eg an io object

\-\- iterationa and batch operations are suported

\- core lang convneineces

\-\- isType methods

\- questions

\-\- cross domain?

\-\-\- managed via flash object

\-\- multiple versions?

\-\-\- the last version loaded is the current version available

\-\- what does yui3 do better than other libs?

\-\-\- yui3 excels in readability and maintainablility

\-\- can yui3 be used on top of yui2?

\-\-\- currently, you can use both on a page, but not necessarily build one on the other

\- this talk is available online: [http://developer.yahoo.com/yui/theater/](http://developer.yahoo.com/yui/theater/)
