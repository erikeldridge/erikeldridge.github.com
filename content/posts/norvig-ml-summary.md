---
_publicize_job_id: "51605168440"
_rest_api_client_id: "2697"
_rest_api_published: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-29T02:32:56+00:00"
guid: http://blog.erikeldridge.com/?p=2217
parent_post_id: null
post_id: "2217"
tags:
  - google-ml-crash-course
  - koan
  - machine-learning
timeline_notification: "1606617205"
title: Norvig's summary of ML for software engineers
url: /2020/11/28/norvig-ml-summary/

---
Peter Norvig summarized the value of ML from a software engineering perspective in his ["Introduction to Machine Learning"](https://developers.google.com/machine-learning/crash-course/ml-intro) for Google's Machine Learning Crash Course:

> First, it gives you a tool to reduce the time you spend programming ... Second, it will allow you to customize your products, making them better for specific groups of people ... And third, machine learning lets you solve problems that you, as a programmer, have no idea how to do by hand.

From my perspective, the first two can be rephrased as:

1. Models add a new dimension to code reuse
1. For a class of problems, training models scales better than hand-writing code

There's also a fourth point linked from the bottom of the intro:

> Rule #1: Don’t be afraid to launch a product without machine learning

That fourth point reminds me of the "build" vs "grow" domains - until we've built a product that lots of people find useful, statistics-based growth tools, like large-scale AB testing, can be relatively high-cost, low-value.We might even say such optimizations only make sense once we have more users than can be efficiently contacted directly. Put another way, if we only have one user, and she says she only wants to see articles about sports, we don't need ML to predict her interests.

I think about these four points a lot, almost like a koan. They provide a helpful anchor as I try to distill a large amount of theory into tools I can apply to the problems I'm familiar with.
