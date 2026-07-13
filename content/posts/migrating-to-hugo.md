---
title: Migrating To Hugo
date: 2026-07-09
categories:
  - technical-tools
tags:
  - blog
  - go
  - obsidian
---
I used Wordpress for a few years to manage my blog, but now I'd like a bit more control. For example, I'd like to write in markdown using Obsidian.

Before Wordpress, I used Jekyll on GitHub Pages. I liked Jekyll a lot, but I'm now using an old laptop for writing and want to minimize the resource requirements. I have Go installed, and enjoy using it, so I'm curious to try Hugo.

Fortunately, Hugo has a Jekyll converter, so I started there:
```sh
hugo import jekyll erikeldridge.github.com erikeldridge-hugo
```

The main friction was moving from Jekyll's explicit configuration to Hugo's implicit (and inconsistent) configuration. For example, Hugo looks for a layout file called `single.html` to render a given page, as opposed to the `layout` field in Jekyll's frontmatter. But there are only a few of those, so I was up and running pretty quickly.

The quickstart docs mention a theme, and I prefer to keep things minimal, so I spent some time tuning that, before realizing I can just omit the `theme` configuration to not use one.

The dev server is snappy. No complaints there.

Next, I had posts in Wordpress, so I needed to import those. The [wp2hugo project](https://github.com/ashishb/wp2hugo) made that easy:
```sh
$ ./wp2hugo --source ./myblog.WordPress.2026-07-08.xml --download-media

$ cp /tmp/generated-2026-07-08/content/posts .
```

GitHub defaults to Jekyll, so using Hugo required the definition of an Action. Hugo's docs made that easy too.

For whatever reason, GitHub forgot my custom domain settings when changed the repo to build from an Action rather than a branch, resulting in a 404 when I first switched over. But setting it again was just a field in the Pages settings.

Overall, I like it! I'm very grateful to the Hugo community for maintaining this project. Thank you!