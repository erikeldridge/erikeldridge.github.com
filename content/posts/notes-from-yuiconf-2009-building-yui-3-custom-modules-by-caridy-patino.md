---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-10-29T18:21:44+00:00"
guid: http://erikeldridge.wordpress.com/?p=459
parent_post_id: null
post_id: "459"
tags:
  - caridy
  - yahoo
  - yui
  - yuiconf2009
title: 'notes from YUIConf 2009: "Building YUI 3 Custom Modules", by Caridy Patino'
url: /2009/10/29/notes-from-yuiconf-2009-building-yui-3-custom-modules-by-caridy-patino/

---
what is a module in yui 3?
\- modules are not plugins, but there is a plugin module
\- module names are passed into a sandbox w/ the 'use' method
\- prefer YUI().use instead of var Y = new YUI(); Y.use ...
\- you can have multiple use() calls to defer loading
\- community modules vs basic yui core team modules

custom modules
\- registration
\-\- by seed YUI().use
\-\-\- seed will import
\-\- by inclusion
\-\-\- manually add script include and then YUI.use
\-\- YUI(config)
\-\-\- most performant
\-\-\- this takes advantage of onload handling
\-\-\- reduces number of http requests req'd in 'by inclusion'
\-\-\- organization
\-\-\-\- use YUI\_config global var to manage registration
\-\-\-\- you can have multiple config options

building custom modules
\- YUI.add('foo', fn(Y){mod code}, version, requirement list);
\- naming convention: utilities are all lowercase, classes are camelcase w/ uppercase leading char
\- plugins extend host modules
\- stack: utilities --> classes --> plugins --> mashups

how to use and build plugins
\- plugins allow us to extend an existing class at runtime
\- the def of a plugin looks much like that for a module class
\- instead of extending y.base, we extend y.plugin.base

mashups and legacy code
\- using multiple modules, including external dependencies, enhancing dom, defining event listeners
\- use case: using a pre-existing yui2-based object in yui3
\- check out zakas' talkon scalable app arch
\- cool: organize app as module repo
\- conclusions
\-\- define apps at a granular level
\-\- modular apps are easier to test
\-\- share code thru yui3 gallery
\-\- use yui custom modules to integrate pre-existing code

q/a
\- differences btwn yui2 and yui3 lazy loading?
\-\- yui3 will load everything as a single item, if module requirements are defined using config option
\-\- yui3 will load items in the order they are specified
\- reusing modules across multiple sandbox
\-\- yes, if defined as such in config

github/caridy
twitter/caridy
caridy.name
