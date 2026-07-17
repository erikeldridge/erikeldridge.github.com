---
title: Mind Blown By APKBUILD dependencies 🤯
date: 2026-07-17
tags:
  - postmarketos
categories:
  - technical-tools
---
I had to take a moment today to digest the fact that `APKBUILD` dependencies are the same packages I install manually via `apk`.

For example, I recently installed Ripgrep:
```sh
sudo apk add ripgrep
```

If I was configuring a package that used `APKBUILD` and depended on Ripgrep, I could declare that dependency like this:
```apkbuild
mypackage() {
	pkgdesc="Package that depends on Ripgrep"
	depends="
		ripgrep
	"
}
```

The thing I found unexpected is that these both refer to the same package. `APKBUILD` uses the `apk` repo for its build artifacts.

I'm new to Linux development, so forgive me if this is obvious. I guess I'm used to the Blaze/Bazel paradigm where dependencies are other build targets and built artifacts are transparently cached. But even in the case of artifacts being explicitly provided by a repository like Maven, it's unusual to directly interact with the artifact. That said, I appreciate the elegance of the uniform package abstraction. I'm pleasantly surprised!

Gemini informs me Alpine isn't the first OS to do this, and recommends NixOS as an example of taking the concept to an extreme. NixOS sounds like an OS built on Bazel.
