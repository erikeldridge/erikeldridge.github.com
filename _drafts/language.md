---
title: language
date: 2019-03-10 19:41:54 -0700
layout: post

---
A few considerations when choosing a language:

1. community
2. ease-of-use
3. type-safety
4. reasonable package and build system

## Java

Java has all these qualities, more or less. The JVM has been tested for the last billion years. IntelliJ is a powerful editor.

Maven is ubiquitous, but tedious. My favorite build system is Bazel, which fortunately supports Maven dependencies:

* [https://docs.bazel.build/versions/master/be/workspace.html#maven_jar](https://docs.bazel.build/versions/master/be/workspace.html#maven_jar "https://docs.bazel.build/versions/master/be/workspace.html#maven_jar")
* [https://github.com/bazelbuild/examples/tree/master/java-maven](https://github.com/bazelbuild/examples/tree/master/java-maven "https://github.com/bazelbuild/examples/tree/master/java-maven")

Setup

1. [Install per Bazel docs](https://docs.bazel.build/versions/master/install-ubuntu.html "Bazel installation docs"). Note 4GB RAM recommended.
2. Install [IntelliJ plugin](https://ij.bazel.build/docs/bazel-plugin.html)