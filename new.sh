base="_posts"
today=$(date +"%Y-%m-%d")
name="new-post"
path="$base/$today-$name.md"
content=$(
cat <<END
---
title: New post
layout: post
tags:
---


END
)
echo "$content" > $path
echo "Created $path"
