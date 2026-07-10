---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2008-12-19T23:28:30+00:00"
guid: http://erikeldridge.wordpress.com/?p=170
parent_post_id: null
post_id: "170"
tags:
  - crockford
  - javascript
  - performance
title: notes from douglas crockford's 12/17/08 talk on js performance
url: /2008/12/19/notes-from-douglas-crockfords-121708-talk-on-js-performance/

---
Note: all credit for this material goes to [Douglas Crockford](http://www.crockford.com/), though nothing noted here is a direct quote.

- don't optimize w/out measuring
- don't optimize something that isn't performed > once
- optimize when we cross line of slow and/or failing performance
  - slow apps cause irritation
  - failing apps cause desertion
- O(n^2) lines do not reflect optimizations dramatically
  - general rule: make n small
- use ajax for jit data delivery
- dyn el generation is faster than data fetch, so cache data, not markup
- we can't know what will take time before we start working, so test constantly to get preview of performance issues
- Best practice for pagination?  Request data in chunks, ie let server handle pagination
- how to speed up graphics rendering?  We're unlikely to get performance boost for in JS layer, so look to browser-level support
- can we speed up rendering & layout?
  - simplify css & html, but otherwise no.
  - we currently lack performance tools for measuring dom manipulation performance metrics
  - favor better ajax design over js optimization
  - reduce browser rendering by leveraging ajax interactivity, ie jit/on-demand page construction
