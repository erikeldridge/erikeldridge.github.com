---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2008-12-20T04:09:12+00:00"
guid: http://erikeldridge.wordpress.com/?p=186
parent_post_id: null
post_id: "186"
tags:
  - framework
  - php
  - rest
title: mini RESTful interface framework
url: /2008/12/20/mini-restful-interface-framework/

---
usage:

- build out function stubs
- put up on server

\[sourcecode language="php"\]
<?php
function handle\_get($uri, $params){

}
function handle\_post($uri, $params){

}
function handle\_put($uri){

}
function handle\_delete($uri){

}
switch($\_SERVER\['REQUEST\_METHOD'\]){
 case 'GET':
 handle\_get($\_SERVER\['REQUEST\_URI'\], $\_GET);
 break;
 case 'POST':
 handle\_post($\_SERVER\['REQUEST\_URI'\], $\_POST);
 break;
 case 'PUT':
 handle\_put($\_SERVER\['REQUEST\_URI'\]);
 break;
 case 'DELETE':
 handle\_delete($\_SERVER\['REQUEST\_URI'\]);
 break;
 default:
}
\[/sourcecode\]
