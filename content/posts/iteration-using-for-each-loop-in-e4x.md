---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-22T03:16:49+00:00"
guid: http://erikeldridge.wordpress.com/?p=274
parent_post_id: null
post_id: "274"
tags:
  - e4x
  - javascript
  - xml
title: 'playing with e4x in firefox: iteration using for-each loop'
url: /2009/05/21/iteration-using-for-each-loop-in-e4x/

---
\[sourcecode language='html'\]

/\*
ref: https://developer.mozilla.org/en/Core\_JavaScript\_1.5\_Guide/Processing\_XML\_with\_E4X
ref: http://bit.ly/y8udj
prereq: firefox w/ firebug installed
1) put this code in an html file
2) run it in firefox
3) look for output in console
\*/
var xml =

;
for each (var child in xml.children.child) {
 console.log(child.@name);
}

\[/sourcecode\]
