---
_edit_last: "5360656"
_publicize_job_id: "44342673071"
_wp_old_slug: jshell%f0%9f%90%9a
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-05-17T07:27:29+00:00"
guid: http://blog.erikeldridge.com/?p=1678
parent_post_id: null
post_id: "1678"
tags:
  - java
  - repl
timeline_notification: "1589700452"
title: "JShell\U0001F41A"
url: /2020/05/16/jshell/

---
TLDR: like other REPLs, JShell provides an easy way to test Java one-liners, and, like the [Rails console](https://guides.rubyonrails.org/command_line.html#rails-console), a handy ad hoc CLI.

I appreciate a REPL for quickly checking the validity of small snippets. For example, I can improve the quality of my code reviews by verifying an idea works in a REPL before recommending it in a review.

My first exposure to a Java-esque REPL was the [Scala REPL](https://docs.scala-lang.org/overviews/repl/overview.html), which could also interpret Java. This was handy, but only easily available when Scala is installed.

When Scala wasn't installed, I used [Repl.it for Java](https://repl.it/languages/java10), but this is a public site , so I need to be mindful not to use it for anything confidential, and it can take some time to load.

Recently, I learned about [JShell](https://docs.oracle.com/javase/9/jshell/introduction-jshell.htm#JSHEL-GUID-630F27C8-1195-4989-9F6B-2C51D46F52C8), which is included in the JDK as of version 9.

Aside, in case you're on a Chromebook, [Google's Cloud shell](https://cloud.google.com/shell) is great ad hoc terminal.

Per the JShell docs, I can start/stop the shell:

```
$ jshell
|  Welcome to JShell -- Version 11.0.6
|  For an introduction type: /help intro

jshell> /exit
|  Goodbye
```

Hello world:

```
jshell> System.out.println("hi")
hi
```

Note implicit semicolons for simple code. Return statements appear to need explicit semicolons, though, eg:

```
jshell> String get(){
   ...> return "s"
   ...> }
|  Error:
|  ';' expected
|  return "s"
|            ^
```

From the docs, I see there are "scratch variables", which reminds me of the [Scala REPL's `res` variables](https://docs.scala-lang.org/overviews/scala-book/scala-repl.html#variables-created-as-needed):

```
jshell> 2+2
$3 ==> 4

jshell> $3
$3 ==> 4

jshell> $3 + 2
$5 ==> 6
```

The feedback is comparable to `javac`, eg:

```
$ cat MyMap.java
import java.util.HashMap;
import java.util.Map;

class MyMap {
        static Map<String, String> m = new HashMap<>();
        public void put(String k, String v){
                m.put(k,v);
        }
        public void get(String k){
                return m.get(k);
        }
}

$ javac MyMap.java
MyMap.java:10: error: incompatible types: unexpected return value
                return m.get(k);
                            ^
1 error
$ jshell
|  Welcome to JShell -- Version 11.0.6
|  For an introduction type: /help intro

jshell> /open MyMap.java
|  Error:
|  incompatible types: unexpected return value
|                  return m.get(k);
|                         ^------^

```

We can use [tab completion](https://docs.oracle.com/javase/9/jshell/snippets.htm#JSHEL-GUID-E24D9E84-C9E3-43DE-B14D-C9544A35E5FC):

```
jshell> List
List                 ListIterator         ListResourceBundle

Signatures:
java.util.List<E>

<press tab again to see documentation>

jshell> List.
class     copyOf(   of(

jshell> List.of("1", "2")
$3 ==> [1, 2]

jshell> $3.stream().forEach(System.out::println)
1
2

```

The up arrow scrolls back through history. We can also print it:

```
jshell> /list

   1 : List.of("1", "2")
   2 : $3.stream().forEach(n->System.out.println(n))
```

We can also search history, eg Ctrl + R for reverse search:

```
(reverse-i-search)`hi': System.out.println("hi")
```

Editing multi-line code is cumbersome, eg:

```
jshell> class Foo {
   ...> String get(){}
   ...> }
|  created class Foo

// Up arrow to edit method definition

jshell> String get(){
   ...> return "s";
   ...> }
|  created method get()

// Creates new function instead of editing Foo.get

jshell> get()
$10 ==> "s"

jshell> Foo f = new Foo();
f ==> Foo@1e88b3c

jshell> f.get();

jshell>
```

I'd recommend using an external editor for anything non-trivial.

JShell has an `/edit` command to launch an external editor, but it doesn't appear to save the output.

```
jshell> /set editor vim
|  Editor set to: vim

jshell> class Foo {}
|  created class Foo

jshell> /edit Foo // add bar method to Foo
|  replaced class Foo

jshell> Foo f = new Foo()
f ==> Foo@56ac3a89

jshell> f.bar()
|  Error:
|  cannot find symbol
|    symbol:   method bar()
|  f.bar()
|  ^---^

jshell> /edit Foo // Observe bar method is undefined

```

I'd recommend just having an editor open in a separate terminal, and using JShell's `/open` command to load the file after changes.

For folks using Google Cloud Shell, it appears to have an implicit `tmux` session, which makes it easy to edit in one pane and use JShell in another.

In practice, I'm guessing there's little use for JShell when _editing_ complex code, but it does provide a handy CLI for _exploring_ complex code. We could have a build target, like `pants repl`, or a CLI for our app, like `rails console`.

For example, given a naive script _build\_to\_repl.sh_:

```
javac -d bin src/main/com/example/* \
        && jar cf bin/MyMap.jar -C bin com \
        && jshell --class-path bin/MyMap.jar
```

We could:

```
$ ./build_to_repl.sh
|  Welcome to JShell -- Version 11.0.6
|  For an introduction type: /help intro

jshell> import com.example.MyMap;

jshell> MyMap m = new MyMap();
m ==> com.example.MyMap@6a41eaa2

jshell> m.put("k", "v")

jshell> m.get("k")
$4 ==> "v"

```
