---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "48798292236"
_rest_api_client_id: "2697"
_rest_api_published: "1"
_wp_old_slug: jekyll-redirection
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-09-14T06:47:10+00:00"
guid: http://blog.erikeldridge.com/2020/09/13/jekyll-redirection%e2%a4%b4%ef%b8%8f/
parent_post_id: null
post_id: "1773"
timeline_notification: "1600066074"
title: GitHub Pages redirection
url: /2020/09/13/github-pages-redirection/

---
## Solution

1. Install the jekyll-redirect-from plugin
1. update the front matter on posts to include `redirect_to: https://new.site/new/path`
1. Load a post and observe the browser redirect to the new location 👍

## Problem statement

I was using GitHub Pages (Jekyll) for blogging, but recently switched to WordPress. I didn't want to break old links, so I needed a way to permanently redirect.

An [SO answer](https://stackoverflow.com/a/19717455/1971682) got me thinking about a `meta` tag. Is there an efficient way to add this `meta` tag to posts? Yes. Some [old GitHub Enterprise](https://github.com/jekyll/jekyll-redirect-from#how-it-works) Pages docs recommend using the [jekyll-redirect-from plugin](https://github.com/jekyll/jekyll-redirect-from). We can confirm it's supported for non-Enterprise Pages by looking at the list of [supported plugins](https://github.com/jekyll/jekyll-redirect-from#how-it-works). And I see it works [via a `meta` tag](https://github.com/jekyll/jekyll-redirect-from#how-it-works).

Is the redirect permanent? Sort of. The HTTP response from GitHub is 200, but the HTML redirect includes a [canonical](https://support.google.com/webmasters/answer/139066?hl=en) `link`, eg:

```
$ curl -v https://erikeldridge.com/notes/google-cloud-workstation.html
< HTTP/2 200
< server: GitHub.com
< content-type: text/html; charset=utf-8
...
<!DOCTYPE html>
<html lang="en-US">
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <link rel="canonical" href="http://blog.erikeldridge.com/2019/03/02/google-cloud-workstation/">
  <script>location="http://blog.erikeldridge.com/2019/03/02/google-cloud-workstation/"</script>
  <meta http-equiv="refresh" content="0; url=http://blog.erikeldridge.com/2019/03/02/google-cloud-workstation/">
  <meta name="robots" content="noindex">
  <h1>Redirecting...</h1>
  <a href="http://blog.erikeldridge.com/2019/03/02/google-cloud-workstation/">Click here if you are not redirected.</a>
</html>
```

That `script` tag looks broken, but it's shorthand for \`window.location.href\`.
