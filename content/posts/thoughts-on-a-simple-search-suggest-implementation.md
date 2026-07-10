---
_edit_last: "5360656"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2011-01-06T20:44:06+00:00"
guid: http://erikeldridge.wordpress.com/?p=1039
parent_post_id: null
post_id: "1039"
title: Thoughts on a simple search suggest implementation
url: /2011/01/06/thoughts-on-a-simple-search-suggest-implementation/

---
Preamble:
Most search engines will suggest search terms as you're typing. For example, if I type "appleipod" on yahoo.com, it suggests "apple ipod", "apple new ipod phone", "apple ipod nano", etc.

![Screen shot of Yahoo! search suggest results](/wp-content/uploads/2011/01/screen-shot-2011-01-06-at-11-54-31-am.png)

Problem:
You are given an input string "appleipod" and a hash table of search terms { ... "apple ipod", "apple new ipod phone", "apple ipod nano" ... }. The table could contain 50,000 terms. How would you write a function to resolve the input string to least one suggestion?

**Approach 1:**
A couple approaches came to mind immediately: 1) search for "search suggestion algorithm", as this is a solved problem; 2) iterate through the table performing regular expression tests on each entry, which would be slow, but simple.

Since the point is to come up with a solution from scratch that simply produces a suggestion, I started thinking about option two and came up with the following:

\[sourcecode lang="javascript"\]
function suggest ( input, dictionary ) {
 var suggestions = \[\];
 for ( var term in dictionary ) {
 var regexp = new RegExp( "(.\*)" + term + "(.\*)" );
 if ( regexp.test( input ) ) {
 suggestions.push( term );
 }
 }
 return suggestions;
}
\[/sourcecode\]

Running `suggest( "appleipod", {"apple":true, "apple ipod":true, "a":true, "app":true} );` would match "a", "app", and "apple" in "appleipod". It wouldn't match "appleipod" to "apple ipod", but the goal was just to suggest something, so it passes.

Another person suggested a different approach, **Approach 2:**

We can take advantage of the random access features of the hash table by iterating through the input string, character by character, checking to see if there's an entry in the hash table:

\[sourcecode lang="javascript"\]
function suggest ( input, dictionary ) {
 var suggestions = \[\];
 var suggestion = '';
 for ( var i = 0; i < input.length; i++ ) {
 suggestion += input\[i\];
 if ( dictionary\[ suggestion \] ) {
 suggestions.push( suggestion );
 }
 }
 return suggestions;
}
\[/sourcecode\]

That this would suggest "a", "app", and "apple" for "appleipod", so it meets the requirements and is a much faster option.

As an Approach 3, I wonder is there's a way to do hash/regex look up, i.e., dictionary\[ regex \], so we could match any dictionary term containing the string "apple". Sounds like another problem to think about ;)

**Update (1/6/11)**

Hold on. Neither Approach 1 or 2 satisfy the requirement of returning at least one suggestion given a table such as { ... "apple ipod", "apple new ipod phone", "apple ipod nano" ... }. What we should be testing is `suggest( "appleipod", {"noise":true, "apple ipod":true, "apple new ipod phone": true, "apple ipod nano": true, "more noise": true} );` and verifying that it returns at least one of the target terms, e.g., "apple ipod". So, let's modify Approach 2 to sequentially introduce a space in between segments of the input, i.e., "appleipod" --> "a ppleipod", "ap pleipod", etc., instead of testing character by character.

Let's leave Approach 3 unsolved for now, and call this **Approach 4:**

\[sourcecode lang="javascript"\]
function suggest ( input, dictionary ) {
 var suggestions = \[\];

 //the 1st suggestion would have a leading space, which is a bit strange so skip ahead
 var suggestion = input;
 for ( var i = 1; i < input.length; i++ ) {

 if ( dictionary\[ suggestion \] ) {
 suggestions.push( suggestion );
 }
 suggestion = input.substring(0, i) + ' ' + input.substr(i);
 }
 return suggestions;
}
\[/sourcecode\]
