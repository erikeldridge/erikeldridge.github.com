---
author: erikeldridge
categories:
  - technical-tools
date: "2009-11-26T04:02:33+00:00"
guid: http://erikeldridge.wordpress.com/2009/11/25/simpleton-pattern/
parent_post_id: null
post_id: "482"
title: Simpleton Pattern
url: /2009/11/25/simpleton-pattern/

---
# Simpleton pattern

## Problem

We don’t want multiple objects of the same class, but we also don’t want to clutter our code with the kind of checks required to implement the Singleton pattern

## Solution

Kill program execution if a second attempt to instantiate an object occurs

## Example

```
class Foo {
    function constructor(){
        if(objectOfClassAlreadyExists('Foo')){
            stopExecution();
        }

        ...

    }
}

...

variable foo = new Foo //all good

...

variable bar = new Foo  //poof!

```
