---
_edit_last: "5360656"
_publicize_job_id: "35078184258"
_wp_old_date: "2019-09-08"
author: erikeldridge
categories:
  - technical-tools
date: "2017-07-29T21:10:10+00:00"
guid: https://erikeldridge.wordpress.com/?p=1262
parent_post_id: null
post_id: "1262"
tags:
  - ios
  - purelayout
  - xcode
timeline_notification: "1567977012"
title: A case for programmatic views in iOS
url: /2017/07/29/a-case-for-programmatic-views-in-ios/

---
## Context

If you're new to ios, building ui in xcode, and frustrated with inability to search for help effectively.

## Suggestion

Layout your ui programmatically. I've found [PureLayout](https://github.com/PureLayout/PureLayout) helpful for this.

## Benefits

1. Search based on concrete syntax (as opposed to search for the button that looks like ... in xcode version ...)
1. Reference other people's ui, eg [PureLayout's demos](https://github.com/PureLayout/PureLayout/blob/master/PureLayout/Example-iOS/Demos/ALiOSDemo1ViewController.m), without having to load it in xcode
1. Comment on configuration (credit to [Yong](https://twitter.com/ymishere) for noticing this)
1. Code-review changes
1. Reduce cognitive load because you only have to understand autolayout, not autolayout + interface builder

## Caveat

Interface builder does a lot (I recently learned from [Riz](https://github.com/rsattar) that [LaunchKit](https://github.com/rsattar/launchkit-ios/blob/master/LaunchKit/Classes/UI/LKUIManager.m#L87) used compiled storyboards for dynamic ui!), and is Apple's recommended approach. I suspect I'll have a better experience with it once I have more ui experience.
