---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2008-10-09T07:25:35+00:00"
guid: http://erikeldridge.wordpress.com/?p=4
parent_post_id: null
post_id: "4"
tags:
  - pipes
  - tutorial
  - yahoo
title: building an RSS consolidator w/ Yahoo! Pipes
url: /2008/10/09/building-an-rss-consolidator-w-yahoo-pipes/

---
Goal:

Consolidate the feeds from my Flickr, Wordpress, Del.icio.us, etc accounts

Solution:

Use Yahoo! Pipes

Intended Audience:

Pipes newbies

Steps:

Create a pipe

1. Go to http://pipes.yahoo.com and log in, or create an account if you don't already have one
1. Click the "Create a pipe" button
1. In the editor, click and drag a "Fetch Feed" object onto the stage
1. Open a new browser tab or window, head over to http://flickr.com/, and log in, or create an account
1. Click on the "Your photostream" link to view your photostream
1. Scroll to the bottom of the page and copy the "Latest" RSS feed URL
1. Switch back to the Pipes editor and paste the Flickr URL into the text field in the "Fetch Feed" object on the stage
1. On the bottom on the "Fetch Feed" object, there is a circular attachment point.  Click on it an drag to start forming a new pipe
1. Drag the pipe to the attachment point on top of the "Pipe Output" object at the bottom of the stage.
1. Release the pipe when the "Pipe Output" attachment point glows.
1. Click the "Save" button to name and save your new pipe
1. Click the "Back to my Pipes" link next to the save button
1. Click on the name of your pipe in the list of your pipes.  This will display the output of your pipe.
1. Click the "More Options" link and then "Get as RSS" in the drop-down.  This will open the RSS feed in your browser if you're using Safari or Firefox.

Build page

1. Following an example from Rasmus Lerdorf's Open Hack talk (http://talks.php.net/show/hack08/8), use simplexml to parse the RSS feed:

\[sourcecode language='php'\]
<?php
$url = '';
//e.g. http://pipes.yahoo.com/pipes/pipe.run?\_id=gIBkHK\_V3RGpmv5oBRNMsA&\_render=rss
$xml = simplexml\_load\_file($url);
$num\_items = count($xml->channel->item);
for($i = 0; $i channel->item\[$i\]->title;
$date = $xml->channel->item\[$i\]->pubDate;
$desc = $xml->channel->item\[$i\]->description;
$link = $xml->channel->item\[$i\]->link;

echo "

";
echo "

### [$title]($link)

";
echo "$date";
echo "$desc";
echo "

";
}
\[/sourcecode\]

1. Go back to the browser tab displaying the output from your pipe and copy the URL
1. Paste this URL into your index.php file as the value for the variable "$url"
1. Change the beginning of the URL from 'feed://...' to 'http://...'
1. Load your page and you should see the output defined above.  Note: var\_dump the '$xml' object to see the other available fields.

Extend pipe

1. Back in the Pipes editor, drag another "Fetch Feed" object onto the stage
1. Copy and paste another RSS feed into it
1. From under the "Operators" heading in the list on the left, drag out a "Union" object
1. Run the pipes from the two "Fetch Feed" objects into the union and pipe the output to the "Pipe Output" object
1. To add more feeds, drag out additional "Fetch Feed" objects and connect them to the union
