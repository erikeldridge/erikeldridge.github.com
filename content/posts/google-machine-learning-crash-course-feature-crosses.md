---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51226757343"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-19T03:04:33+00:00"
guid: http://blog.erikeldridge.com/?p=2159
parent_post_id: null
post_id: "2159"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1605755076"
title: 'MLCC: Feature crosses'
url: /2020/11/18/google-machine-learning-crash-course-feature-crosses/

---
I am [working through Google's Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover the ["Feature Crosses" section](https://developers.google.com/machine-learning/crash-course/feature-crosses/).

“Feature cross”, “feature cross product” and “synthetic feature” are synonymous. A feature cross is the [cross product](https://mathsisfun.com/algebra/vectors-cross-product.html) of two features. The [nonlinearity sub-section](https://developers.google.com/machine-learning/crash-course/feature-crosses/encoding-nonlinearity) states “The term cross comes from [cross product](https://wikipedia.org/wiki/Cross_product).” Thinking of it as a [Cartessian product](https://en.wikipedia.org/wiki/Cartesian_product), which the [glossary mentions](https://developers.google.com/machine-learning/glossary/#feature-cross), helps me grok what’s going on, and why it’s helpful for the example problem where examples are clustered by quarter (to consider x-y pairs), and esp the exercise involving latitude and longitude pairs.

The video states “Linear learners use linear models”. What is a “linear model”? Given “model” is synonymous with “equation” or “function”, a “linear model” is a linear equation. For example, [Brilliant’s wiki](https://brilliant.org/wiki/linear-models) states: “A linear model is an equation ...” What is a “linear learner”? The video might just be stating a fact: something that learns using a linear model is a “linear learner”. For example, [Amazon SageMaker’s Linear Learner docs](https://docs.aws.amazon.com/sagemaker/latest/dg/linear-learner.html) states “The algorithm learns a linear function”.

A “linear problem” describes a relationship that can be expressed using a straight line (to divide the input data). [“Nonlinear problems”](https://developers.google.com/machine-learning/crash-course/feature-crosses/encoding-nonlinearity) cannot be expressed this way.

While trying to figure out why the exercise used an indicator\_column, I found some nice TensorFlow tutorials, eg for [feature crosses](https://www.tensorflow.org/tutorials/structured_data/feature_columns#crossed_feature_columns). In retrospect, I see the [indicator\_column docs](https://www.tensorflow.org/api_docs/python/tf/feature_column/indicator_column) state simply “Represents multi-hot representation of given categorical column.”
