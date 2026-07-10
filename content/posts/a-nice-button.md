---
_edit_last: "5360656"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2011-06-05T09:10:06+00:00"
guid: http://erikeldridge.wordpress.com/?p=1231
parent_post_id: null
post_id: "1231"
tags:
  - css3
title: A nice button
url: /2011/06/05/a-nice-button/

---
\[sourcecode lang="css"\]
input\[type=submit\] {

 font-size: inherit;

 padding: 0.5ex 1ex;
 margin: 0;

 border: 1px solid #ccc;

 /\\* http://border-radius.com/ \*/
 -webkit-border-radius: 4px;
 -moz-border-radius: 4px;
 border-radius: 4px;

 /\\* http://www.colorzilla.com/gradient-editor/ \*/
 background: #ffffff; /\* Old browsers \*/
 background: -moz-linear-gradient(top, #ffffff 0%, #cccccc 100%); /\* FF3.6+ \*/
 background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffffff), color-stop(100%,#cccccc)); /\* Chrome,Safari4+ \*/
 background: -webkit-linear-gradient(top, #ffffff 0%,#cccccc 100%); /\* Chrome10+,Safari5.1+ \*/
 background: -o-linear-gradient(top, #ffffff 0%,#cccccc 100%); /\* Opera11.10+ \*/
 background: -ms-linear-gradient(top, #ffffff 0%,#cccccc 100%); /\* IE10+ \*/
 filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#cccccc',GradientType=0 ); /\* IE6-9 \*/
 background: linear-gradient(top, #ffffff 0%,#cccccc 100%); /\* W3C \*/
}
\[/sourcecode\]
