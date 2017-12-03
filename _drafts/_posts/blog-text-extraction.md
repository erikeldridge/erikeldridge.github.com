---
title: Design vocabulary automation
date: 2017-12-03 12:44:01 -0800
tags:
- blog
- nlp
- nlkt
- data-science
- academic-advisory
- sf-mb-tech-bridge
- jekyll
layout: post
---
## Problem

I want to build a "design vocabulary", to borrow Peter Korn's phrase from [_Why We Make Things and Why It Matters_](why-we-make-things-and-why-it-matters-by-peter-korn).

For each concept I reference repeatedly in this blog, I'd like:

1. a post describing the concept
2. a tag I can apply to posts referencing the concept
3. a light visual indicator for each reference to the concept in text

Readers, including me, should be able to filter blog content by concept, find the cannonical definition, and identify occurances while reading (with minimal disruption).

Managing this manually is tedious and error prone. I'd appreciate help from automation.

## Context

I'm new to NLP, so this post will include some basics.

I'm working with folks at CSUMB and in SF to bridge their tech communities, which often takes the form of data science using Python, so I bias in that direction. I can imagine finding a functional overlap with Jekyll plugins, so I may revisit this decision.

I'm developing on MacOS 10.12.

## Solution

Outline:

1. set up
2. build corpus
3. normalize text and extract concepts
4. normalize concepts and count occurances
5. rank concepts by count
6. identify concepts unassociated with cannonical definition
7. identify posts containing concepts without tags
8. markup occurrences in posts containing concepts

### Build corpus

My blog uses Jekyll, so all content is sourced from markdown under [_posts](https://github.com/erikeldridge/erikeldridge.github.com/tree/master/_posts). However, I need plain text, so I'll

1. Render the markdown to html using `jekyll build`
2. Scrape the html using Beautiful Soup, as described by the NLTK docs

    import glob
    from bs4 import BeautifulSoup
    
    def list_files(path):
      return glob.glob(path + "*.html")
    
    def read_file(path):
      with open(path) as f:
        return ''.join(f.readlines())
    
    def read_files(paths):
      return ''.join(map(read_file, paths))
    
    print(read_files(list_files('../_site/notes/')))

### Extract

I believe the technical term for what I'm trying to do is "extraction", eg "phrase extraction", from the field of Natural Language Processing (NLP).

The standard tool for NLP in Python is NLTK. Installing that was relatively straightforward, with a couple caveats:

* I wanted to use Python 3 per the [_Hitchhiker's Guide_](http://docs.python-guide.org/en/latest/starting/install3/osx/#doing-it-right)
* I wanted to use pipenv to encapsulate module dependencies, for which I found [this SO answer re installing pip and pipenv](https://stackoverflow.com/a/47144516/1971682) helpful

Eventually, per the [NLTK](http://www.nltk.org/install.html) and [pipenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/#using-installed-packages) docs, I could do this:

    $ pipenv run python3
    >>> import nltk
    >>>

asd