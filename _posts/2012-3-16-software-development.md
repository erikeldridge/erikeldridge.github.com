---
layout: post
---

## Software development

### Starting new projects

For each feature, create a wiki, throttle key, and shortcut url. For each change, create a tracking ticket and review.

Develop FE & BE changes concurrently, as opposed to waiting for BE before starting FE. It's frustrating, but running FE code helps flush out BE bugs, clarify APIs, etc.

### Pair programming

Pairing is great for debugging.

Plug two keyboards into macbook pro for super easy pair programming.

### Code conventions

Establish code conventions to avoid style-related arguments. For example:

  * Strip trailing whitespace, which clutters diffs
  * Use spaces instead of tabs where applicable for consistent formatting across editors

### Documentation

Maintain wiki page for each proj and link to it (via shortcut url) in code comments. Wikis are great for documentation that changes frquently.

For code-related documentation that only changes when the code change, add documentation into the code base as follows:

  * a file-level comment block at the top of files
  * a module description in a readme file in the module directory
  * a project description in a readme file in the project root, and a cookbook in howto file in project root

When using dynamically generated function/variable names, place an example of a generated name in a comment. This enables developers to perform a text search for the function name.

Maintain run book for all services. This enables anyone to quickly and safely start/stop a feature.

### Testing

Start with manual tests. Maintain manual test script in feature wiki.

Build automated tests around complex and high-value code and repeated regressions. Require

I have yet to see an example of BDD that justifies the extra syntax and abstraction (`value1.should be_equal value2` vs `value1 == value2`).

### Debugging

A debugger enables rational development and debugging, as opposed to trial-and-error print statements.

Ruby has a great debugger _ruby-debug_. See the [Ruby tools](http://erikeldridge.github.com/2012/02/16/ruby.html) post for a convenient usage reference.

### Experimentation

Experiment-driven development is great.

Maintain a wiki for each experiment. Use the wiki to document the experiment's hypothesis, design, and outcome.

### Continuous integration

Use [Jenkins](http://jenkins-ci.org/) for CI. Jenkins is a fork of [Hudson](http://hudson-ci.org/), maintained by Hudson's creator. Jenkins forked after Oracle aqcuired Sun.

### Cost estimation

Use generous estimates for new projects.

### Separation of concerns

Strive for a clean separation of things that "change from things that don't change", in the words of @tnegrin. This enables teams to work in parallel, facilitates maintenance and updates, and makes the code more fun to work with.

Splitting the FE from the BE via Thrift works well.

### Versioning

[Semantic Versioning](http://semver.org/) defines a standard approach to versioning.

### Dynamic programming

Be careful with dynamically generated functionality. It can be difficult to learn and debug, which slows the pace of development.