---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_oembed_c76694d68f27585c9dd9e17efd9f2f99: <div class="embed-twitter"><blockquote class="twitter-tweet" data-width="500" data-dnt="true"><p lang="en" dir="ltr">Wrote this 10 months ago, and continue to feel the same - important problems often are messy.  <a href="https://t.co/NmYbkURHLj">https://t.co/NmYbkURHLj</a></p>&mdash; Subbu Allamaraju (@sallamar) <a href="https://twitter.com/sallamar/status/1184305483999404032?ref_src=twsrc%5Etfw">October 16, 2019</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>
_oembed_time_c76694d68f27585c9dd9e17efd9f2f99: "1605414273"
_publicize_job_id: "51075234221"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-15T02:55:00+00:00"
guid: http://blog.erikeldridge.com/?p=1826
parent_post_id: null
post_id: "1826"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1605408905"
title: 'MLCC: Gradient descent'
url: /2020/11/14/gradient-descent/

---
I am [working through Google's Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover [\[2\]](/wp-admin/post.php?post=1890&action=edit&calypsoify=1&block-editor=1&frame-nonce=0eb5579d92&origin=https%3A%2F%2Fwordpress.com&environment-id=production&support_user&_support_token#references).

Earlier, [I explored simplistic linear regression](https://blog.erikeldridge.com/2020/11/14/linear-regression/), largely based on [\[1\]](#references). The next section of the crash course ([\[2\]](#references)) dives into [“gradient descent”](https://developers.google.com/machine-learning/glossary#gradient-descent) (GD), which raises the question “What’s wrong with the linear regression we just learned?” In short, the technique we just learned, Ordinary Least Squares (OLS), **does not scale**.

[\[3\]](#references) clarifies linear regression can take a few forms depending input and processing constraints. Among these forms, OLS concerns one or more inputs where “all of the data must be available and you must have enough memory to fit the data and perform matrix operations” and uses least squares to find the best line. GD concerns “a very large dataset either in the number of rows or the number of columns that may not fit into memory.” As described by [\[4\]](#references), OLS doesn’t scale. GD scales by finding a “numerical approximation … by iterative method”.

[\[2\]](#references) introduces GD by descending a parabola, but it’s unclear how we transitioned from talking about straight lines in [\[1\]](#references) to parabolas. The distinction is that **we’re now focusing on loss functions**. (To be fair, in retrospect, the title is "Reducing loss"🤦‍♂️) [\[2\]](#references) asserts “For the kind of regression problems we've been examining, the resulting plot of loss vs. w1 will always be convex”, ie a parabola. OLS takes all the data and computes an optimal line, but GD iteratively generates lines and determines whether one is optimal by comparing the loss to the previous iteration.

[\[1\]](#references) introduced the idea of quantifying the accuracy of a regression by calculating the loss. For example, it mentioned Mean Squared Error as a common loss function. [\[5\]](#references) clarifies that Mean _Squared_ Error is an exponential function. This provides helpful context for [\[2\]](#references)’s definition of “gradient” as the derivative of the loss function.

I like the summary statement from [\[5\]](#references):

> The goal of any Machine Learning Algorithm is to minimize the Cost Function

[\[5\]](#references) uses the interactive exercise from [\[2\]](#references). It’s reassuring to see convergence ;)

[\[4\]](#references) presents a good example of a team trying to find the highest peak in a mountainous area by parachuting randomly over the range and reporting their local max daily. I can see how that would scale well for a large data set. Reminds me of MapReduce.

This example is a bit counter-intuitive, though, in that GD is trying to find a minimum (loss) rather than a maximum. It’d be better phrased as trying to find the deepest valley. Anyway, it states “Our aim is to reach the minima which is the valley bottom. So our gradient should be negative always … So if at our initial weights, the slope is negative, we are in the right direction”, which explains the “descent” in “gradient descent”.

[\[4\]](#references) (like [\[2\]](#references)) describes three forms of GD:

1. Batch
1. Stochastic
1. Mini Batch

[\[2\]](#references) defines “a batch” as “the total number of examples you use to calculate the gradient in a single iteration.” Presumably, it’s referring to Batch GD when it says “So far, we've assumed that the batch has been the entire data set.”

[\[2\]](#references) describes Stochastic as picking one example at random for each iteration, which would take forever and may operate on redundant data, which is common in large data sets.

[\[2\]](#references) states Mini Batch “reduces the amount of noise in SGD but is still more efficient than full-batch” because it uses batches of 10-1000 random examples, and that Mini Batch is what’s used in practice.

When do we stop iterating? [\[2\]](#references) states “you iterate until overall loss stops changing or at least changes extremely slowly. When that happens, we say that the model has converged.”

To summarize:

1. Initialize with arbitrary weights
1. Generate a model
1. Sample (labeled) examples
1. Input sample into the model
1. Calculate the loss
1. Compare the new loss with the previous loss
1. If loss is decreasing
   1. Add the step value to the weight
   1. Repeat from step 2

## References

1. [Google Machine Learning Crash Course: "Descending into ML"](https://developers.google.com/machine-learning/crash-course/descending-into-ml/)
1. [Google Machine Learning Crash Course: "Reducing loss"](https://developers.google.com/machine-learning/crash-course/reducing-loss)
1. [Machine Learning Mastery: “Linear Regression for Machine Learning”](https://machinelearningmastery.com/linear-regression-for-machine-learning/)
1. [Towards Data Science: “Optimization: Ordinary Least Squares Vs. Gradient Descent — from scratch”](https://towardsdatascience.com/https-medium-com-chayankathuria-optimization-ordinary-least-squares-gradient-descent-from-scratch-8b48151ba756)
1. [Towards Data Science: “Understanding the Mathematics behind Gradient Descent”](https://towardsdatascience.com/understanding-the-mathematics-behind-gradient-descent-dde5dc9be06e?gi=3222b04c0916)
