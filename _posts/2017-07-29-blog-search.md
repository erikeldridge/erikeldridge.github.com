---
title: "Blog search \U0001F50E"
date: 2018-09-02 23:43:11 -0700
tags:
- blog
- search
- liquid
- jekyll
- lunr
layout: post

---
## Problem statement

I'd like to provide a quick way to retrieve information from this blog.

In terms of constraints, this blog is statically generated and hosted on Github, which disallows arbitrary plugins, limiting many solutions to client-side and/or external vendors. I'd also prefer to keep things free.

## Solutions

### Tags

Jekyll supports [tags](https://jekyllrb.com/docs/variables/#page-variables), and the Forestry CMS I use enables me to manage tags alongside content, so I can start by including tags in my index of notes.

### Client-side search

Ideally, I could provide inline keyword search.

Search providers understandably require UI control.

[Lunr](https://lunrjs.com) provides a convenient JS library to perform keyword extraction and lookup, and supports pre-building the search index to improve client performance. However, the index for my content was 500kb and the search syntax, although powerful, was unintuitive for my simple needs.

Google's published the [most common English words](https://github.com/first20hours/google-10000-english). I could strip these from my content and then include the remainder in my index, eg:

    {% unless site.data.stop_words contains word %}
      {{word}}
    {% endunless %}

This still yields many words, however, which is unwieldy for displaying in an index. I'm also limited to Liquid syntax for index generation, which complicates things like exluding code snippets.

So far, the best solution has been constructing a regex from an input string, applying it to the titles and tags of my index and then hiding entries that don't match.

### Server-side search

I can also take advantage of [Google's search indexing](https://www.google.com/webmasters/tools/home?hl=en) by defining a [Jekyll sitemap](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/). I can get closer to inline filtering by using [Chrome's omnibox](https://www.chromium.org/tab-to-search). Here's the blog's [opensearch.xml](http://erikeldridge.com/opensearch.xml).