---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51065217226"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-14T19:36:52+00:00"
guid: http://blog.erikeldridge.com/?p=1803
parent_post_id: null
post_id: "1803"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1605382615"
title: 'MLCC: Linear regression'
url: /2020/11/14/linear-regression/

---
I am [working through Google's Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover [\[1\]](/wp-admin/post.php?post=1890&action=edit&calypsoify=1&block-editor=1&frame-nonce=0eb5579d92&origin=https%3A%2F%2Fwordpress.com&environment-id=production&support_user&_support_token#references) and [\[2\]](/wp-admin/post.php?post=1890&action=edit&calypsoify=1&block-editor=1&frame-nonce=0eb5579d92&origin=https%3A%2F%2Fwordpress.com&environment-id=production&support_user&_support_token#references).

A lot of ML quickstarts dive right into jargon like model, feature, y', L2, etc, which makes it hard for me to learn the basics - “what are we doing and why?”

The crash course also presents some jargon, but at least explains each concept and links to a [glossary](https://developers.google.com/machine-learning/glossary), which makes it easier to learn.

After a few days of poking around, one piece of jargon seems irreducible: linear regression. In other words, this is the kind of basic ML concept I’ve been looking for. This is where I’d start if I was helping someone learn ML.

I probably learned about linear regression in the one statistics class I took in college, but have forgotten about it after years of [string parsing](https://news.ycombinator.com/item?id=20132880) :)

The glossary entry for [linear regression](https://developers.google.com/machine-learning/glossary#linear-regression) describes it as “Using the raw output (y’) of a linear model as the actual prediction in a regression model”, which is still too dense for me.

The [linear regression module of the crash course](https://developers.google.com/machine-learning/crash-course/descending-into-ml/linear-regression) is closer to my level:

> Linear regression is a method for finding the straight line … that best fits a set of points.

The crash course provides a good example of a line fitting points describing cricket chirps per minute per temperature:

{{< figure src="https://developers.google.com/machine-learning/crash-course/images/CricketLine.svg" alt="Google's example of a line fitting cricket chirps by temperature" caption="Google's example of a line fitting cricket chirps by temperature" >}}

The “linear” in “linear regression” refers to this straight line, as in [linear equation](https://www.mathsisfun.com/algebra/linear-equations.html). The "regression" refers to "regression to the mean", which is a statistical observation unfortunately unrelated to statistical methods like the least squares technique described below, as [explained humorously by John Seymour](http://johnthemathguy.blogspot.com/2017/12/why-is-it-called-regression.html).

[Math is Fun describes a technique called “least squares regression”](https://www.mathsisfun.com/data/least-squares-regression.html) for finding such a line. Google’s glossary also has an entry for [least squares regression](https://developers.google.com/machine-learning/glossary#least-squares-regression), which gives me confidence that I’m bridging my level (Math is Fun) with the novel concept of ML.

Helpful tip from [StatQuest’s “Machine Learning Fundamentals: Bias and Variance](https://youtu.be/EuBBz3bI-aA?t=189)”: differences are squared so that negative distances don’t cancel out positive distances.

[Math is Fun’s article on linear equations](https://www.mathsisfun.com/algebra/linear-equations.html) and the [crash course’s video on linear regression](https://developers.google.com/machine-learning/crash-course/descending-into-ml/video-lecture) reminded me of the slope-intercept form of a linear equation I learned about way back when: `y = mx + b`.

The crash course even [describes](https://developers.google.com/machine-learning/crash-course/descending-into-ml/linear-regression) this equation as a “model”: “By convention in machine learning, you'll write the equation for a model slightly differently ...”

All this helps me understand in the most basic sense:

- A “model” is just an equation
- “Training” and “learning” are just performing a regression calculation to generate an equation
- Performing these calculations regularly and on large data sets is tedious and error prone, so we use a computer, hence “machine learning”
- “Prediction” and “inference” are just plugging x values into the equation

## Resources

1. [Google Machine Learning Crash Course: "Framing"](https://developers.google.com/machine-learning/crash-course/framing/)
1. [Google Machine Learning Crash Course: "Descending into ML"](https://developers.google.com/machine-learning/crash-course/descending-into-ml/)
