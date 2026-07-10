---
_edit_last: "5360656"
_wp_old_slug: playing-with-e4x-in-firefox-asynchronously-loading-arbitrary-xml
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-22T05:50:59+00:00"
guid: http://erikeldridge.wordpress.com/?p=287
parent_post_id: null
post_id: "287"
tags:
  - e4x
  - javascript
  - xml
title: 'playing with e4x in firefox: asynchronously loading arbitrary xml as an e4x-ready object'
url: /2009/05/21/playing-with-e4x-in-firefox-asynchronously-loading-arbitrary-xml-as-an-e4x-ready-object/

---
\[sourcecode language='javascript'\]

/\*
ref: https://developer.mozilla.org/en/Core\_JavaScript\_1.5\_Guide/Processing\_XML\_with\_E4X
ref: http://bit.ly/IbKMB
prereq: firefox w/ firebug installed and a server running php w/ simplexml
note: i'm using a server-side proxy so we can easily make requests to an arbitrary domain
usage:
1) put this code in an php file called 'proxy.php' (or whatever, but make sure the url in the javascript matches)
2) upload this file to your server
3) run it in firefox
4) look for output in console
\*/

<?php if($\_GET\['run'\]){//wait to run until javascript loads and recursively makes a request to this file
 $url = 'http://query.yahooapis.com/v1/public/yql?q=show%20tables&format=xml';//arbitrary xml
 $sxml = simplexml\_load\_file($url);//just an easy way to request xml
 //strip off the xml declaration because the javascript XML() object expects raw xml
 echo str\_replace('', '', $sxml->asXML());
}else{//on initial load, output the html/javascript
?>

var callback = function (text) {
 var xml = new XML(text);//convert text to an e4x-ready xml object
 console.log(xml);
 },
 url = 'proxy.php?run=true',
 req = new XMLHttpRequest();

req.open('GET', url, true);
req.onreadystatechange = function () {
 if (req.readyState == 4 && req.status == 200) {
 callback(req.responseText);//load up xml from proxy as text
 }
};
req.send(null);

\[/sourcecode\]
