---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "50043233295"
_rest_api_client_id: "2697"
_rest_api_published: "1"
author: erikeldridge
categories:
  - organizational-tools
date: "2020-10-18T00:21:41+00:00"
guid: http://blog.erikeldridge.com/2020/10/17/bias-server/
parent_post_id: null
post_id: "1798"
timeline_notification: "1602980520"
title: Bias to the server-side
url: /2020/10/17/bias-server/

---
## Problem statement

I was recently working on a support issue, which had client- and server-side aspects. Complicating the issue, we only had partial visibility into server-side health and no visilibity into client-side health. It was hard to even tell where to start investigating. We were also working closely with a partner, who could give us some visilbility, but with high coordination cost.

One approach was to create client visiblity for us and the partner, but this would take time to roll out, didn't immediately reduce the coordination cost and risked fatiguing the partner.

An alternative approach was to increase the server-side visiblity. We took this approach because we could start investigating immediately (no coordination cost or roll out latency). We might even be able to resolve the issue without requiring the partner to do any work. Also, having more visibility and confidence in the server-side would help if/when we do need to make client-side changes.

## Solution

So, my takeaway is simple: when faced with a choice between server- and client-side options, bias toward server-side.

From a product perspective, any work required of customers is friction to adoption. From a technical perspective, it's much easier to change servers than clients.
