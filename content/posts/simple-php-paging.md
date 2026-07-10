---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-01-11T08:35:18+00:00"
guid: http://erikeldridge.wordpress.com/?p=197
parent_post_id: null
post_id: "197"
tags:
  - paging
  - php
title: simple php paging
url: /2009/01/11/simple-php-paging/

---
motivation:
to create a simple template for paging through a group of items

usage:
copy the code below into a file, put it on yo' server, eg pager.php, and start hitting it in the browser. For example, a good place to start is example.com/pager.php?page=1

notes:
in the interest of simplicity, the code assumes you won't request more items than exist in the array. If you do, eg page = 5, at 5 items per page, when you only have 10 items in the array, you'll get funky behavior. If you want to handle this case, check for the existence of items in the html template html.

\[sourcecode language="php"\]
<?php
$items = array(1,2,3,4,5,6,7,8,9,10,11,12);
$limit = 5;

$qty\_items = count($items);
$qty\_pages = ceil($qty\_items / $limit);

$curr\_page = isset($\_GET\['page'\]) ? $\_GET\['page'\] : 1;
$next\_page = $curr\_page 1 ? $curr\_page - 1 : null;

$offset = ($curr\_page - 1) \* $limit;
$items = array\_slice($items, $offset, $limit);

?>

.curr{
 border:1px solid #ddd;
 padding:3px;
}

 <a href="pager.php?page="> <<

<? for($i = 1; $i
 <a href="pager.php?page=" class="">

 <a href="pager.php?page="> >>

\[/sourcecode\]
