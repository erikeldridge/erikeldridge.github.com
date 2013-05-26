---
title: TwOAuth with Twython
layout: note
---

[Twython](https://github.com/ryanmcgrath/twython) makes signed requests to the Twitter API easy.

The OAuth token generation tool on [dev.twitter.com](http://dev.twitter.com) make it even easier.

#### First, create Twitter app

1. Create an application at [dev.twitter.com](http://dev.twitter.com)
1. On the app details page, under "Your access token", click the "Create OAuth access token" button
1. Note the "consumer key", "consumer secret", "access token", and "access token secret" for use below

#### Next, set up Twython

1. Install twython: `$ pip install twython`
1. Launch python: `$ python`
1. Import and initialize twython:

        >>> from twython import Twython
        >>> t = Twython(<consumer key>, <consumer secret>, <access token>, <access token secret>)

1. Sanity check by fetching your home timeline: `>>> t.get_home_timeline()`

#### $$$

1. Fetch anything described in twython's [api_table](https://github.com/ryanmcgrath/twython/blob/master/twython/endpoints.py)
1. Fetch anything unsupported via [twython's _request_ method](https://github.com/ryanmcgrath/twython/blob/master/twython/twython.py#L209)
1. See the Python's [json documentation](http://docs.python.org/2/library/json.html) for parse and pretty print instructions

