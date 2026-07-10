---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51343229895"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-22T06:59:04+00:00"
guid: http://blog.erikeldridge.com/?p=2190
parent_post_id: null
post_id: "2190"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1606028347"
title: 'MLCC: Logistic regression'
url: /2020/11/21/google-machine-learning-crash-course-logistic-regression/

---
I am [working through Google’s Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover the [“Logistic Regression”](https://developers.google.com/machine-learning/crash-course/logistic-regression/) module.

[“Logistic regression”](https://developers.google.com/machine-learning/glossary#logistic-regression) generates a probability (a value between 0 and 1). It’s also very efficient.

Note the glossary defines logistic regression as a classification model, which is weird since it has “regression” in the name. I suspect this is explained by “You can interpret the value between 0 and 1 in either of the following two ways: … a binary classification problem … As a value to be compared against a classification threshold ...”

The [“sigmoid”](https://developers.google.com/machine-learning/glossary#sigmoid_function) function, aka [“logistic”](https://mathworld.wolfram.com/SigmoidFunction.html) function/transform, produces a bounded value between 0 and 1.

Note the sigmoid function is just `y = 1 / 1 + e ^ - 𝞼` where 𝞼 is our usual linear equation. I suppose we’re transforming the linear output into a logistic form.

Regularization ([notes](https://blog.erikeldridge.com/2020/11/19/google-machine-learning-crash-course-regularization/)) is important in logistic regression. “Without regularization, the asymptotic nature of logistic regression would keep driving loss towards 0 in high dimensions”, esp L2 regularization and stopping early.

The [“logit”](https://developers.google.com/machine-learning/glossary#logits), aka [“log-odds”](https://en.wikipedia.org/wiki/Logit), function is the [inverse](https://www.mathsisfun.com/sets/function-inverse.html) of the logistic function.

The loss function for logistic regression is [“log loss”](https://developers.google.com/machine-learning/glossary#log-loss).
