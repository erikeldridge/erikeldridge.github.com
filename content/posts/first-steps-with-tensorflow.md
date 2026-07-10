---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51150909571"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-11-17T05:21:28+00:00"
guid: http://blog.erikeldridge.com/?p=1871
parent_post_id: null
post_id: "1871"
tags:
  - google-ml-crash-course
  - machine-learning
  - notes
timeline_notification: "1605590491"
title: 'MLCC: First Steps with TensorFlow'
url: /2020/11/16/first-steps-with-tensorflow/

---
I am [working through Google's Machine Learning Crash Course](https://blog.erikeldridge.com/tag/google-ml-crash-course/). The notes in this post cover [\[2\]](/wp-admin/post.php?post=1890&action=edit&calypsoify=1&block-editor=1&frame-nonce=0eb5579d92&origin=https%3A%2F%2Fwordpress.com&environment-id=production&support_user&_support_token#references).

[\[2\]](http://references) introduces Colab, NumPy, Pandas and TensorFlow.

Colab is like a hosted Jupyter notebook and provides an easy way to play with Python ML libraries, among other things.

NumPy provides performant and user-friendly collections and operations for linear algebra.

Pandas provides tools for working with “dataframes”, which are like spreadsheets in memory.

## Digression into Google Sheets

I like building on my understanding. In this context, I want to learn Colab and NumPy by using them to work with the cricket chirp data introduced in [\[1\]](#references).

[\[1\]](#references) used cricket chirps per minute per temperature as an example, but didn’t provide raw data. [Dolbear’s Law](https://en.wikipedia.org/wiki/Dolbear%27s_law) provides an equation we can use to generate data: TC = 10 + (N60 \- 40) / 7 → N60 = 7 \* TC \- 30

Colab and NumPy provide an easy way to use this equation:

```
import numpy as np

# Starts by generating temp, since chirps are dependent on temp.
# Starts at 5 because Dolbear’s formula results in a negative value below 5 degrees
temps = np.arange(5,36)

# Adds noise to avoid an obviously linear relationship.
# Copies the approach from “NumPy UltraQuick Tutorial“ linked from [2].
# Sets low of -5, which limits the minimum chirps to zero.
noise = np.random.randint(low=-5, high=5, size=36)
chirps = 7 * temps - 30 + noise

# Prints CSVs, since Google Sheets knows how to split CSVs on paste.
print(','.join([str(i) for i in temps]))
print(','.join([str(i) for i in chirps]))
```

Example chirps per minute:

```
7,13,15,27,31,38,45,57,57,67,76,85,89,94,100,109,116,120,131,134,144,149,158,165,170,176,187,189,197,208,215
```

Note this generates synthetic data for chirps per minute, but then I’ll use them to predict temperature, ie chirps is the [feature](https://developers.google.com/machine-learning/glossary/#feature) and temperature is the [label](https://developers.google.com/machine-learning/glossary/#label).

Copy the temps and chirps CSVs. In Sheets, _Edit > paste special > paste comma-separated text (CSV) as columns_.

To improve readability, cut the pasted content and _Edit > paste special > paste transposed_ to convert row data to column data.

Add column headers, select everything and then _Insert > Chart_.

Select “Scatter chart” for the chart type. Under _Customize > Series_, check the trendline box. Select “Equation” for the label to get the regression equation. Check the R2 box.

We can also use the [SLOPE](https://support.google.com/docs/answer/3094048?hl=en) and [INTERCEPT](https://support.google.com/docs/answer/3093632?hl=en) methods to calculate the equation.

Slope, intercept and R2, respectively, given the example chirps per minute from above:

- 0.144
- 4.323
- 0.999

Unfortunately, Sheets doesn’t have [MSE](https://developers.google.com/machine-learning/glossary/#mean-squared-error-mse), which I learned about in [\[1\]](#references), which leads me to wonder, “What’s the relationship between R2 and MSE?” Per [\[3\]](#references), we’re better off with MSE.

## Digression into SciKit

[\[2\]](#references) introduces Pandas after NumPy, but continuing the theme of building on understanding, I’d like to perform a linear regression in Colab, rather than copy-pasting into Sheets. I’ll follow [\[4\]](#references) and [\[5\]](#references) and defer Pandas until I need it for TensorFlow.

```
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

actual_temps = np.arange(5,36)
chirps = np.array([7,13,15,27,31,38,45,57,57,67,76,85,89,94,100,109,116,120,131,134,144,149,158,165,170,176,187,189,197,208,215])

model = linear_model.LinearRegression()
model.fit(chirps[:, np.newaxis], actual_temps)

predicted_temps = model.predict(chirps[:, np.newaxis])

plt.scatter(chirps, actual_temps)
plt.plot(chirps, predicted_temps)

# Starts the y-axis at zero, even though the data starts at 5
plt.ylim(0)

print('Slope: %.3f' % model.coef_)
print('Intercept: %.3f' % model.intercept_)
print('MSE: %.3f' % mean_squared_error(actual_temps, predicted_temps))
print('R2: %.3f' % r2_score(actual_temps, predicted_temps))

```

Slope, intercept, MSE and R2, respectively:

- 0.144
- 4.323
- 0.085
- 0.999

Note SciKit can calculate MSE and R2. Perhaps in line with [\[3\]](/wp-admin/post.php?post=1871&action=edit&calypsoify=1&block-editor=1&frame-nonce=9c0c6d80ba&origin=https%3A%2F%2Fwordpress.com&environment-id=production&support_user&_support_token#references), note MSE is non-zero, but R2 close to 100% 🤔

As expected, Sheets is great for common stuff, but Colab/Jupyter shines for arbitrary calculation.

## TensorFlow

Coincidentally, [TensorFlow's fifth birthday](https://blog.google/technology/ai/5-ways-celebrate-tensorflows-5th-birthday/) was just a couple days ago 🥳

Continuing the theme of building on experience, I’m using the cricket chirp data for the synthetic exercise:

```
my_feature = ([float(i) for i in [7,13,15,27,31,38,45,57,57,67,76,85,89,94,100,109,116,120,131,134,144,149,158,165,170,176,187,189,197,208,215]])
my_label   = ([float(i) for i in range(5,36)])
```

The following settings enabled the cricket chirp data to converge with an [RMSE](https://developers.google.com/machine-learning/glossary/#root-mean-squared-error-rmse) ~ 0.8, which seems like a sweet spot of accuracy vs training time:

- Learning: 0.01
- Epochs: 50
- Batch size: 1

Decreasing the learning rate (eg 0.001) and increasing the epochs (eg 500) converges with an RMSE ~0.5, but takes forever. Increasing the batch increases choppiness of the error tail.

The summary at the bottom of the synthetic data exercise seems generally useful:

- "Training loss should steadily decrease, steeply at first, and then more slowly until the slope of the curve reaches or approaches zero.
- If the training loss does not converge, train for more epochs.
- If the training loss decreases too slowly, increase the learning rate. Note that setting the learning rate too high may also prevent training loss from converging.
- If the training loss varies wildly (that is, the training loss jumps around), decrease the learning rate.
- Lowering the learning rate while increasing the number of epochs or the batch size is often a good combination.
- Setting the batch size to a _very_ small batch number can also cause instability. First, try large batch size values. Then, decrease the batch size until you see degradation.
- For real-world datasets consisting of a very large number of examples, the entire dataset might not fit into memory. In such cases, you'll need to reduce the batch size to enable a batch to fit into memory."

For the real data, there’s a note about the “max” being anomalous relative to the different percentiles, which makes sense, but is a little abstract. The plot does a good job showing outliers.

Interesting that the RMSE for the real data is ~100, rather than the zero I was going for with the synthetic data. I guess the point is that we’re trying to minimize loss, rather than eliminate it.

\[2\] uses California housing data, but we can browse other datasets at [https://datasetsearch.research.google.com/](https://datasetsearch.research.google.com/).

Great tip to use [corr](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.corr.html) to see which features correlate with a label, as an alternative to trial and error [hyperparameter](https://developers.google.com/machine-learning/glossary/#hyperparameter) tuning.

## References

1. [Google Machine Learning Crash Course: “Descending into ML”](https://developers.google.com/machine-learning/crash-course/framing/)
1. [Google Machine Learning Crash Course: “First Steps with TensorFlow”](https://developers.google.com/machine-learning/crash-course/first-steps-with-tensorflow/)
1. [University of Virginia Library: “Is R-squared Useless?”](https://data.library.virginia.edu/is-r-squared-useless/)
1. [Python Data Science Handbook: "In Depth: Linear Regression" excerpt](https://jakevdp.github.io/PythonDataScienceHandbook/05.06-linear-regression.html)
1. [SciKit: “Linear Regression Example”](https://scikit-learn.org/stable/auto_examples/linear_model/plot_ols.html)
