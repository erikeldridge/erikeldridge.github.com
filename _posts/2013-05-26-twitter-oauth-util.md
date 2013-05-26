---
title: Twitter OAuth util
layout: note
---

[Twython](https://github.com/ryanmcgrath/twython) makes signed requests to the Twitter API easy.

The OAuth util on [dev.twitter.com](http://dev.twitter.com) makes it even easier.

1. Create an application at dev.twitter.com
2. Click the "create OAuth access token"
3. Install twython: `pip install twython`
4. Launch python
5. Import and initialize twython:

        from twython import Twython
        t = Twython(<consumer key>, <consumer secret>, <access token>, <access token secret>)

6. Fetch your home timeline: `t.get_home_timeline()`
7. Fetch anything described in [api_table](https://github.com/ryanmcgrath/twython/blob/master/twython/endpoints.py)
8. Fetch anything raw via [t.request](https://github.com/ryanmcgrath/twython/blob/master/twython/twython.py#L209)
9. See the Python's [json documentation](http://docs.python.org/2/library/json.html) for parse and pretty print instructions
