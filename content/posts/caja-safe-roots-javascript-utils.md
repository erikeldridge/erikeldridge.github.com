---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-02-22T21:12:43+00:00"
guid: http://erikeldridge.wordpress.com/?p=226
parent_post_id: null
post_id: "226"
tags:
  - javascript
title: caja-safe roots javascript utils
url: /2009/02/22/caja-safe-roots-javascript-utils/

---
\[sourcecode language="javascript"\]
var foreach = function(collection, callback){//tested: ff 3 mac
 if(collection.length){//array or node list
 for(var i = 0; i < collection.length; i++){
 callback(i, collection\[i\]);
 }
 }else if(collection.hasOwnProperty){
 for(var key in collection){
 if(collection.hasOwnProperty(key)){
 callback(key, collection\[key\]);
 }
 }
 }else{
 throw('each() error: collection (' + collection + ') is neither an array nor an object');
 }
},
getElementsByClassName = function(elements, className){
 var nodes = \[\];
 foreach(elements, function(i,element){
 if(className === element.className){
 nodes.push(element);
 }
 });
 return nodes;
},
hasClass = function(node, className){//tested: ff 2/3 win/mac, ie 6/7 win
 return new RegExp('\[\\b\]\*' + className + '\[\\b\]\*').test(node.className);
},
\[/sourcecode\]
