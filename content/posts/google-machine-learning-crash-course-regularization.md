---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51269551942"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-20T04:32:11+00:00"
guid: http://blog.erikeldridge.com/?p=2175
parent_post_id: null
post_id: "2175"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1605846734"
title: 'MLCC: Regularization'
url: /2020/11/19/google-machine-learning-crash-course-regularization/

---
I am [working through Google’s Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover the [“Regularization”](https://developers.google.com/machine-learning/crash-course/regularization/) module.

An earlier module focused on generalization ([notes](https://blog.erikeldridge.com/2020/11/17/generalization/)). A [“generalization curve”](https://developers.google.com/machine-learning/glossary#generalization-curve) visualizes generalization by showing loss for training data vs loss for validation data.

When training loss is less than validation loss, we’re [“overfitting”](https://developers.google.com/machine-learning/glossary#overfitting) to the training data, reducing generalization.

[“Regularization”](https://developers.google.com/machine-learning/glossary#regularization) is the process of preventing overfitting. The [TensorFlow docs](https://www.tensorflow.org/tutorials/keras/overfit_and_underfit#add_weight_regularization) also discuss regularization.

[“Empirical risk minimization”](https://developers.google.com/machine-learning/glossary#empirical-risk-minimization-erm) refers to loss reduction using tools like gradient descent ([notes](https://blog.erikeldridge.com/2020/11/14/gradient-descent/)).

[“Structural risk minimization”](https://developers.google.com/machine-learning/glossary#structural-risk-minimization-srm) refers to regularization by minimizing the complexity of the model.

The [“L2 regularization”](https://developers.google.com/machine-learning/glossary#l2-regularization) formula quantifies complexity as the sum of the squares of the feature weights.

[“Lambda” aka “regularization rate”](https://developers.google.com/machine-learning/glossary#lambda) governs the amount of regularization applied. Increasing lambda strengthens regularization, resulting in a steeper histogram of weights, for example. A tool called [Vizier](https://cloud.google.com/ai-platform/optimizer/docs/overview) can help optimize lambda.

Helpful phrasing from [StatQuest’s "Machine Learning Fundamentals: Bias and Variance"](https://youtu.be/EuBBz3bI-aA?t=189): regularization is one technique for finding a balance between a simple model (that may have high bias) and a complex model (that may have high variability).

## Exercise 1

The answer for task 1 in the [first exercise](https://developers.google.com/machine-learning/crash-course/regularization-for-simplicity/playground-exercise-overcrossing), notes the “relative weight” of lines from FEATURE to OUTPUT in the playground. What is "relative weight"? 🤔 Later, the [second exercise](https://developers.google.com/machine-learning/crash-course/regularization-for-simplicity/playground-exercise-examining-l2-regularization) mentions “The relative thickness of each line running from FEATURES to OUTPUT represents the learned weight for that feature or feature cross. You can find the exact weight values by hovering over each line.” So, “relative weight” in this context is just referring to the weight of one line relative to another, rather than a novel concept.

The answer for task 1 states: “The lines emanating from X1 and X2 are much thicker than those coming from the feature crosses. So, the feature crosses are contributing far less to the model than the normal (uncrossed) features.” Task 2 states “If we use a model that is too complicated, such as one with too many crosses ...” Later, we learn “If model complexity is a function of weights ...” Is complexity a function of crosses or weights? 🤔  I guess the idea is that the additional complexity of the crosses was driving up the weight of the uncrossed features, irrespective of regularization. Running the playground with and without the cross supports this, eg ~1.5, 0.131 and 0.033, respectively, vs ~0.9 with losses 0.096 and 0.039. Running with the cross and 0.3 regularization results in ~0.3, 0.092 and 0.059. Running with just 0.3 regularization results in ~0.3, 0.093 and 0.061. So it would seem there are at least a couple, orthogonal components to “complexity”.

## Exercise 2

An answer in the playground mentions: “While test loss decreases, training loss actually increases. This is expected, because you've added another term to the loss function to penalize complexity.” 🤔  I think this is referring to the literal addition of the complexity term in the calculation to find a weight ( `minimize(loss(data|model)) + complexity(model)`).
