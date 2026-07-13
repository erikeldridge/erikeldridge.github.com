---
title: Obsidian
date: 2026-07-12
categories:
  - organizational-tools
tags:
  - obsidian
  - syncthing
---
On my quest to identify standard tools to unreservedly recommend, I was looking for a note-taking app and had a few requirements:
- Local-first
- Consistent UX across platforms (Mac, Linux, Android)
- Markdown
- Flat-file storage

A few nice to haves:
- A high-quality UX, comparable to Gnome Circle apps like Apostrophe
- A mature project
- A small team focused on creating a great product
- No up-front fees

This brought me to [Obsidian](https://obsidian.md/), which checks all the boxes. Excellent work! Thank you!

I liked Apostrophe, but it was Gnome-only. I liked Iotas, but its storage model didn't play well with Syncthing. There are a ton of Markdown note-taking apps, but most seem like hobby projects and lack UX polish.
## Vaults
I configured a couple vaults:
1. private notes in ~/Documents, sync'd via Syncthing
2. public notes in the Hugo `content` directory of my Github Pages repo, sync'd manually via Git

I visually differentiated them by [setting a custom color]([https://forum.obsidian.md/t/visually-disinguish-different-vaults/44892/11](https://forum.obsidian.md/t/visually-disinguish-different-vaults/44892/9)) for the title bar. For example:
```css
body {
    --titlebar-background: lightcoral;
    --titlebar-background-focused: lightcoral;
}
```
## Git
Obsidian maintains vault configuration in a `.obsidian` directory. I wanted to track most of this, but not the files that are session- or plugin-specific, so I added them to my `.gitignore`:
```sh
content/.obsidian/workspace.json
content/.obsidian/plugins
```
## Templates
Since each public post needs a title and creation date, I created a template for that:
1. Created an `_obsidian-templates` directory alongside the `.obsidian` directory under `content`
2. Added the directory to Hugo's ignored file list
3. Created a `new.md` template:
   ```md
    ---
    title: "{{title}}"
    date: {{date}}T{{time}}:00-05:00
    tags: []
    categories: []
    ---
   ```

Now I can inject this into new posts by pressing ctrl-p, selecting "Templates: insert template" and selecting `new`.
## Hugo
I use Hugo to manage my Pages. Hugo defines a `content` directory for Markdown files. Fortunately, Hugo ignores dotfiles by default, so I only needed to explicitly ignore the template directory:
```toml
ignoreFiles = ['/_obsidian-templates/']
```