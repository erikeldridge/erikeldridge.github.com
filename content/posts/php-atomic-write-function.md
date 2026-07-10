---
_edit_last: "5360656"
_oembed_55ddb62cd1d072ba387c8e2c5d194626: '{{unknown}}'
_oembed_6356f501339b27d056a2f43c09b4658a: '{{unknown}}'
_oembed_be48a608f2d3e02926e6997c5354693f: '{{unknown}}'
_oembed_dd6c58fe51b84ca87c9a8d96ac0d7a0d: '{{unknown}}'
_oembed_e44516eae7cc5e8655eea4a8734f9db3: '{{unknown}}'
_oembed_fa5d9115a348a646e3a8defd616ad8f8: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2008-10-26T01:58:12+00:00"
guid: http://erikeldridge.wordpress.com/?p=123
parent_post_id: null
post_id: "123"
tags:
  - code-php
title: PHP atomic write function
url: /2008/10/26/php-atomic-write-function/

---
Motivation:

An atomic write function for those who appreciate the convenience of [file\_put\_contents()](http://us.php.net/file_put_contents "file_put_contents()"), but need an atomic operation.  Please leave a comment if you have a more convenient and/or efficient solution.

**Update** (5/31/11):

Now using [flock](http://php.net/manual/en/function.flock.php "php.net documentation for flock"), as recommended by Petr and Hayden in their comments below, to avoid race condition. Thanks for the help!

Source code:

\[sourcecode language="php"\]

function atomic\_put\_contents($filename, $data)
{
 // Copied largely from http://php.net/manual/en/function.flock.php
 $fp = fopen($filename, "w+");
 if (flock($fp, LOCK\_EX)) {
 fwrite($fp, $data);
 flock($fp, LOCK\_UN);
 }
 fclose($fp);
}

\[/sourcecode\]

Example usage:

\[sourcecode language="php"\]

$content = 'some content';

atomic\_put\_contents('path/file.ext', $content);

//creates file called path/file.ext containing 'some content'

\[/sourcecode\]
