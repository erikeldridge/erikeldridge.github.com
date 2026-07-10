---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_oembed_c76694d68f27585c9dd9e17efd9f2f99: <div class="embed-twitter"><blockquote class="twitter-tweet" data-width="500" data-dnt="true"><p lang="en" dir="ltr">Wrote this 10 months ago, and continue to feel the same - important problems often are messy.  <a href="https://t.co/NmYbkURHLj">https://t.co/NmYbkURHLj</a></p>&mdash; Subbu Allamaraju (@sallamar) <a href="https://twitter.com/sallamar/status/1184305483999404032?ref_src=twsrc%5Etfw">October 16, 2019</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>
_oembed_time_c76694d68f27585c9dd9e17efd9f2f99: "1605675238"
_publicize_job_id: "51185436739"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-18T01:42:46+00:00"
guid: http://blog.erikeldridge.com/?p=1890
parent_post_id: null
post_id: "1890"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1605663771"
title: 'MLCC: Generalization'
url: /2020/11/17/generalization/

---
I am [working through Google's Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover [\[1\]](#references) through [\[3\]](#references).

> The fundamental tension of machine learning is between fitting our data well, but also fitting the data as simply as possible.

A reasonable guideline: “The less complex an ML model, the more likely that a good empirical result is not just due to the peculiarities of the sample.”

[\[2\]](#references) recommends a best-practice: divide labeled examples into “training” and “test” sets.

Never train on test data! 100% accuracy can be a symptom of that.

[\[3\]](#references) goes further: divide labeled examples into three sets: "training", “validation” and "test". Simply testing against a "test" set risks overfitting to that set. Instead, iterate against the validation set, and then double-check using the test set.

A continuing impression is that TensorFlow builds in a lot of the best-practices described in this crash course. For example, splitting out a validation set and testing against it is a first-class argument to the [Model.fit method](https://www.tensorflow.org/api_docs/python/tf/keras/Model#fit).

The exercise associated with [\[3\]](#references) is interesting. First, testing against a validation set caught a bug! Second, the bug was a default sort on the latitude column; the validation set was not a random sample.

## References

1. [Google Machine Learning Crash Course: “Generalization”](https://developers.google.com/machine-learning/crash-course/generalization/)
1. [Google Machine Learning Crash Course:](https://developers.google.com/machine-learning/crash-course/generalization/) [“Training and Test Sets”](https://developers.google.com/machine-learning/crash-course/training-and-test-sets/)
1. [Google Machine Learning Crash Course:](https://developers.google.com/machine-learning/crash-course/generalization/) [“Validation Set”](https://developers.google.com/machine-learning/crash-course/validation/)
