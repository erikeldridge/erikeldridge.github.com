---
_edit_last: "5360656"
_oembed_7d38a355f7ac2368ab43cd410a3f496d: '{{unknown}}'
_oembed_9fd336487cd1b89223ed6b73da151acb: '{{unknown}}'
_oembed_629daeacb6bc29d8092681a489a629f9: '{{unknown}}'
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2011-06-01T04:19:21+00:00"
guid: http://erikeldridge.wordpress.com/?p=1213
parent_post_id: null
post_id: "1213"
tags:
  - ajax
  - github
  - history-api
  - html5
  - kneath
  - notes
title: Notes from Kyle Neath's presentation at Twitter on 5/31
url: /2011/05/31/notes-from-kyle-neaths-presentation-at-twitter-on-531/

---
- Slides [http://warpspire.com/talks/responsive/](http://warpspire.com/talks/responsive/ "presentation slides on Kyle Neath's blog")
- hashbang urls
  - are a kludgy workaround for lack of history api. Since history api is coming, they have no future. Since urls are forever, especially w/ tweets being stored in the lib of congress, use of hashbangs results in permanent support for a temporary condition.
  - break pre-existing url fragment behavior
  - result in confusing routing logic
- “responsive web design” is adapting to client _and_ seeming responsive to user input

  - page load isn’t just a benchmark; a page is only “loaded” when the user can scroll, read text, and click links
- well-designed urls provide a command-line-like interface for web apps
- all web assets should have a url, i.e., navigation should not allow access to a resource that cannot then be accessed directly via a url
  - anti-pattern: infinite scroll that forces the user to scroll through pages of content every time the page refreshes
  - see [http://warpspire.com/experiments/history-api/](http://warpspire.com/experiments/history-api/ "Neath's example of infinite scroll with useful url") for example of infinite scroll w/ useful url
- native elements should behave as the user expects
  - do not modify common key combos, e.g., shift + click
  - take advantage of the back button, tabs, links, etc
- responsiveness is as much about performance as perception
  - wait ~500ms before showing loader image; showing loaders immediately can actually make the page seem slower
- ssl
  - is required now that there are common, easy ways to sniff credentials
  - a new ssl handshake is very slow, and required for each domain
  - use http keep-alive to reuse ssl connections
  - multiple parallel requests to a new domain will each have to perform a handshake; instead, complete one fast request, and then reuse the connection for subsequent parallel requests
  - github optimized its backend to 40ms latency before realizing that the ssl handshake takes 500ms
    - a case of perception > performance
    - favor science over theory, i.e., test time-to-usable in multiple regions instead of just running perf tests on components
  - templates
  - use something simple, e.g., mustache
  - avoid rendering on client _and_ server; pick one
  - kneath prefers server-side
  - for server-side rendering, passing html back as one value in a json object allows for passing data back in other keys
- html 5 history api
  - allows for partial page updates w/ real urls
  - history.js provides conditional history api support w/ fallback to hashbang [http://plugins.jquery.com/project/history-js](http://plugins.jquery.com/project/history-js "jQuery history.js plugin")
  - fall back to full reloads
- allows for much richer state management. See github’s new issues dashboard
