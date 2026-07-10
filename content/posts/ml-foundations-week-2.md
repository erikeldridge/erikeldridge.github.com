---
_publicize_job_id: "78912644140"
_rest_api_client_id: "2697"
_rest_api_published: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2022-11-21T00:30:54+00:00"
guid: http://blog.erikeldridge.com/2022/11/20/ml-foundations-week-2/
parent_post_id: null
post_id: "2329"
tags:
  - notes
timeline_notification: "1668990708"
title: 'ML Foundations: week 2'
url: /2022/11/20/ml-foundations-week-2/
wordads_ufa: s:wpcom-ufa-v3-beta:1668990910

---
Coursera's Lab was running slowly, so explored Google's Colab as an alternative.

A few nice features: CPU and RAM usage indicators let me know if I'm close to a limit; the run, create and move buttons on each cell are convenient.

In Coursera, download the FND02-NB01.ipynb.zip and home\_data.sframe.zip files and unzip.

In Colab, click on "File > Upload notebook" and upload the unzipped notebook.

Add a cell to install Turi Create:

```
%%bash
pip install turicreate
```

Add another cell to authorize Colab to read files from Drive:

```
from google.colab import drive
drive.mount('/content/drive')
```

In Drive, select "upload folder" and upload the unzipped folder.

In Colab's left rail, click on the little the stylized folder icon (🗂) and browse Drive for the uploaded folder. Right-click on the folder and select "Copy path".

Update the SFrame creation to use the copied path:

```
sales = turicreate.SFrame('/content/drive/MyDrive/home_data.sframe')
```

Credit to the "Bonus Method — My Drive" section of ["Get Started: 3 Ways to Load CSV files into Colab"](https://towardsdatascience.com/3-ways-to-load-csv-files-into-colab-7c14fcbdcb92) for describing the basics.

Aaand of course now that I've set up Colab, I see Coursera's Lab is running faster 🤷‍♂️

Out of curiosity, I see the intercept is negative, indicating buyers require a minimum square footage. Solving for x when y=0, I see it's ~180. I can plug that back into the model:

```
sqft_model.predict([{'sqft_living': 180}])
```
