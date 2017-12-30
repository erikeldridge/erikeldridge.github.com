---
title: On-demand compute
layout: post
date: 2017-12-29 00:00:00 +0000
tags:
- cloud9
- aws
- http
- lambda
- ec2
- toolkit
- go
- letsencrypt
- ssl
- acme
- dns
---
## Goals

* Define on-demand compute resource
* Enable HTTP requests to urls like example.com/\*
* Restrict access
* Custom domain

## On-demand

I'm using [Cloud9](netbook-development), which provisions an EC2 instance. I can start services on different ports of this instance, but this is tedious and relatively unrealistic. I'd like these services to be available for arbitrary requests, but I don't need to them running all the time. AWS' Lambda seems appropriate for this use case.

Creating a new function via the Lambda console is straightforward. Well-done, AWS 👍

## HTTP routing

Routing HTTP requests to a Lambda function requires the API Gateway abstraction.

Routing requests with wildcard paths requires the API Gateway's Lambda Proxy configuration.

The end result is accessible via HTTP at a URL like:
https://jmf9mr2fge.execute-api.us-west-1.amazonaws.com/prod/a/b/c.

## Restricting access

Since I'm paying by usage, and the only customer, I only want this function invoked by my requests. API Key security seems appropriate at this stage.

Setting up API Key security on a proxy endpoint is accomplished by drilling into the "Method Request" configuration of the "Method Execution" overview.

I can use [ModHeader](prototype-toolkit) to include the ["x-api-key" header](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-use-postman-to-call-api.html) and [filter](https://docs.google.com/document/d/1-2CSdz1I7Sfr32R_KAYgLffGslpw2eGoX3xyKn1A3Iw/pub#h.us8lgitrn0f5) for requests to "\*.amazonaws.com".

## Custom domain

Custom domains are configured through the API Gateway. The commands below use fn.example.com as an example domain.

API Gateway requires domains use HTTPS. ("To set up a custom domain name as your API's host name, you...must provide an SSL/TLS certificate for the custom domain name." - [docs](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html)).

So, step one is to get an SSL cert. Let's Encrypt provides tooling for generating a free SSL cert. I found the [google/acme](https://github.com/google/acme) tool (recommended by [a concise tutorial](https://medium.com/@yhjor/setup-your-aws-api-gateway-with-custom-domain-in-7-steps-86dd32d968a1)) to be relatively sane.

Install Go on Amazon Linux (CLoud9's EC2):

```sh
sudo yum install golang
```

Install acme:

```sh
go get -u github.com/google/acme
```

Register account:

```sh
~/go/bin/acme reg -gen -accept contact@example.com
```

Verify registration:

```sh
~/go/bin/acme whoami
```

Generate cert (2048 bit, per blog post mentioned above, although it seems [more options are now supported](https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-prerequisites.html)):

```sh
openssl genrsa -out cert.key 2048
```

Generate domain ownership token:

```sh
~/go/bin/acme cert -k cert.key -dns=true fn.example.com
```

Use [Google's Public DNS tool](https://dns.google.com/query?name=_acme-challenge.fn.example.com&type=TXT&dnssec=true) to assert token propagation.

Now that we have a cert, we need to import it into AWS' Certificate Manager service. (Note at the time of this writing, only N. Virginia was supported, so import certs there and then reference them in whatever region we're using for API Gateway.)

After acme generates the cert, copy the first cert into ACM's "Certificate body" field and the second into the "Certificate chain". Copy the key into the "Certificate private key" field.

Associate the cert with the API and stage (so we don't have to pass it in the path) in the API Gateway custom domain configuration. The output of this process is a cloudfront "Target Domain Name", eg d1eputjh2acqt4.cloudfront.net.

Create a record ([CNAME for subdomains, A for apex domains](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-edge-optimized-custom-domain-name.html)) in your domain registrar mapping the custom domain to the cloudfront domain name.

At long last, we should be able to load [https://fn.example.com/a/b/c](https://fn.example.com/a/b/c) in a browser.