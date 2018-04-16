---
title: "Persistence \U0001F3E6"
layout: post
date: 2018-04-16 00:04:30 -0700
tags:
- toolkit
- postgres
- ubuntu
- node
- heroku
---
Once we have a [compute](compute) layer to execute code, we need a persistence layer to persist state.

Postgres provides a great, general-purpose option.

There are lots of helpful posts for setting up Postgres on Ubuntu (thx, all!), but here's a simplified version for hacking around.

Install postgres (and create "postgres" user):

```bash
sudo apt-get install postgresql
```

Launch postgres cli (psql; as "postgres" user):

```bash
sudo -i -u postgres
psql -U postgres
```

Create a database and connect to it:

```sql
create database foo;
\connect foo
```

Create service user (for service that's going to call db):

```sql
create user api_user with encrypted password 'bar';
```

Give service user access to db:

```sql
grant connect on database foo to api_user;
grant usage on schema public to api_user;
```

Create table in database:

```sql
create table users (id int, name text, primary key(id));
```

Give service user access to table:

```sql
grant select on users to api_user;
```

Exit psql:

```
\q
```

Exit "postgres" user:

```
exit
```

Test access:

```bash
export DATABASE_URL=postgres://api_user:bar@localhost:5432/foo
psql $DATABASE_URL
```

In Node (following [Heroku's lead](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database) and using [node postgres](https://node-postgres.com/features/queries)):

```js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})  
const result = pool.query('select * from users;', (err, res) => {
  console.log(err, res.rows)
  pool.end()
})
```