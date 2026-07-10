---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2008-12-31T06:54:05+00:00"
guid: http://erikeldridge.wordpress.com/?p=190
parent_post_id: null
post_id: "190"
tags:
  - curl
  - multicurl
  - php
title: php multi-curl util
url: /2008/12/30/multi-curl-util/

---
motivation:
\- simplify code by using a common method for making single- or multi-curl requests

usage:
\- create a file, e.g. "curl.inc", on your server and copy the code below w/ comment "multi curl util" into it
\- create another file, e.g. "curl\_test.php", on your server and copy the code below w/ comment "test" into it
\- browse to yourdomain.com/yourpath/curl\_test.php
\- comment-out or -in the various examples in the test code to see some common use cases

notes:
\- only get and post are supported
\- if you see a way to improve the code, please leave a comment.

\[sourcecode language="php"\]
 $v){
 $pairs\[\] = "$k=$v";
 }
 $param\_str = implode('&', $pairs);
 $url .= '?'.$param\_str;
 //set options
 $options = array(
 CURLOPT\_URL => $url,
 CURLOPT\_HEADER => false,
 CURLOPT\_RETURNTRANSFER => true
 );
 curl\_setopt\_array($ch, $options);
 return $ch;
}

function create\_post\_handle($url, $params){
 $ch = curl\_init();
 //format params
 foreach($params as $k => $v){
 $pairs\[\] = "$k=$v";
 }
 $params = implode('&', $pairs);
 //set options
 $options = array(
 CURLOPT\_URL => $url,
 CURLOPT\_POST=> true,
 CURLOPT\_POSTFIELDS => $params,
 CURLOPT\_RETURNTRANSFER => true,
 );
 curl\_setopt\_array($ch, $options);
 return $ch;
}

function curl($requests){
 $mh = curl\_multi\_init();
 //prep each request
 foreach($requests as $index => $request){
 switch($request\['method'\]){
 case 'post':
 $chs\[$index\] = create\_post\_handle($request\['url'\], $request\['params'\]);
 break;
 case 'get':
 $chs\[$index\] = create\_get\_handle($request\['url'\], $request\['params'\]);
 break;
 }
 curl\_multi\_add\_handle($mh,$chs\[$index\]);
 }
 //credit: http://www.phpied.com/simultaneuos-http-requests-in-php-with-curl/
 // execute the handles
 $running = null;
 do {
 curl\_multi\_exec($mh, $running);
 } while($running > 0);
 // get content and remove handles
 foreach($chs as $index => $ch) {
 $results\[$index\] = curl\_multi\_getcontent($ch);
 curl\_multi\_remove\_handle($mh, $ch);
 }
 // all done
 curl\_multi\_close($mh);
 return $results;
}
\[/sourcecode\]

\[sourcecode language="php"\]
<?php
//test
if($\_REQUEST){//if a request has been made, return request details
 echo '

request method: '.$\_SERVER\['REQUEST\_METHOD'\].'  
';
echo 'request uri: '.$\_SERVER\['REQUEST\_URI'\].'  
';
echo 'request vars: '.print\_r($\_REQUEST, true).'

';
 exit();
}

require('curl.inc');
$url = 'http://'.$\_SERVER\['SERVER\_NAME'\].$\_SERVER\['SCRIPT\_NAME'\];//have script call itself

/\*
//single get
$requests\[\] = array(
 'method' => 'get',
 'url' => $url,
 'params' => array('x' => 'y')
);
/\*\*/

/\*
//single post
$requests\[\] = array(
 'method' => 'post',
 'url' => $url,
 'params' => array(
 'x' => 'y',
 'a' => 'b',
 )
);
/\*\*/

/\*
//multi get
$requests\[\] = array(
 'method' => 'get',
 'url' => $url,
 'params' => array('x' => 'y')
);
$requests\[\] = array(
 'method' => 'get',
 'url' => $url,
 'params' => array('x' => 'y')
);
/\*\*/

/\*
//multi post
$requests\[\] = array(
 'method' => 'post',
 'url' => $url,
 'params' => array(
 'x' => 'y',
 'a' => 'b',
 )
);
$requests\[\] = array(
 'method' => 'post',
 'url' => $url,
 'params' => array(
 'x' => 'y',
 'a' => 'b',
 )
);
/\*\*/

//multi w/ get & post
$requests\[\] = array(
 'method' => 'get',
 'url' => $url,
 'params' => array('x' => 'y')
);
$requests\[\] = array(
 'method' => 'post',
 'url' => $url,
 'params' => array(
 'x' => 'y',
 'a' => 'b',
 )
);
/\*\*/

$results = curl($requests);
var\_dump($results);
\[/sourcecode\]
