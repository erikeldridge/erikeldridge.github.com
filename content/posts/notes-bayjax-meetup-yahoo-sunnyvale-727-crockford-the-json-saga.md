---
_edit_last: "5360656"
_oembed_8c1475b0f6a3f770be082c794d83cb4a: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-07-28T16:30:25+00:00"
guid: http://erikeldridge.wordpress.com/?p=379
parent_post_id: null
post_id: "379"
tags:
  - bayjax
  - crockford
  - douglas-crockford
  - json
  - yahoo
title: 'notes: Bayjax Meetup @ Yahoo! Sunnyvale (7/27): Crockford "The JSON Saga"'
url: /2009/07/28/notes-bayjax-meetup-yahoo-sunnyvale-727-crockford-the-json-saga/

---
\[caption id="" align="aligncenter" width="500" caption="Douglas Crockford talking about "The JSON Saga""\] [![Douglas Crockford describing The JSON Saga](http://farm3.static.flickr.com/2578/3765516635_decae5dfd5.jpg)](http://www.flickr.com/photos/erikeldridge/3765516635/)\[/caption\]

notes from Bayjax Meetup: [http://www.meetup.com/BayJax/calendar/108524](http://www.meetup.com/BayJax/calendar/10852424/)

Doug Crockford on the json saga

\- json already existed in nature, but crockford discovered it

\- it wwas being used at netscape in he form of array literals in communication 5 yrs before crockford discovered it

\- crockford's first transmission used js embedded in html in a frame for cross-browser compatability

\- they set document.domain to get around the same origin policy

\- backslashes are tolerated in json so we can put html in json

\- original name was JSML, but that conflicted w/ a pre-existing java protcol

\- json's good for interserver and db applications

\- some of his customers balked at usage because it wasn't standard, so crockford put up a website to standardize it

\- json is the intersection of modern programming languages

\-\- simple values

\-\- sequence of values

\-\- collection of named values

\-\- an intersection is easier to find than a union

\- js is brilliant for state machines

\- most ppl implement json parsers using eval, but this must be guarded by regex to valiudate the json, which slows it doen

\- the latest version of ecma script implements a native JSON.parse, which is ver fast

\- ajax was an important influence on json uptake

\- improvements

\-\- strip comments

\-\-\- comments broke the parser

\-\-\- comment parsing greatly increased complexity

\-\-\- alignment w/ yaml

\-\- added e notation to numnbers

\- no version number

\-\- everything's crap until 3.0, but we avoid this by not having version numbers

\-\- perhaps someday it will be replaced

\-\- at least one piece of the stack will remain constant forever

\- minimalism

\-\- can fit on the back of a business card

\- influences

\-\- lisp s-expressions

\-\-\- perhaps the greatest influence

\-\- rebol

\-\-\- al built upon a represenation of data, which is then executable

\-\-\- rebol is a brilliant language

\-\- JS, Python, NewtonScript

\-\-\- Brendon Ike is a brilliant guy, so it's no accident that it has brilliant aspects

\-\-\- all were developed in isolation at the same time

\-\- NeXT

\-\-\- OpenStep property lists

\-\- XML

\-\-\- how did it become so popular?

\-\-\-\- html reduced it to basics, made it more basic, and made it easier to get everything to balance

\-\-\-\- A-level CTOs threw it out, but the B- and C-level developers embraced it and outnumbered the A-levels

\-\-\- john seely brown said "maybe only something this simple could work"

\-\-\-\- he thought that the future was in loosely coupled systems

\-\-\- xmlsucks.org

\-\-\- some guy named pault lists all the xml alternatives

\- disruption

\- the 1st rule of workmanship: use the right tool for the right job

\- xml arose out of: one tool to rule them all

\- where did the idea come from that every data format should be a document format?

\-\- runoff was one of the first

\-\- GML

\-\- Scribe

\-\-\- the first place where document formate were done well

\-\-\- separated format from markup

\-\-\- if the web had been based on scribe instead of sgml, it would be a better place today

\-\-\- scribe was the first time where doc format was used for data

\- license

\-\- MIT + "the software shall be used for good, not evil"

\- the logo

\-\- related to the ambihelical hexnut :P

\-\- a square and a circle w/ a twist

\-\- data interchange we can believe in

\- questions

\-\- what would make html better

\-\-\- make it extensible

\-\-\- to be able to define new tags using css

\-\- is there case-sensitivity in unicode?

\-\-\- maybe.  use lower-case in the meantime

\-\- what would you like to see replace json

\-\-\- jsonp is brilliant

\-\-\- currently, we can't easily represent simple bags

\-\-\- remove the quotes from the keys

\-\-\- a = \[\]; a\[0\] = a; => infinite loop when run thru parser

\-\- schema-less langs

\-\-\- i don't care

\-\-\- brilliant work in schema-less dbs now

\-\- why no commnets

\-\-\- because ppl were using them to communicate w/ the parser

doug crockford on the json saga

\- json already existed in nature, but crockford discovered it

\- it wwas being used at netscape in he form of array literals in communication 5 yrs before crockford discovered it

\- crockford's first transmission used js embedded in html in a frame for cross-browser compatability

\- they set document.domain to get around the same origin policy

\- backslashes are tolerated in json so we can put html in json

\- original name was JSML, but that conflicted w/ a pre-existing java protcol

\- json's good for interserver and db applications

\- some of his customers balked at usage because it wasn't standard, so crockford put up a website to standardize it

\- json is the intersection of modern programming languages

\-\- simple values

\-\- sequence of values

\-\- collection of named values

\-\- an intersection is easier to find than a union

\- js is brilliant for state machines

\- most ppl implement json parsers using eval, but this must be guarded by regex to valiudate the json, which slows it doen

\- the latest version of ecma script implements a native JSON.parse, which is ver fast

\- ajax was an important influence on json uptake

\- improvements

\-\- strip comments

\-\-\- comments broke the parser

\-\-\- comment parsing greatly increased complexity

\-\-\- alignment w/ yaml

\-\- added e notation to numnbers

\- no version number

\-\- everything's crap until 3.0, but we avoid this by not having version numbers

\-\- perhaps someday it will be replaced

\-\- at least one piece of the stack will remain constant forever

\- minimalism

\-\- can fit on the back of a business card

\- influences

\-\- lisp s-expressions

\-\-\- perhaps the greatest influence

\-\- rebol

\-\-\- al built upon a represenation of data, which is then executable

\-\-\- rebol is a brilliant language

\-\- JS, Python, NewtonScript

\-\-\- Brendon Ike is a brilliant guy, so it's no accident that it has brilliant aspects

\-\-\- all were developed in isolation at the same time

\-\- NeXT

\-\-\- OpenStep property lists

\-\- XML

\-\-\- how did it become so popular?

\-\-\-\- html reduced it to basics, made it more basic, and made it easier to get everything to balance

\-\-\-\- A-level CTOs threw it out, but the B- and C-level developers embraced it and outnumbered the A-levels

\-\-\- john seely brown said "maybe only something this simple could work"

\-\-\-\- he thought that the future was in loosely coupled systems

\-\-\- xmlsucks.org

\-\-\- some guy named pault lists all the xml alternatives

\- disruption

\- the 1st rule of workmanship: use the right tool for the right job

\- xml arose out of: one tool to rule them all

\- where did the idea come from that every data format should be a document format?

\-\- runoff was one of the first

\-\- GML

\-\- Scribe

\-\-\- the first place where document formate were done well

\-\-\- separated format from markup

\-\-\- if the web had been based on scribe instead of sgml, it would be a better place today

\-\-\- scribe was the first time where doc format was used for data

\- license

\-\- MIT + "the software shall be used for good, not evil"

\- the logo

\-\- related to the ambihelical hexnut :P

\-\- a square and a circle w/ a twist

\-\- data interchange we can believe in

\- questions

\-\- what would make html better

\-\-\- make it extensible

\-\-\- to be able to define new tags using css

\-\- is there case-sensitivity in unicode?

\-\-\- maybe.  use lower-case in the meantime

\-\- what would you like to see replace json

\-\-\- jsonp is brilliant

\-\-\- currently, we can't easily represent simple bags

\-\-\- remove the quotes from the keys

\-\-\- a = \[\]; a\[0\] = a; => infinite loop when run thru parser

\-\- schema-less langs

\-\-\- i don't care

\-\-\- brilliant work in schema-less dbs now

\-\- why no commnets

\-\-\- because ppl were using them to communicate w/ the parserdoug crockford on the json saga

\- json already existed in nature, but crockford discovered it

\- it wwas being used at netscape in he form of array literals in communication 5 yrs before crockford discovered it

\- crockford's first transmission used js embedded in html in a frame for cross-browser compatability

\- they set document.domain to get around the same origin policy

\- backslashes are tolerated in json so we can put html in json

\- original name was JSML, but that conflicted w/ a pre-existing java protcol

\- json's good for interserver and db applications

\- some of his customers balked at usage because it wasn't standard, so crockford put up a website to standardize it

\- json is the intersection of modern programming languages

\-\- simple values

\-\- sequence of values

\-\- collection of named values

\-\- an intersection is easier to find than a union

\- js is brilliant for state machines

\- most ppl implement json parsers using eval, but this must be guarded by regex to valiudate the json, which slows it doen

\- the latest version of ecma script implements a native JSON.parse, which is ver fast

\- ajax was an important influence on json uptake

\- improvements

\-\- strip comments

\-\-\- comments broke the parser

\-\-\- comment parsing greatly increased complexity

\-\-\- alignment w/ yaml

\-\- added e notation to numnbers

\- no version number

\-\- everything's crap until 3.0, but we avoid this by not having version numbers

\-\- perhaps someday it will be replaced

\-\- at least one piece of the stack will remain constant forever

\- minimalism

\-\- can fit on the back of a business card

\- influences

\-\- lisp s-expressions

\-\-\- perhaps the greatest influence

\-\- rebol

\-\-\- al built upon a represenation of data, which is then executable

\-\-\- rebol is a brilliant language

\-\- JS, Python, NewtonScript

\-\-\- Brendon Ike is a brilliant guy, so it's no accident that it has brilliant aspects

\-\-\- all were developed in isolation at the same time

\-\- NeXT

\-\-\- OpenStep property lists

\-\- XML

\-\-\- how did it become so popular?

\-\-\-\- html reduced it to basics, made it more basic, and made it easier to get everything to balance

\-\-\-\- A-level CTOs threw it out, but the B- and C-level developers embraced it and outnumbered the A-levels

\-\-\- john seely brown said "maybe only something this simple could work"

\-\-\-\- he thought that the future was in loosely coupled systems

\-\-\- xmlsucks.org

\-\-\- some guy named pault lists all the xml alternatives

\- disruption

\- the 1st rule of workmanship: use the right tool for the right job

\- xml arose out of: one tool to rule them all

\- where did the idea come from that every data format should be a document format?

\-\- runoff was one of the first

\-\- GML

\-\- Scribe

\-\-\- the first place where document formate were done well

\-\-\- separated format from markup

\-\-\- if the web had been based on scribe instead of sgml, it would be a better place today

\-\-\- scribe was the first time where doc format was used for data

\- license

\-\- MIT + "the software shall be used for good, not evil"

\- the logo

\-\- related to the ambihelical hexnut :P

\-\- a square and a circle w/ a twist

\-\- data interchange we can believe in

\- questions

\-\- what would make html better

\-\-\- make it extensible

\-\-\- to be able to define new tags using css

\-\- is there case-sensitivity in unicode?

\-\-\- maybe.  use lower-case in the meantime

\-\- what would you like to see replace json

\-\-\- jsonp is brilliant

\-\-\- currently, we can't easily represent simple bags

\-\-\- remove the quotes from the keys

\-\-\- a = \[\]; a\[0\] = a; => infinite loop when run thru parser

\-\- schema-less langs

\-\-\- i don't care

\-\-\- brilliant work in schema-less dbs now

\-\- why no commnets

\-\-\- because ppl were using them to communicate w/ the parser
