---
_edit_last: "5360656"
_oembed_0939dfbb16efbc4d1805203344bb8ce0: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-07-02T06:28:55+00:00"
guid: http://erikeldridge.wordpress.com/?p=360
parent_post_id: null
post_id: "360"
tags:
  - kestrel
  - robeypointer
  - scala
  - starling
  - twitter
title: genius!
url: /2009/07/01/genius/

---
"The concept of starling is to have a single server handle reliable, ordered message queues. When you put a cluster of these servers together, _with no cross communication_, and pick a server at random whenever you do a `set` or `get`, you end up with a reliable, _loosely ordered_ message queue.

"In many situations, loose ordering is sufficient. Dropping the requirement on cross communication makes it horizontally scale to infinity and beyond: no multicast, no clustering, no "elections", no coordination at all. No talking! Shhh"

Robey Pointer

[http://bit.ly/eCWOx](http://bit.ly/eCWOx)
