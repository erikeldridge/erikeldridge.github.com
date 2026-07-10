---
_edit_last: "5360656"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-02-18T09:49:34+00:00"
guid: http://erikeldridge.wordpress.com/?p=771
parent_post_id: null
post_id: "771"
tags:
  - ruby
  - yql
title: Ruby YQL utility function example
url: /2010/02/18/ruby-yql-utility-function-example/

---
I can't tell whether it's YQL, Ruby, or my lil'[YQL utility function](/2010/02/18/1st-attempt-at-a-ruby-yql-utility-function/), but I'm having fun. Here's an example of usage:
\[sourcecode lang="ruby"\]
json = yql(%{
 use 'http://www.datatables.org/github/github.repo.xml' as github;
 select \* from github where id = 'yql' and repo = 'yql-tables'
})
\[/sourcecode\]

Dig the multiline string syntax (inspiration: [benschwarz's Smoke gem](http://github.com/benschwarz/smoke/blob/master/examples/yql_web_search.rb)). YQL allows POST requests for select statements (to work around URL-length limits), so I can continue to use POST for everything :)
