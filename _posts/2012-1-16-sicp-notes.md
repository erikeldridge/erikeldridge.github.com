---
layout: post
---

## SICP notes

### Setting up with clojure

Install via brew: `brew install clojure`

The command interpreter is a little rough, so set up a basic script like this

{% highlight lisp %}
(..
  System out (
    println 'hi'
  )
)
{% endhighlight %}

Run the script: `clj -i script.clj`

### 1.1

_read-eval-print loop_, a.k.a. _REPL_, describes the basic cycle in which the Lisp interpreter operates: "It reads an expression from the terminal, evaluates the expression, and prints the result"

_tree accumulation_ refers to a way of viewing combination evaluation as "we can imagine that the values of the operands percolate upward, starting from the terminal nodes and then combining at higher and higher levels".

_special forms_ refer to exceptions to the general evaluation rule, e.g., `def`.

The _substitution model_ for procedure application describes evaluation in terms of replacing compound operators and operands with their primitive components.

A _clause_ is a pair of expressions. "The first expression in each pair is a _predicate_ -- that is, an expression whose value is interpreted as either true or false." The second expression is called a _consequent expression_, and it's evaluated if the predicate is true.

_cond_ returns undefined if all the predicates in its clauses return false.

_else_ "is a special symbol that can be used in place of the [predicate] in the final clause of a cond".

### References

* [SICP full text](http://mitpress.mit.edu/sicp/full-text/book/book.html)