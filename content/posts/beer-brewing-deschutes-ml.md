---
_publicize_job_id: "51603880155"
_rest_api_client_id: "2697"
_rest_api_published: "1"
author: erikeldridge
categories:
  - different-perspectives
date: "2020-11-29T01:35:23+00:00"
guid: http://blog.erikeldridge.com/?p=2213
parent_post_id: null
post_id: "2213"
tags:
  - machine-learning
  - raspberry-pi
timeline_notification: "1606613776"
title: '"Beautiful Future: How Deschutes Uses Artificial Intelligence &amp; Machine Learning to Brew Better Beer"'
url: /2020/11/28/beer-brewing-deschutes-ml/

---
Craft Beer and Brewing's article ["Beautiful Future: How Deschutes Uses Artificial Intelligence & Machine Learning to Brew Better Beer"](https://beerandbrewing.com/amp/beautiful-future-how-deschutes-uses-artificial-intelligence-and-machine/) describes an intuitive application of ML. Deschutes brewery wanted to more accurately predict when a given fermentation process would complete. The problem statement is simple:

> Produce the same amount of beer in less time, while maintaining or improving the quality of the beer along the way, and you’ll have more resources for the intentional play that leads to new beers that drinkers love.

I like the explicit recognition that reducing toil frees time for more valuable activities. This is reiterated later:

> Most beer consumers aren’t concerned with how efficiently or cost-effectively a brewery makes their beer—they want high-quality beer, and they want new and exciting beers.

Fermentation sounds like a relatively simple curve to plot. It's easy to imagine manually monitoring something like sugar content vs time, and then using that data to train a model.

Brewers now trust automation to act on the predictions:

> Today, cellar operators at Deschutes have such a high level of confidence in the algorithm that they typically allow the software to trigger next steps in the brewing process.

The automation is also easy to imagine. Deschutes'[Brewery Pi](https://brewerypi.com) project targets Raspberry Pi, which I can see being used to drive hardware to adjust temperature, add nutrients, drain a fermentation vessel, etc. I really like how Deschutes made the code open-source 🍻
