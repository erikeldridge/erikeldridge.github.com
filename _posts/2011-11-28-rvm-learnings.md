---
layout: post
title: RVM toolkit
---

## Environments

Run `rvm list` to see which environments are available.

## Gemsets

Create a gemset per repo: `rvm use <desired ruby environment> && rvm gemset create <gemset name>`

## .rvmrc

Create a .rvmrc file in each repo. In the file, specify the environment/gemset pair you'd like to use (and tell rvm to create the gemset if it doesn't already exist), e.g., `rvm ruby-1.8.7-p330@erikeldridge.github.com --create`.

If the .rvmrc file is not loading automatically, try running `rvm rvmrc trust`. This tells rvm to run the .rvmrc file without asking.

## RVM + Bundler

[Bundler](http://gembundler.com/) makes it super easy to populate a gemset.

## References

* The [rvmrc docs](http://beginrescueend.com/workflow/rvmrc/)