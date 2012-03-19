---
layout: post
title: SICP + Clojure project
---

* toc
{:toc}

## Setting up clojure

1. Install via brew: `brew install clojure`
1. Launch REPL: `clj`

## Exercise 1.1

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

## Exercise 1.2

{% highlight clojure %}
(/
  (+ 5 4 (- 2 (- 3 (+ 6 (/ 4 5) ) ) ) )
  (* 3 (- 6 2) (- 2 7) )
)
{% endhighlight %}

## Exercise 1.3

{% highlight clojure %}
(defn sq [a] (* a a))
(defn sum-of-lg-squares [a b c]
    (+
        (sq (max a b) )
        (sq (max b c) )
    )
)
{% endhighlight %}

## References

* [Clojure cheat sheet](http://clojure.org/cheatsheet)
* [Mark Volkmann's getting started tutorial](http://java.ociweb.com/mark/clojure/article.html)
* [ClojureDocs](http://clojuredocs.org/)
* [SICP book](http://mitpress.mit.edu/sicp/)

## Conclusion

I like to close technical posts with something non-technical. Here's _Bluejay + peanut_:

![Bluejay + peanut](https://lh4.googleusercontent.com/-2obx5vi-L1U/T0rDCjpuuWI/AAAAAAAAATA/K-z_zA_NeY8/s704/IMG_5219.jpg)



<p>
  <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br />This <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/StillImage" rel="dct:type">work</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.
</p>