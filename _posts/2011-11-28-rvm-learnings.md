---
layout: default
---

# RVM learnings

## Gemsets

Create a gemset per repo, and specify this gemset, e.g., `rvm ruby-1.8.7-p330@erikeldridge.github.com`,  in an .rvmrc file in the repo.

If the .rvmrc file is not loading automatically, try running `rvm rvmrc trust`. This tells rvm to run the .rvmrc file without asking.

[Bundler](http://gembundler.com/) makes it super easy to populate a gemset.