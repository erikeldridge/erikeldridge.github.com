---
_edit_last: "5360656"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2011-01-19T07:22:17+00:00"
guid: http://erikeldridge.wordpress.com/?p=1074
parent_post_id: null
post_id: "1074"
tags:
  - algorithm
  - breadth-first-search
  - javascript
title: children of the node
url: /2011/01/18/children-of-the-node/

---
Suppose you'd like to traverse through a family tree in JavaScript, printing each generation of children on a single line. Why? Who knows, but lets suppose you're so possessed by the idea that you're losing sleep over it.

The tree looks like this:

```
             0

             |

     1       -       2

     |                 |

3    -    4            -    6
```

The correct output would look like this:

0

1 2

3 4 6

This sounds a lot like a [breadth-first search](http://en.wikipedia.org/wiki/Breadth-first_search "Wikipedia's article on breadth-first search") to me, but let's forget for a moment that Wikipedia exists and think through this.

A verbal walk-through of the problem might sound like this:

1. Visit root node
1. Print root node and <br> tag
1. Print all the children of the root node and another <br> tag
1. Print all the children of each child node and another <br> tag ...

Ok, that's a mess.  Seems like recursion might help simplify things, but then I'd end up with a stack-based traversal due to the call stack, an idea I find amazing.  But what I want is something more like a queue; first in, first out; root in, root out, children in children out, children's children in, children's children out ... breath in, breath out.  I feel like I'm in yoga class.  So soothing.  Here's a Buddha by a koi pond:

\[caption id="" align="alignnone" width="488" caption="golden buddha by Paul Moody"\] [!["goldie the fish is blessed by the garden buddha"](http://farm4.static.flickr.com/3069/2643473715_4491d4ca53.jpg)](http://www.flickr.com/photos/paulmoody/2643473715/)\[/caption\]

Verbal walk through part deux:

1. Enqueue root node
1. Dequeue node, print, and enqueue each child of the node
1. Repeat from step 2

Supposing we have a queue, Q.  We can depict the tree, T, in code like this:

\[sourcecode lang="javascript"\]
var T = \[
 { left: 1, right: 2 },
 { left: 3, right: 4 },
 { left: null, right: 6 },
 { left: null, right: null },
 { left: null, right: null },
 { left: null, right: null },
 { left: null, right: null }
\];
\[/sourcecode\]

Following the second approach, we'd get

1. Q = \[node 0\]
1. "node 0", Q = \[node 1, node 2\]
1. "node 1", Q = \[node 2, node 3, node 4\]
1. "node 2", Q = \[node 3, node 4, node 6\]
1. "node 3", Q = \[node 4, node 6\]
1. "node 4", Q = \[node 6\]
1. "node 6"

which would be correct, but the line breaks are off.  We need to print all the children of a generation before printing a line break.

Verbal walk through take three:

1. Enqueue root node
1. While there are nodes in the queue, dequeue node, print node, and enqueue children of the node
1. Print a line break
1. Repeat from step 2

Following the third approach, we'd get

1. Q = \[node 0\]
1. "node 0", Q = \[node 1, node 2\]
1. "node 1 node 2", Q = \[node 3, node 4, node 6\]
1. "node 3, node 4, node 6", Q = \[\]

That's it!  Nice.  Here's some code:

\[sourcecode lang="javascript"\]
function printTree(tree){

 var queue = \[\];

 // enqueue root
 queue.push( 0 );

 do {

 var len = queue.length;

 // for each node in the queue
 for( var i = 0; i < len; i++ ){

 // dequeue
 var index = queue.shift();

 // print node
 document.writeln( index );

 var node = tree\[ index \];

 // enqueue children of the node
 if( node.left ) {
 queue.push( node.left );
 }
 if( node.right ) {
 queue.push( node.right );
 }

 }

 // print a line break
 document.writeln("<br>");

 // repeat
 } while( 0 !== queue.length );

}

// run it
printTree(T);
\[/sourcecode\]
