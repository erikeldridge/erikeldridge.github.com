---
title: Object path
layout: post
tags: toolkit mtnhut
---


## Problem

I want to reduce conditional assignment when setting nested keys in an object, ideally:

        {a:{b:{c:value} = set(a/b/c, value)

This is handy for data manipulation, eg prior to view rendering, and consistent with [Firebase Realtime Database's use of paths](https://firebase.google.com/docs/reference/js/firebase.database.Database#ref).


## Solution

Use [object-path](https://github.com/mariocasciaro/object-path) or lodash's [set](https://www.npmjs.com/package/lodash.set)/[get](https://www.npmjs.com/package/lodash.get).

## Alternative 

The tools mentioned above interpret numeric path segments as array indices, which may cause unexpected results when inserting arbitrary values, eg

        set(store, 'users.5.name', 'Kwan') // store.users.length --> 6

If this is an issue, consider:

{% highlight js linenos %}
function rget(obj, paths){
  const [head, ...tail] = paths
  if (typeof obj[head] == 'object' && tail.length) {
    return rget(obj[head], tail)
  } else {
    return obj[head]
  }
}
function rset(obj, paths, val){
  const [head, ...tail] = paths
  if (tail.length) {
    obj[head] = typeof obj[head] == 'object' ? obj[head] : {}
    return rset(obj[head], tail, val)
  } else {
    obj[head] = val
  }
}
function get(obj, path){
  return rget(obj, path.split('/'))
}
function set(obj, path, val){
  return rset(obj, path.split('/'), val)
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
