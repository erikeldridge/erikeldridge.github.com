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

## Solution

Outline:

1. build corpus
2. normalize text and extract concepts
3. normalize concepts and count occurances
4. rank concepts by count
5. identify concepts unassociated with cannonical definition
6. identify posts containing concepts without tags
7. markup occurrences in posts containing concepts