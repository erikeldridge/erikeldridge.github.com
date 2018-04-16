---
title: persistence
layout: post
date: 2018-04-15 00:00:00 +0000
tags:
- toolkit
- postgres
- ubuntu
---
Once we have a [compute](compute) layer to execute code, we need a persistence layer to persist state.

Postgres provides a great, general-purpose option.

There are lots of helpful posts for setting up Postgres on Ubuntu (thx, all!), but here's a simplified version for hacking around.

Install postgres (and create "postgres" user):

    sudo apt-get install postgresql

Launch postgres cli (psql; as "postgres" user):

	sudo -i -u postgres
    psql -U postgres

Create a database:

	create database foo;

Create table:

	create table users (id int, name text, primary key(id));

Create service user (for service that's going to call db):

	create user api_user with encrypted password 'bar';

Give service user access to db:

	grant connect on database foo to api_user;
    grant usage on schema public to api_user;
    grant select on users to api_user;

Exit psql:

	\q

Exit "postgres" user:

	exit

Test access:

	psql postgres://api_user:bar@localhost:5432/foo
