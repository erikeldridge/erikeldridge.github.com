---
layout: post
---

## SICP + Clojure

### Setting up clojure

1. Install via brew: `brew install clojure`
1. Launch REPL: `clj`

### Exercise 1.1

{% highlight clojure %}
$ clj
Clojure 1.2.0
user=> 10
10
user=> (+ 5 3 4)
12
user=> (- 9 1)
8
user=> (/ 6 2)
3
user=> (+ (* 2 4) (- 4 6))
6
user=> (def a 3)
#'user/a
user=> a
3
user=> (def b (+ a 1))
#'user/b
user=> b
4
user=> (+ a b (* a b))
19
user=> (= a b)
false
user=> (if
  (and
    (> b a)
    (< b (* a b))
  )
  b
  a
)
4
user=> (cond
    (= a 4) 6
    (= b 4) (+ 6 7 a)
    true 25
)
16
user=> (+ 2
    (if (> b a) b a)
)
6
user=> (*
    (cond
        (> a b) a
        (< a b) b
        true -1
    )
    (+ a 1)
)
16
{% endhighlight %}

### References

* [Clojure cheat sheet](http://clojure.org/cheatsheet)
* [Mark Volkmann's getting started tutorial](http://java.ociweb.com/mark/clojure/article.html)
* [SICP book](http://mitpress.mit.edu/sicp/)