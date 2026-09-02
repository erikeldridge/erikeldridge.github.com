---
title: VSCodium
date: 2026-09-01
tags:
  - postmarketos
categories:
  - technical-tools
---
I recently spent some time in VSCode on a Github Codespace, then [returned to Neovim](../neovim), and then was in need of "rename symbol" functionality. I know Neovim has LSP support, but it required some fiddling the last time I tried to use it. Given VSCode provides for free, I wanted to try running it on my pmOS Chromebook and see just how slow things got. If I'm effectively recreating VSCode in Vim, and vanilla VSCode runs fine, then the latter is simpler.
## Installed From Flathub
The non-MS build of VSCode is [VSCodium](https://vscodium.com/). I could install it via `apk`, but I bias toward Flatpak, and installing it [from Flathub](https://flathub.org/en/apps/com.vscodium.codium) was straightforward.
## Interpreter Confusion
Installing it was straightforward, but I think the Flatpak sandbox confuses it. There's a persistent prompt in the bottom bar to configure a Python interpreter. If I select a binary under a venv, it throws errors like this:
```
Selected file is not a valid Python interpreter: /run/user/10000/doc/c7c037be/python
```
I can easily run outside the IDE, so it's not a blocker, but it would be nice to have a debugger.
## Electron Is Fine
It's an Electron app, but my system still feels snappy when it's running.
## Python
I'm working on a Python project, and VSCode doesn't provide a formatter out of the box, so I needed to install [MS' extension for the Black formatter](https://code.visualstudio.com/docs/python/formatting).
## Summary
I like it! I'll keep going. I think the next thing to try is to install it via `apk` to see if that enables me to run from VSCode, since a debugger would be helpful.
