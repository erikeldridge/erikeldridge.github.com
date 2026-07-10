---
_edit_last: "5360656"
_oembed_42decea565dec75d79990f918edb4dc2: '{{unknown}}'
_oembed_49eaefda7181ad048de5ac16b6a3d4a9: '{{unknown}}'
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2011-06-25T19:43:39+00:00"
guid: http://erikeldridge.wordpress.com/?p=1234
parent_post_id: null
post_id: "1234"
tags:
  - alan-leung
  - closure
  - closure-compiler
  - compiler
  - notes
title: Notes from "Web Application Development with Closure Compiler" talk by Alan Leung on 6/22/11
url: /2011/06/25/notes-from-web-application-development-with-closure-compiler-talk-by-alan-leung-on-62211/

---
Alan visited Twitter on 6/22 and presented an introductory talk on [Google's Closure compiler](http://code.google.com/closure/compiler/ "Google Closure compiler documentation") for JavaScript. Alan is tech lead on Closure team.

Here are the slides:
[http://acleung.com/twitter\_talk.pdf](http://acleung.com/twitter_talk.pdf "\"Web Application Development with Closure Compiler\" slide deck")

Notes

\\* JavaScript was originally designed for small DOM operations. Now that we're building large-scale apps in JS, we can use some help.
\\* Google uses Closure for all but a couple products
\\* The Closure compiler can perform ~55 optimization passes, including linting code, validating function definitions, performing gzip-optimized compression, trimming dead branches
\\* Closure can also provide compile-time constants, e.g., "if(INTERNAL){...", and trim unused branches that result
\\* Closure uses a graph coloring heuristic for variable renaming
