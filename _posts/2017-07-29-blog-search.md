---
title: "Blog search \U0001F50E"
date: 2018-08-26 18:35:44 -0700
tags:
- blog
- search
layout: post

---
## Problem statement

I'd like to provide a quick way to retrieve information from this blog.

In terms of constraints, this blog is statically generated and hosted on Github, which disallows arbitrary plugins, limiting many solutions to client-side and/or external vendors. I'd also prefer to keep things free.

## Solutions

### Tags

Jekyll supports [tags](https://jekyllrb.com/docs/variables/#page-variables), so I can start by simply [grouping content by tag](https://github.com/erikeldridge/erikeldridge.github.com/blob/08c14fabce69f58d2c7de8f3300b9484018d4311/tags.html).

Tags are specific, but the process of tagging content is tedious and error-prone, eg I don't want to tag extensively and I may forget to tag at all, and seems lossy, eg I may forget which tag I used later. I'd prefer to extract keywords and query them via search UX.

### Client-side search

[Lunr](https://lunrjs.com) provides a convenient JS library to perform keyword extraction and lookup, and supports pre-building the search index to improve client performance. One downside: because I'm limited to client-side solutions, and I prefer to use a service for maintaining content, my content and [search index](https://github.com/erikeldridge/erikeldridge.github.com/blob/master/src/build-search-index.js) can drift out of sync.

### Server-side search

I can also take advantage of [Google's search indexing](https://www.google.com/webmasters/tools/home?hl=en) by defining a [Jekyll sitemap](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/). I can get closer to inline filtering by using [Chrome's omnibox](https://www.chromium.org/tab-to-search). Here's the blog's [opensearch.xml](http://erikeldridge.com/opensearch.xml).
