---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-22T19:00:20+00:00"
guid: http://erikeldridge.wordpress.com/?p=291
parent_post_id: null
post_id: "291"
tags:
  - e4x
  - javascript
  - xml
title: 'playing with e4x in firefox: loading arbitrary xml as an e4x-ready object'
url: /2009/05/22/playing-with-e4x-in-firefox-loading-arbitrary-xml-as-an-e4x-ready-object/

---
\[sourcecode language='javascript'\]

/\*
ref: https://developer.mozilla.org/en/Core\_JavaScript\_1.5\_Guide/Processing\_XML\_with\_E4X
prereq: firefox w/ firebug installed and a server running php w/ simplexml
usage:
1) put this code in an php file
2) upload this file to your server
3) run it in firefox
4) look for output in console
\*/
var xml = new XML(
 <?php
 $url = 'http://query.yahooapis.com/v1/public/yql?q=show%20tables&format=xml';
 $sxml = simplexml\_load\_file($url);
 //strip off the xml declaration because the javascript XML() object expects raw xml
 echo str\_replace('', '', $sxml->asXML());
 ?>
);
console.log(xml);

\[/sourcecode\]
