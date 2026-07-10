---
_edit_last: "5360656"
_oembed_61e917b8c0a8579c315fbdd5d71c10c4: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-12-24T10:51:56+00:00"
guid: http://erikeldridge.wordpress.com/2009/12/24/dav-glass-yql-module-for-yui-3-is-awesome/
image_size: ""
parent_post_id: null
post_id: "484"
tags:
  - davglass
  - yql
  - yui
title: Dav Glass' YQL module for YUI 3 is awesome
url: /2009/12/24/dav-glass-yql-module-for-yui-3-is-awesome/

---
sample app:

\[sourcecode lang="html"\]

<ul>
 <li><img/></li>
</ul>
<script type="text/javascript" src="http://yui.yahooapis.com/3.0.0/build/yui/yui-min.js"></script>
<script type="text/javascript" src="http://github.com/davglass/yui-yql/raw/master/yql-min.js"></script>
<script>
//ref: http://davglass.github.com/yui-yql/
YUI().use('yql', 'node', function(Y) {
 var q1 = new Y.yql('select source from flickr.photos.sizes where photo\_id in (select id from flickr.photos.search where text="panda" and safe\_search="true")');
 q1.on('query', function(r) {
 var li = Y.get('li');
 for (var i = 0; i < r.results.size.length; i++) {
 if (-1 !== r.results.size\[i\].source.indexOf('\_s')) {
 var clone = li.cloneNode(true);
 clone.query('img').set('src', r.results.size\[i\].source);
 Y.get('ul').append(clone);
 }
 }

 });

});
</script>
\[/sourcecode\]
**Update 12/13/10** YUI 3 now supports YQL natively: [http://developer.yahoo.com/yui/3/yql/](http://developer.yahoo.com/yui/3/yql/ "YQL module documentation on YDN")
