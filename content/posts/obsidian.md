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

I configured a couple vaults:
1. private notes in ~/Documents, sync'd via Syncthing
2. public notes in my Github Pages repo, sync'd manually via Git

I read somewhere about a person who had two notebooks one for public thoughts and one for private thoughts and this person color-coded them red and blue. I was able to do something similar in Obsidian by [setting a custom color]([https://forum.obsidian.md/t/visually-disinguish-different-vaults/44892/11](https://forum.obsidian.md/t/visually-disinguish-different-vaults/44892/9)) for the title bar. For example:
```css
body {
    --titlebar-background: papayawhip;
    --titlebar-background-focused: papayawhip;
}
```
