---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-22T03:35:37+00:00"
guid: http://erikeldridge.wordpress.com/?p=276
parent_post_id: null
post_id: "276"
tags:
  - e4x
  - javascript
  - xml
title: 'playing with e4x in firefox: iteratively appending xml elements'
url: /2009/05/21/playing-with-e4x-in-firefox-iteratively-appending-xml-elements/

---
\[sourcecode language='javascript'\]

/\*
ref: https://developer.mozilla.org/en/Core\_JavaScript\_1.5\_Guide/Processing\_XML\_with\_E4X
ref: http://bit.ly/14GnLT
prereq: firefox w/ firebug installed
note: if there is no pre-existing 'child' element, using '+=' operator will append 'child' to 'parent', not 'children'
1) put this code in an html file
2) run it in firefox
3) look for output in console
\*/
var names = \['julio','juan','jose'\],
 xml =

 ;
for(var i = 0; i < names.length; i++) {
 //check for pre-existing 'child'
 if(xml.children.child){//if there, append
 xml.children.child += ;
 }else{//create initial 'child' element
 xml.children.child = ;
 }
}
console.log(xml);

\[/sourcecode\]
