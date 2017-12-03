---
title: Design vocabulary automation
date: 2017-12-03 00:00:00 +0000
tags:
- blog
- nlp
- nlkt
- data-science
- academic-advisory
layout: post
---
## Problem

I want to build a "design vocabulary", to borrow Peter Korn's phrase from [_Why We Make Things and Why It Matters_](why-we-make-things-and-why-it-matters-by-peter-korn).

For each concept I reference repeatedly in this blog, I'd like:
1. a post describing the concept
1. a tag I can apply to posts referencing the concept
1. a visual indicator for each reference to the concept in text

Readers, including me, should be able to filter blog content by concept, find the cannonical definition, and identify occurances while reading (with minimal disruption).

Managing this manually is tedious and error prone. I'd appreciate help from automation.

## Context

I'm new to NLP, so this post will include some basics.

I'd like to get more experience with data science, and in a way that's congruent with CSUMB's data science concentration, and reinforce my Python experience per my academic advisory, so I'll bias toward Python tooling. I can imagine finding a functional overlap with Jekyll plugins, so I may revisit this decision.

## Solution

Outline:
1. build corpus
1. normalize text and extract concepts
1. normalize concepts and count occurances
1. rank concepts by count
1. identify concepts unassociated with cannonical definition
1. identify posts containing concepts without tags
1. markup occurances in posts containing concepts

