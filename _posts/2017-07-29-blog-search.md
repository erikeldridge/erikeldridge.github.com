---
title: Blog search
date: 2017-07-29 00:00:00 Z
tags:
- blog
- search
layout: post
---

## Context

I'd like to provide a quick way to retrieve information from this blog.

In terms of constraints, this blog is statically generated and hosted on Github, which disallows arbitrary plugins, limiting many solutions to client-side and/or external vendors. I'd also prefer to keep things free.

## Approach

Jekyll supports [tags](https://jekyllrb.com/docs/variables/#page-variables), so I can start by simply [grouping content by tag](https://github.com/erikeldridge/erikeldridge.github.com/blob/08c14fabce69f58d2c7de8f3300b9484018d4311/tags.html).

Tags are specific, but the process of tagging content is tedious and error-prone, eg I don't want to tag extensively and I may forget to tag at all, and seems lossy, eg I may forget which tag I used later. I'd prefer to extract keywords and query them via search UX.

I see a [Lunr-based search util](https://github.com/slashdotdash/jekyll-lunr-js-search) using a client-side index of all content, but this seems heavy.

Something like [RAKE](https://github.com/nok/rake-text-ruby) seems appropriate for reducing content down to keywords, which I could then pass to Lunr, but parsing markdown for extraction and tuning the extractor leads me to think I should really be using NLP, eg [Google cloud NLP](https://cloud.google.com/natural-language/), which is amazing but costly.

A simple place to start is [Google custom search](https://cse.google.com) with a [Jekyll sitemap](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/). This gives me access to Google's NLP via conventional site search, but takes me out of my site's UX.

## Results 

Now that Google's aware of this content, I can get closer to inline filtering by using [Chrome's omnibox](https://www.chromium.org/tab-to-search). Here's the blog's [opensearch.xml](http://erikeldridge.com/opensearch.xml). I use the omnibox whenever possible, so this might end up being ideal UX. 

I can also try a middle-ground approach that provides inline filtering based on a simple test of title and tags. All things considered, this may actually be a pretty good solution.

