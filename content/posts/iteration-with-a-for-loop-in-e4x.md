---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-22T03:14:16+00:00"
guid: http://erikeldridge.wordpress.com/?p=271
parent_post_id: null
post_id: "271"
tags:
  - e4x
  - javascript
  - xml
title: 'playing with e4x in firefox: iteration with a for loop'
url: /2009/05/21/iteration-with-a-for-loop-in-e4x/

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
for (var i = 0; i < xml.children.child.length(); i++) {//note: 'parent' is not the root var name
 console.log(xml.children.child\[i\].@name);
}

\[/sourcecode\]
