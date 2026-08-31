---
title: Neovim
date: 2026-08-28
tags:
  - vim
  - postmarketos
categories:
  - technical-tools
---
## Context
I like Neovim because it provides a Vim interface that's implemented in Lua, so it's modern and consistent, but also requires fewer resources when running on a low-power machine, like my old Chromebook running PostmarketOS.
## Quickstart
I was recently working in VSCode and forgot how to orient myself in Neovim, so, a refresher:

1. Open Neovim:
	```sh
	nvim
	```
2. Verify LazyVim is up to date:
	```sh
	:Lazy
	```
3. Use Telescope to browse around:
	```sh
	:Telescope 
	```
4. Press `<space> k` to browse keymaps
5. Handy default keymaps:
	1. `Ctrl-i` / `Ctrl-o` for jumping back and forth
	2. `Ctrl-d` / `Ctrl-u` for half-page scrolling
	3. `PageDown` / `PageUp` for full-page scrolling
	4. `Ctrl-f` / `Ctrl-b` for forward and backward (when tmux is not intercepting `ctrl-b`)
## Set Up
1. Install Neovim on Alpine/PostmarketOS:

	```sh
	sudo apk add neovim
	```

2. Install the [LazyVim](https://github.com/folke/lazy.nvim) plugin manager, using `~/.config/nvim/init.lua`
3. Install [Telescope](https://github.com/nvim-telescope/telescope.nvim), which provides an elegant consistency for browsing: "Find, Filter, Preview, Pick"
4. Define keymaps for common operations:

	```lua
	require("lazy").setup({
		spec = {
		    {
			    'nvim-telescope/telescope.nvim',
					...
				    config = function()
				        local builtin = require("telescope.builtin")
	                    vim.keymap.set("n", "<leader>b", builtin.buffers,
		                    { desc = "Telescope buffers" })
                        vim.keymap.set("n", "<leader>f", builtin.find_files,
	                        { desc = "Telescope find_files" })
                        vim.keymap.set("n", "<leader>g", builtin.live_grep,
	                        { desc = "Telescope live_grep" })
                        vim.keymap.set("n", "<leader>k", builtin.keymaps, 
	                        { desc = "Telescope keymaps" })
                        vim.keymap.set("n", "<leader>o", builtin.oldfiles, 
	                        { desc = "Telescope oldfiles" })
				      end,
	...
	```
5. Install Stylua and Black for Lua and Python formatting:

	```sh
	sudo apk add stylua black
	```
6. Install [Conform](https://github.com/stevearc/conform.nvim) for code formatting in Neovim:

	```lua
	require("lazy").setup({
		spec = {
		...
			{
				"stevearc/conform.nvim",
				opts = {
					formatters_by_ft = {
						lua = { "stylua" },
						python = { 'black' }
					},
					format_on_save = {
							timeout_ms = 2000, -- Black can take awhile
							lsp_fallback = true,
					},
				},
			},
	
	```