---
title: Object path
layout: post
tags: toolkit mtnhut
date: 2017-09-24 15:55:20.722500000 -07:00

---


## Problem

I want to reduce conditional assignment when setting nested keys in an object, ideally:

```text
    {a:{b:{c:value}}} = set(a/b/c, value)
```

This is handy for data manipulation, eg prior to view rendering, and consistent with [Firebase Realtime Database's use of paths](https://firebase.google.com/docs/reference/js/firebase.database.Database#ref).


## Solution

Use [object-path](https://www.npmjs.com/package/object-path) or lodash's [set](https://www.npmjs.com/package/lodash.set)/[get](https://www.npmjs.com/package/lodash.get).

## Alternative 

The tools mentioned above interpret numeric path segments as array indices, which may cause unexpected results when inserting arbitrary values, eg

        set(store, 'users.5.name', 'Kwan') // store.users.length --> 6

If this is an issue, consider:

{% highlight js linenos %}
function set(obj, path, val){
  path.split('/').reduce((parent, key, i, keys) => {
    if (typeof parent[key] != 'object') {
      if (i === keys.length - 1) {
        parent[key] = val
      } else {
        parent[key] = {}
      }
    }
    return parent[key]
  }, obj)
}
function get(obj, path){
  return path.split('/').reduce((parent, key) => {
    return typeof parent === 'object' ? parent[key] : undefined
  }, obj)
}
{% endhighlight %}

## Example

{% highlight js linenos %}
const posts = {1: {tags: {sports: true, news: true}}, 2: {tags: {news: true}}}
const byTag = {}
Object.entries(posts).forEach(([id, post]) => {
  Object.keys(post.tags).forEach(tag => {
    set(byTag, `${tag}/${id}`, true)
  })
})
// byTag --> { sports: { '1': true }, news: { '1': true, '2': true } }
{% endhighlight %}

