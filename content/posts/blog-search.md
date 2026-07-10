---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "35077827423"
_wp_old_date: "2019-09-08"
author: erikeldridge
categories:
  - technical-tools
date: "2017-07-29T20:54:08+00:00"
guid: https://erikeldridge.wordpress.com/?p=1254
parent_post_id: null
post_id: "1254"
tags:
  - jekyll
  - liquid
  - lunr
  - search
timeline_notification: "1567976052"
title: Blog search
url: /2017/07/29/blog-search/

---
## Problem statement

I'd like to provide a quick way to retrieve information from this blog.

In terms of constraints, this blog is statically generated and hosted on Github, which disallows arbitrary plugins, limiting many solutions to client-side and/or external vendors. I'd also prefer to keep things free.

## Solutions

### Tags

Jekyll supports [tags](https://jekyllrb.com/docs/variables/#page-variables), and the Forestry CMS I use enables me to manage tags alongside content, so I can start by including tags in my index of notes.

### Client-side search

Ideally, I could provide inline keyword search.

Search providers understandably require UI control.

[Lunr](https://lunrjs.com/) provides a convenient JS library to perform keyword extraction and lookup, and supports pre-building the search index to improve client performance. However, the index for my content was 500kb and the search syntax, although powerful, was unintuitive for my simple needs.

Google's published the [most common English words](https://github.com/first20hours/google-10000-english). I could strip these from my content and then include the remainder in my index, eg:

```
{% raw %}
  {% unless site.data.stop_words contains word %}
    {{word}}
  {% endunless %}
{% endraw %}

```

This still yields more words than wieldy for displaying in an index. I'm also limited to Liquid syntax for index generation, which complicates things like excluding code snippets.

So far, the best solution has been constructing a regex from an input string, applying it to the titles and tags of my index and then hiding entries that don't match.

### Server-side search

I can take advantage of [Google's search indexing](https://www.google.com/webmasters/tools/home?hl=en) by defining a [Jekyll sitemap](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/). I can get closer to inline filtering by using [Chrome's omnibox](https://www.chromium.org/tab-to-search). Here's the (old, Github-based) blog's [opensearch.xml](http://erikeldridge.com/opensearch.xml).

### Integrated search

I'm using the phrase "integrated" to refer to search feature within a larger product. For example, Wordpress offers full-text search as a feature. I took this path as of 2020-ish, to free up time for focusing on non-search topics.
