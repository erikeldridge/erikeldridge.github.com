---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "35690298036"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - organizational-tools
date: "2019-09-26T06:35:56+00:00"
guid: https://erikeldridge.wordpress.com/?p=1476
parent_post_id: null
post_id: "1476"
timeline_notification: "1569479761"
title: Entropy
url: /2019/09/25/entropy/

---
A colleague once relayed to me someone else's observation that every syntax variation allowed by a language will eventually appear in a code base. Resisting the process of breaking down into what's possible requires energy. The idea that "naming things is hard" seems a variation of this. If I could remember the originator, I'd call it \_\_\_'s Law. In the meantime, I think "entropy" is the general form.

> With its Greek prefix _en-_, meaning "within", and the _trop-_ root here meaning "change", _entropy_ basically means "change within (a closed system)"
>
> [Merriam-Webster dictionary](https://www.merriam-webster.com/dictionary/entropy)

In this context, static analysis tools like linters help limit what's possible.

An organizational approach I've seen a couple times is to embrace the range of possibility. For example, given a camp in favor of Java and another in favor of Scala, a former team avoided endless debate by supporting both until there was an obvious reason not to. Another example is Google Cloud's reconciliation of REST and gRPC:

> All our Cloud APIs expose a simple JSON REST interface that you can call directly or via our client libraries. Some of our latest generation of APIs also provide an RPC interface that lets clients make calls to the API using [gRPC](http://grpc.io/): many of our client libraries use this to provide even better performance when you use these APIs
>
> [Google Cloud API documentation](https://cloud.google.com/apis/docs/overview#multiple-surfaces-rest-and-grpc)

Another organizational strategy [David Poll](https://twitter.com/depoll) brilliantly described: products will express the org structure that created them ([Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law)); we can expend energy resisting this, eg review processes, and/or we can create orgs in the shape of the products we intend.
