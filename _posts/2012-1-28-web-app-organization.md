---
layout: default
---

## Web app organization

### Client vs. server

Here are a few general factors I consider when trying to decide what code goes in the client and what goes in the server.

#### Data access

If we need to access data, it makes sense to locate the logic required close to the data.

For example, if we can easily, safely, and quickly fetch user data from a DB while generating a response, as opposed to doing it from a remote client, we should.

#### Computation cost

If we have the resources to perform expensive computation on the server, and doing so would improve client performance, then keep the code server-side.

If the goal is to reduce server load, then push computation to the client.

#### Payload size

Minimizing the amount of content sent to a (web) client is a good thing. If it doesn't need to run in the client, keep it on the server.

#### Keeping JS light

JavaScript apps seem to work best when kept light. Managing dependencies, interactions, layout, and cross-client particulars requires a lot of code already. Given capable server-side resources, and the ability to make network requests, biasing division of labor in favor of the client-side simplicity is preferable.

#### Presentation layer

Managing presentation-specific logic in the client is intuitive. For example, if we need to truncate a string to fit a certain client, it's better to send a single string of max length to all clients, and let each client make appropriate changes.

If development is split into client- and server-side teams, this also helps them work independently.
