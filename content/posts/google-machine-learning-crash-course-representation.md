---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51226654630"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-19T03:00:19+00:00"
guid: http://blog.erikeldridge.com/?p=2156
parent_post_id: null
post_id: "2156"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1605754822"
title: 'MLCC: Representation'
url: /2020/11/18/google-machine-learning-crash-course-representation/

---
I am [working through Google's Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover the [“Representation”](https://developers.google.com/machine-learning/crash-course/representation/feature-engineering) section.

> feature engineering is another topic which doesn’t seem to merit any review papers or books, or even chapters in books, but it is absolutely vital to ML success. \[…\] Much of the success of machine learning is actually success in engineering features that a learner can understand.
>
> Scott Locklin, in “ [Neglected machine learning ideas](https://scottlocklin.wordpress.com/2014/07/22/neglected-machine-learning-ideas/)” AQI [Machine Learning Mastery’s feature engineering overview](https://machinelearningmastery.com/discover-feature-engineering-how-to-engineer-features-and-how-to-get-good-at-it/)

I’ve heard 80% of data science is cleaning. This section introduces a nuance: cleaning includes a step mapping raw data into a format that's appropriate and efficient for inputting into a model. The [“scrubbing”](https://developers.google.com/machine-learning/crash-course/representation/cleaning-data#scrubbing) sub-section actually seems like the only thing that fits what I previously thought of as “cleaning”, eg removing human errors, addressing incomplete data, etc.

The whole section has good recommendations I can see serving as an ongoing reference. For example:

- Good feature values should appear more than 5 or so times in a data set … avoid unique IDs
- Keep data pure by not encoding exceptional states into a feature’s value type, eg an integer feature where -1 means undefined, aka “magic” values. Instead, use boolean flags for exceptional states.

The "Z score" scales values as follows: `scaled = (value - mean) stdev`. [Math is Fun has a good explanation for how to derive the standard deviation](https://www.mathsisfun.com/data/standard-deviation.html), but Pandas also provides it trivially in the output from [`describe`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.describe.html).

[“Binning”](https://developers.google.com/machine-learning/crash-course/representation/cleaning-data) seems similar to [\*-hot encoding](https://developers.google.com/machine-learning/crash-course/representation/feature-engineering) in that we’re enabling weights for each value, although the former concerns continuous values and the latter concerns discrete values. The [feature cross video](https://developers.google.com/machine-learning/crash-course/feature-crosses/video-lecture) supports this by referring to both in the same context.

[Histograms](https://www.mathsisfun.com/data/histograms.html) and stats, like those output by [`describe`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.describe.html), can help detect bad data.
