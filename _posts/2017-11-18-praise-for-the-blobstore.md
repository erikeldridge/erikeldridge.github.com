---
title: "Praise for the blobstore \U0001F4EF"
layout: post
tags: event-bus document execution rest source-control ci cdn hosting
date: 2017-11-18 10:36:16.059688000 -08:00

---


The phrase "blobstore" refers to a simple key-value store, optimized for large values. [Amazon’s S3](https://aws.amazon.com/s3/), [App Engine’s Blobstore](https://cloud.google.com/appengine/docs/standard/python/blobstore/) and [Twitter’s Blobstore](https://blog.twitter.com/engineering/en_us/a/2012/blobstore-twitter-s-in-house-photo-storage-system.html), are examples.

I’m writing to highlight what appears to be a fundamental role played by the blobstore pattern. This may be aspirational, but I’m curious to explore.

Caveat: I only have experience using blobstores and the related infra I mention below, eg CDNs, source control, document stores, CI, etc, not maintaining this infra.

I’ve **bolded** references to other key pieces of infrastructure.

## Hosting

This is one of the more primitive, intuitive applications. Push a local file to the store and then retrieve it:

    $ curl -T my_file https://blobs.example.com/my_file
    $ curl https://blobs.example.com/my_file

Note how amenable the store is to a [RESTful](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) API.

### Custom domains

Enable custom domains and we have general hosting:

    $ curl -H "x-custom-domain: mydomain.com" https://blobs.example.com/my_file
    $ curl https://mydomain.com/my_file

## CDN

Put a cache in front of the store and we have a CDN. Use SSDs for hosting and we may not need a cache. Or use an external CDN and the blobstore as an “origin server”.

## Key-value

Key-value stores scale well because they require relatively little coordination: a key maps simply to a host and doesn’t need to be read before being written.

We improve hosting scalability by building on a key-value pattern, for example.

## Document store

For better or worse, a blobstore is only aware of simple keys, so we can’t browse it like a file structure.

However, split the path and index the fragments and we have a **document store**. We can keep the blob store pure by defining the document store as standalone infrastructure and depending on an **[event bus](/notes/praise-for-the-humble-bus.html)** and **execution service**:

1. Document store subscribes to blobstore push events via event bus associating an executable
1. Client pushes value to blobstore
1. Blob store writes value and fires event, eg “push <url>”
1. Document store processes the path as described above

Now we can look up values by path fragments:

    $ curl -T my_file https://blobs.example.com/my_bucket/my/file
    $ curl https://documents.example.com/my
    > file

## Search

Using an approach similar to building a document store, we can process the values stored in blobstore to populate a **search index**.

## Source control

Put a review process and commit log in front of writes to the blobstore and you have scalable **source control**. [Use a blobstore for Git's object store](https://fancybeans.com/2012/08/24/how-to-use-s3-as-a-private-git-repository/), and you get scalable replication. Use [a document-aware source control mechanism, like Google](https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext#body-4), and you get a scalable mono-repo.

## CI

Subscribe to push events from source control, using an **event bus** and **execution service**, and we have CI. We can listen for success events from our subscriber to get pre-submit quality control. We can write artifacts back to the blobstore as part of a continuous deploy pipeline.

## Batch

We’ve already described a few cases of stream processing via an **event bus**, but we can also periodically iterate over values and stream them through an **execution service** to rebuild indices, produce artifacts, normalize data, etc.


