---
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51407018843"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-24T03:26:41+00:00"
guid: http://blog.erikeldridge.com/?p=2200
parent_post_id: null
post_id: "2200"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1606188406"
title: 'MLCC: Regularization for sparsity'
url: /2020/11/23/google-machine-learning-crash-course-regularization-for-sparsity/

---
I am [working through Google’s Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover the [“Regularization for Sparsity”](https://developers.google.com/machine-learning/crash-course/regularization-for-sparsity/) module.

Best-practice: if you’re overfitting, you want to regularize.

["Convex Optimization"](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf) by Boyd and Vandenberghe, linked from multiple [glossary](https://developers.google.com/machine-learning/glossary#convex-optimization) entries, touches on many of the points made by the crash course:

- “A problem is sparse if each constraint function depends on only a small number of the variables”
- “Like least-squares or linear programming, there are very effective algorithms that can reliably and efficiently solve even large convex problems”, which would explain why gradient descent is a tool we use
- Regularization is when “extra terms are added to the cost function”
- "If the problem is sparse, or has some other exploitable structure, we can often solve problems with tens or hundreds of thousands of variables and constraint", so it would seem performance is another motivation for regularization

Ideally, we could perform L0 normalization, but that’s non-convex, [and so, NP-hard (slide 7)](https://www.cs.cornell.edu/courses/cs6787/2017fa/Lecture7.pdf). (I like Math is Fun's NP-complete page:) As noted wrt [gradient descent](https://blog.erikeldridge.com/2020/11/14/gradient-descent/), we need a convex loss curve to optimize. L1 approximates L0 and is easy to compute.

[Quora provides a couple intuitive explanations for L1 and L2 norms](https://www.quora.com/Linear-Algebra-What-are-the-intuitive-explanations-of-the-norms-L0-L1-L2-etc/answer/Lee-Witt-1): “L2 norm there yields Euclidean distance … The L1 norm gives rise to what can be referred to as the "taxi-cab" distance”

[Rorasa's blog](https://rorasa.wordpress.com/2012/05/13/l0-norm-l1-norm-l2-norm-l-infinity-norm/) states “Norm may come in many forms and many names, including these popular name: Euclidean distance, Mean-squared Error, etc … Because the lack of l0-norm’s mathematical representation, l0-minimisation is regarded by computer scientist as an NP-hard problem, simply says that it’s too complex and almost impossible to solve. In many case, l0-minimisation problem is relaxed to be higher-order norm problem such as l1-minimisation and l2-minimisation.”

The [glossary](https://developers.google.com/machine-learning/glossary#l1-regularization) summarizes:

- L1 regularization “penalizes weights in proportion to the sum of the absolute values of the weights. In models relying on sparse features, L1 regularization helps drive the weights of irrelevant or barely relevant features to exactly 0”
- L2 regularization “penalizes weights in proportion to the sum of the squares of the weights. L2 regularization helps drive outlier weights (those with high positive or low negative values) closer to 0 but not quite to 0”
