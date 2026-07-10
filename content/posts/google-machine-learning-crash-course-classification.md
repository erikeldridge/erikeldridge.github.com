---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51343142840"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-22T06:54:38+00:00"
guid: http://blog.erikeldridge.com/?p=2184
parent_post_id: null
post_id: "2184"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1606028083"
title: 'MLCC: Classification'
url: /2020/11/21/google-machine-learning-crash-course-classification/

---
I am [working through Google’s Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover the [“Classification”](https://developers.google.com/machine-learning/crash-course/classification/) module.

New metrics for evaluating classification performance:

- Accuracy
- Precision
- Recall
- ROC
- AUC

## Accuracy

["Accuracy"](https://developers.google.com/machine-learning/glossary#accuracy) simply measures percentage of correct predictions.

It fails on class-imbalance, aka “skewed class”, problems, though. [Neptune AI](https://neptune.ai/blog/f1-score-accuracy-roc-auc-pr-auc) states is bluntly: “You shouldn’t use accuracy on imbalanced problems.” Heuristic: is the percent accuracy > the imbalance? For example, if a population is 99% disease-free, an accuracy of 99% requires no intelligence. This is called the [“accuracy paradox”](https://en.wikipedia.org/wiki/Accuracy_paradox). Precision and recall are better suited to class-imbalance problems.

Tip: calculate odds independently if possible to compare with accuracy.

## Confusion matrix

A [“confusion matrix”](https://developers.google.com/machine-learning/glossary#confusion-matrix), aka “classification matrix”, quantifies predicted vs actual outcomes, which is useful for evaluating model performance.

[A false positive is a “type one” error. A false negative is a “type two” error.](https://www.youtube.com/watch?v=LlqjbuwyGx4) When the cost of error is high, type two must be minimized. In other words, when the cost of error is high, maximize recall.

## Precision and recall

[Andrew Ng’s “Lecture 11.4 — Machine Learning System Design \| Trading Off Precision And Recall”](https://www.youtube.com/watch?v=W5meQnGACGo) provides a helpful phrasing:

- Precision = true positive / predicted positive
- Recall = true positive / actual positive

Regarding the accuracy paradox, if a model simply predicts negative all the time (eg because 99% of email isn’t spam), it will fail recall and precision because it never has a true positive.

[Wikipedia](https://en.wikipedia.org/wiki/Precision_and_recall) makes a point: “It is trivial to achieve recall of 100% by returning all documents in response to any query”

Precision and recall are important, and in tension. Classification depends on a “threshold”. Increasing the threshold increases precision, but decreases recall. Wikipedia uses surgery for a brain tumor to illustrate: a conservative approach increases the risk of false negative; an aggressive approach increases risk of false positive. Plotting the [“precision-recall curve”](https://developers.google.com/machine-learning/glossary#precision-recall-curve) can also help demonstrate the relationship, as [demonstrated by Andrew Ng](https://youtu.be/W5meQnGACGo?t=343).

Wikipedia has [a nice visualization differentiating precision and recall](https://en.wikipedia.org/wiki/Precision_and_recall):

{{< figure src="https://lh4.googleusercontent.com/lshFZdLgCF%5FV5vf2hMTj5MBM%5F2dmTk%5F4PGu47Bd5J%5FEimDeuS594oeqao16Z65QJgPGnTpkXnTiX1LhEfwMdcLxzoBvYemhnO-T0r10zMWXhAx9u0CigNye7PiWeLdTfEQBdiomg" alt="" caption="" >}}

## ROC and AUC

The ["ROC curve"](https://developers.google.com/machine-learning/glossary#roc-receiver-operating-characteristic-curve) helps identify the best threshold.

["AUC"](https://developers.google.com/machine-learning/glossary#auc-area-under-the-roc-curve) compares ROCs, helping identify the best model.

[StatQuest’s “ROC and AUC, Clearly Explained!”](https://www.youtube.com/watch?v=4jRBRDbJemM) states precision is a better metric than the false positive rate for class imbalance problems because it doesn’t take true negatives into account.

Keras gives us AUC for a model, but what’s the corresponding threshold? The crash course clarifies: “AUC is classification-threshold-invariant. It measures the quality of the model's predictions irrespective of what classification threshold is chosen.” Ok, then why use anything but AUC? [Neptune AI](https://neptune.ai/blog/f1-score-accuracy-roc-auc-pr-auc) summarizes: “... use it when you care equally about positive and negative classes.”

## Prediction bias

Seems like this is another way of quantifying model performance. If we know a probability of occurrence and the model produces a significantly different probability, that indicates something’s amiss.

The formal definition is: average predicted occurrence - average actual occurrence. There’s a helpful note that a model simply returning the average occurrence would have zero prediction bias, but would still be a bad model.

The crash course gives a few causes for bias. [StatQuest’s “Machine Learning Fundamentals: Bias and Variance”](https://youtu.be/EuBBz3bI-aA?t=144) adds another: the inability of a ML algorithm to capture the true relationship between features and labels, eg linear regression trying to capture a curved relationship.

Fix prediction bias in the model, rather than adjusting the model output.

Interesting clarification that predicted values are a probability range, but actual values are discrete, so we need to segment values and average them to make a comparison.
