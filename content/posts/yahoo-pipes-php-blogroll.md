---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2008-11-23T20:07:48+00:00"
guid: http://erikeldridge.wordpress.com/?p=143
parent_post_id: null
post_id: "143"
title: Yahoo! Pipes + PHP = blogroll
url: /2008/11/23/yahoo-pipes-php-blogroll/

---
motivation:
I have a bunch of services that output rss feeds. I want to consolidate all the feeds into a single feed, but let an external service handle the overhead of the consolidation, i.e. fetching, caching, etc. Then, I want to display the data in a readable way.

intended audience:

- some experience w/ PHP
- very little experience w/ Yahoo! Pipes

solution:

- see my [blogroll](http://pipes.yahoo.com/pipes/pipe.info?_id=gIBkHK_V3RGpmv5oBRNMsA "blogroll") pipe in Y! Pipes
- PHP source code below

notes:

- While you're at Pipes, search for "blogroll" to see how others solved the problem

\[sourcecode lang="PHP"\]

//fn to generate readable estimation of pub date
// @credit: http://www.php.net/manual/en/function.time.php#85481
function elapsed\_time($date, $show\_less\_than\_a\_minute = false) {
 $seconds = round(abs(time() - strtotime($date)));
 $minutes = round($seconds / 60);

 if ( $minutes <= 1 ) {
 if ( !$showLessThanAMinute ) {
 return ($minutes == 0) ? '< 1 min. ago' : '1 min. ago';
 } else {
 if ( $seconds < 5 ) {
 return 'less than 5 sec. ago';
 }
 if ( $seconds < 10 ) {
 return '< 10 sec. ago';
 }
 if ( $seconds < 20 ) {
 return '< 20 sec. ago';
 }
 if ( $seconds < 40 ) {
 return '~ 30 sec. ago';
 }
 if ( $seconds < 60 ) {
 return 'less than a min. ago';
 }

 return '1 min. ago';
 }
 }
 if ( $minutes < 45 ) {
 return $minutes . ' min. ago';
 }
 if ( $minutes < 90 ) {
 return '1 hr. ago';
 }
 if ( $minutes < 1440 ) {
 return round(floatval($minutes) / 60.0) . ' hr. ago';
 }
 if ( $minutes < 2880 ) {
 return '1 day ago';
 }
 if ( $minutes < 43200 ) {
 return round(floatval($minutes) / 1440) . ' days ago';
 }
 if ( $minutes < 86400 ) {
 return '1 mo. ago';
 }
 if ( $minutes < 525600 ) {
 return round(floatval($minutes) / 43200) . ' mo. ago';
 }
 if ( $minutes ' . round(floatval($minutes) / 525600) . ' yr. ago';
}

//def fn for sorting items in rss
function reverse\_cmp\_pub\_dates($obj1, $obj2)
{
 $time1 = strtotime($obj1->pubDate);
 $time2 = strtotime($obj2->pubDate);

 if($time1 == $time2)
 {
 return 0;
 }
 elseif($time1 > $time2)
 {
 return -1;
 }
 else
 {
 return 1;
 }
}

//load y! pipes pre-consolidated data
$feed = 'http://pipes.yahoo.com/pipes/pipe.run?\_id=gIBkHK\_V3RGpmv5oBRNMsA&\_render=rss';
$sxml = simplexml\_load\_file($feed);

//extract items array
$items = $sxml->channel->item;

//sort by pub date
usort($items, 'reverse\_cmp\_pub\_dates');

//pattern for determining origin (see below)
$pattern = '@.\*(?flickr\|upcoming\|delicious\|wordpress).\*@i';

foreach($items as $item)
{
 //determine origin
 preg\_match($regex, $item->guid, $matches);
 $host\_name = strtolower($matches\['host'\]);

 switch($host\_name)
 {
 case 'flickr':

 $img\_html = substr($item->description, strpos($item->description, ''));//trim trailing html

 $host\_url = 'http://www.flickr.com/photos/erikeldridge/';
 break;

 case 'upcoming':
 $desc = substr($item->description, 0, 100);
 $host\_url = 'http://upcoming.yahoo.com/user/283279/';
 break;

 case 'delicious':
 $desc = $item->description;
 $host\_url = 'http://delicious.com/erikeldridge';
 break;

 case 'wordpress':
 $desc = $item->description;
 $host\_url = '/';
 break;

 default:
 }

 $data\_arr\[\] = array(
 'host' => array(
 'url' => $host\_url,
 'name' => $host\_name
 ),
 'item' => array(
 'desc' => $desc,
 'title' => $item->title,
 'date' => elapsed\_time($item->pubDate),
 'link' => $item->link,
 )
 );
}

//to display, loop through data\_arr and print contents
\[/sourcecode\]
