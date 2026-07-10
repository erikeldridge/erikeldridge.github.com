---
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51921062957"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-12-07T05:24:54+00:00"
guid: http://blog.erikeldridge.com/?p=2230
parent_post_id: null
post_id: "2230"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1607318697"
title: 'MLCC: Neural Networks'
url: /2020/12/06/mlcc-neural-networks/

---
I am [working through Google’s Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover the [“Neural Networks”](https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/) module.

## Does “deep learning” imply neural networks?

The introductory video refers to “deep neural networks”, so I’m wondering what the relationship is between deep learning and neural networks.

Yes, according to [Quora’s “Does deep learning always mean neural network or can include other ML techniques?”](https://www.quora.com/Does-deep-learning-always-mean-neural-network-or-can-include-other-ML-techniques).

“To give you some context, modern Convolutional Networks contain on orders of 100 million parameters and are usually made up of approximately 10-20 layers (hence _deep learning_)” \- [https://cs231n.github.io/neural-networks-1/](https://cs231n.github.io/neural-networks-1/)

“Deep Learning is simply a subset of the architectures (or templates) that employs 'neural networks'” - [https://towardsdatascience.com/intuitive-deep-learning-part-1a-introduction-to-neural-networks-aaeb3a1500df](https://towardsdatascience.com/intuitive-deep-learning-part-1a-introduction-to-neural-networks-aaeb3a1500df) (TDS)

“Deep learning” in Google's glossary links to [“deep model”](https://developers.google.com/machine-learning/glossary#deep-model): “A type of neural network containing multiple hidden layers.”

“However, until 2006 we didn't know how to train neural networks to surpass more traditional approaches, except for a few specialized problems. What changed in 2006 was the discovery of techniques for learning in so-called deep neural networks.” - [http://neuralnetworksanddeeplearning.com/about.html](http://neuralnetworksanddeeplearning.com/about.html)

[Toward’s Data Science’s “Intuitive Deep Learning Part 1a: Introduction to Neural Networks”](https://towardsdatascience.com/intuitive-deep-learning-part-1a-introduction-to-neural-networks-aaeb3a1500df) clarifies “deep learning” is a subset of machine learning. I guess they’re both “learning”. I like the comparison of an algorithm to a recipe, and in this context, ML optimizes a recipe. Deep learning is a subset of optimization techniques.

## When to use neural networks?

Small data with linear relationships → LSR

Large data with linear relationships → gradient descent

Large data with simple, nonlinear relationships → feature crosses

Large data with complex, nonlinear relationships → NN

“Neural nets will give us a way to learn nonlinear models without the use of explicit feature crosses” - [https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/playground-exercises](https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/playground-exercises)

“Neural networks, a beautiful biologically-inspired programming paradigm which enables a computer to learn from observational data” - [http://neuralnetworksanddeeplearning.com/index.html](http://neuralnetworksanddeeplearning.com/index.html)

NN “have the flexibility to model many complicated relationships between input and output”- [https://towardsdatascience.com/intuitive-deep-learning-part-1a-introduction-to-neural-networks-aaeb3a1500df](https://towardsdatascience.com/intuitive-deep-learning-part-1a-introduction-to-neural-networks-aaeb3a1500df)

“That’s not to say that neural networks aren’t good at solving simpler problems. They are. But so are many other algorithms. The complexity, resource-intensiveness and lack of interpretability in neural networks is sometimes a necessary evil, but it’s only warranted when simpler methods are inapplicable” - [https://www.quora.com/What-kinds-of-machine-learning-problems-are-neural-networks-particularly-good-at-solving](https://www.quora.com/What-kinds-of-machine-learning-problems-are-neural-networks-particularly-good-at-solving)

## Why are there multiple layers?

“each layer is effectively learning a more complex, higher-level function over the raw inputs” - [https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/anatomy](https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/anatomy)

“A single-layer neural network can only be used to represent linearly separable functions … Most problems that we are interested in solving are not linearly separable.” - [https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/](https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/)

The universal approximation theory states that one hidden layer is sufficient for any problem - [https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/](https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/)

“How many hidden layers? Well if your data is linearly separable (which you often know by the time you begin coding a NN) then you don't need any hidden layers at all. Of course, you don't need an NN to resolve your data either, but it will still do the job.” - [https://stats.stackexchange.com/questions/181/how-to-choose-the-number-of-hidden-layers-and-nodes-in-a-feedforward-neural-netw](https://stats.stackexchange.com/questions/181/how-to-choose-the-number-of-hidden-layers-and-nodes-in-a-feedforward-neural-netw)

“One hidden layer is sufficient for the large majority of problems.” - [https://stats.stackexchange.com/questions/181/how-to-choose-the-number-of-hidden-layers-and-nodes-in-a-feedforward-neural-netw](https://stats.stackexchange.com/questions/181/how-to-choose-the-number-of-hidden-layers-and-nodes-in-a-feedforward-neural-netw)

“Even for those functions that can be learned via a sufficiently large one-hidden-layer MLP, it can be more efficient to learn it with two (or more) hidden layers” - [https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/](https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/)

“Multi-layer” implies at least one hidden layer: “It has an input layer that connects to the input variables, one or more hidden layers” - [https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/](https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/)

Chris Olah’s “Neural Networks, Manifolds and Topology”, linked from the crash course, visualizes how data sets intersecting in n dimensions may be disjoint in n + 1 dimensions, which enables a linear solution. Other than that, though, Olah’s article was over my head. Articles like TDS are more my speed.

## Why are some layers called “hidden”?

“The interior layers are sometimes called “hidden layers” because they are not directly observable from the systems inputs and outputs.” - [https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/](https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/)

## How many layers do I need?

Task 4 in the exercise recommends playing around with the hyperparameters to get a certain loss, but the combinatorial complexity makes me wonder if there’s an intuitive way to think about the role of layers and neurons. 🤔

“Regardless of the heuristics you might encounter, all answers will come back to the need for careful experimentation to see what works best for your specific dataset” - [https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/](https://machinelearningmastery.com/how-to-configure-the-number-of-layers-and-nodes-in-a-neural-network/)

“In sum, for most problems, one could probably get decent performance (even without a second optimization step) by setting the hidden layer configuration using just two rules: (i) number of hidden layers equals one; and (ii) the number of neurons in that layer is the mean of the neurons in the input and output layers.” - [https://stats.stackexchange.com/questions/181/how-to-choose-the-number-of-hidden-layers-and-nodes-in-a-feedforward-neural-netw](https://stats.stackexchange.com/questions/181/how-to-choose-the-number-of-hidden-layers-and-nodes-in-a-feedforward-neural-netw)

“3 neurons are enough because the XOR function can be expressed as a combination of 3 half-planes (ReLU activation)” - [https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/playground-exercises](https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/playground-exercises) Seems narrowing the problem space to ReLU enables some deterministic optimization.

“The sigmoid and hyperbolic tangent activation functions cannot be used in networks with many layers due to the vanishing gradient problem” - [https://machinelearningmastery.com/rectified-linear-activation-function-for-deep-learning-neural-networks/](https://machinelearningmastery.com/rectified-linear-activation-function-for-deep-learning-neural-networks/)

“use as big of a neural network as your computational budget allows, and use other regularization techniques to control overfitting” - [https://cs231n.github.io/neural-networks-1/#arch](https://cs231n.github.io/neural-networks-1/#arch)

“a model with 1 neuron in the first hidden layer cannot learn a good model no matter how deep it is. This is because the output of the first layer only varies along one dimension (usually a diagonal line), which isn't enough to model this data set well” - [https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/playground-exercises](https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/playground-exercises)

“A single layer with more than 3 neurons has more redundancy, and thus is more likely to converge to a good model” - [https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/playground-exercises](https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/playground-exercises)

Two hidden layers with eight neurons in the first and two in the second performed well (~0.15 loss) on repeated runs.

Heuristics from spiral solution video:

1. Tune number of layers and nodes. Max neurons in the first layer, tapering down a couple layers to the output is a reasonable start. Each neuron takes time to train, though, so reduce total neurons if training is too slow. This is reinforced by the practice exercise, which started with two layers of 20 and 12 neurons, and then tried to reduce the number of neurons while keeping loss stable.
1. Reduce the learning rate to smooth loss curve
1. Add regularization to further smooth loss curve
1. Feature engineering helps with noisy data
1. Try different activation functions. Ultimately, tanh had the best fit
1. Iterate from 1

Even after all this, tuning hyper parameters still seems combinatorially complex.

## Activation functions

A neural net consists of layers. Nodes in the bottom layer are linear equations. Nodes in a “hidden” layer transform a linear node into a non-linear node using an “activation function”. The crash course states “any mathematical function can serve as an activation function”.

A sigmoid is an example of an activation function. I remember from the module on logistic regression ([notes](https://blog.erikeldridge.com/2020/11/21/google-machine-learning-crash-course-logistic-regression/)) that we used a sigmoid to transform a linear equation into a probability.

## Why is it called a “neuron”?

The glossary definition for [“neuron”](https://developers.google.com/machine-learning/glossary#neuron) is pretty good: 1) “taking in multiple input values and generating one output value”, and 2) ”The neuron calculates the output value by applying an activation function.” Aside: this reminds me of lambda architecture. I appreciate TDS clarifying neurons “often take some linear combination of the inputs”, like w1x1 + w2x2 + w3x3. I suppose this is what the glossary means by “a weighted sum of input values”.

TDS references a single image from the [biological motivations section of Stanford’s CS231n](https://cs231n.github.io/neural-networks-1/#bio), but I find both the images from that section useful for comparison.

I like TDS' definition of a “layer” as “a “neural network” is simply made out of layers of neurons, connected in a way that the input of one layer of neuron is the output of the previous layer of neurons”. In that context, the [hidden layer diagrams from the crash course](https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/anatomy#hidden-layers) makes sense.
