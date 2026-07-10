---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-22T03:06:02+00:00"
guid: http://erikeldridge.wordpress.com/?p=264
parent_post_id: null
post_id: "264"
tags:
  - e4x
  - javascript
  - xml
title: 'playing with e4x in firefox: working with variables'
url: /2009/05/21/playing-with-e4x-in-firefox-working-with-variables/

---
\[sourcecode language='javascript'\]

/\*
ref: https://developer.mozilla.org/en/Core\_JavaScript\_1.5\_Guide/Processing\_XML\_with\_E4X
ref: http://bit.ly/y8udj
prereq: firefox w/ firebug installed
1) put this in an html file and run it in firefox:
2) look for the output in the firebug console
\*/
var h = 'html';
var text = "Here's some text";
var doc = {text};
console.log(doc);

\[/sourcecode\]
