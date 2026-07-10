---
_edit_last: "5360656"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2011-05-12T19:24:50+00:00"
guid: http://erikeldridge.wordpress.com/?p=1206
parent_post_id: null
post_id: "1206"
tags:
  - go
  - golang
  - notes
  - robpike
title: Notes from Rob Pike's 5/12 talk on Go at Twitter
url: /2011/05/12/notes-from-rob-pikes-512-talk-on-go/

---
- See [golang.org](http://golang.org/) for language documentation
- W/in a factor of 2 slower than C/C++. Generally w/in 20% speed of c/c++ programs
- Intrinsically safe
- This talk has been presented before, so the slides may be online. see google io 2010 archive
- check out [article in Register about Go](http://www.theregister.co.uk/2011/05/05/google_go/) that quotes Odersky: “I like a lot of the design decisions they made in the language … Basically, I like all of them.”
- built on 4 self-reinforcing principles: simple, ortho, succinct, safe
- see axiom of choice in type theory
- public/private hint in variable name is one of the best things about the language
- see CSP tradition
- uses a deterministic model, channels, for concurrency
- the “go” keyword launches a go routine
- “for { … ” declares an infinite loop
- expressiveness comes from orthogonal composition of constructs
- Go conceived while waiting for 45 min gcc compilation
- Go app engine sdk is a complete installation vs building from source

Questions

How is the language intrinsically safe?

- no stack overflows

Interoperability?

- native swig support for C/C++ progs
- no java interop

Exceptions?

- no try/catch
- uses panic/recover
- function-level, not statement-level

Channel implementation?

- not like erlang channels
- passing channel over netchan is coming

Generics?

- Core team has members that believe generics must _and_ must-not be included

Upgrading?

- gofix rewrites code
- gofont pretty-prints/formats code

Inspirations?

- Oberon
- New Squeek
- Didn’t cherry-pick features to build an ideal language, but they did include elements that helped them be productive
