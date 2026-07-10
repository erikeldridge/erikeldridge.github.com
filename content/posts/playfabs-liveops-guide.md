---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_oembed_a77e5ac6b0be3487f7b3c7735b57b13c: '{{unknown}}'
_publicize_job_id: "48235375895"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - different-perspectives
  - technical-tools
date: "2020-08-29T03:37:02+00:00"
guid: http://blog.erikeldridge.com/?p=1749
parent_post_id: null
post_id: "1749"
tags:
  - growth
  - liveops
timeline_notification: "1598672228"
title: PlayFab's LiveOps guide
url: /2020/08/28/playfabs-liveops-guide/

---
My experience is largely in features and infrastructure for growing and retaining users, aka “growth”. Recently, I learned the games industry has a comparable concept “LiveOps”. I’ve found value in using the latter to learn more about the space in general.

PlayFab has an excellent [guide to LiveOps](https://blog.playfab.com/blog/the-playfab-guide-to-liveops). The guide is a brief and accessible reference, so I’ll just jot notes below.

# Introduction

The guide summarizes LiveOps as “Games are shifting from one-off experiences to services that evolve. Developers of successful live games focus on understanding their players, meeting their individual needs, and cultivating long-term relationships”

In growth-speak, I’d phrase this as analytics, personalization and retention. There is some direct association with growth: “We’re investing in games that people play for longer and engage with much more deeply … to drive growth ...“

I guess the “live” in LiveOps refers to “services that **evolve**”: “... live services

represented nearly 58% of Electronic Arts’ net revenue …” I can see how this would be a big shift from encoding all logic in a released binary. “save client updates for entirely new features or large assets”

“With a LiveOps game, the real work starts with launch instead of ending there” I think there’s less of a distinction in a non-game app; most apps already pull content from a network.

A summary of LiveOps features:

- “server-side configurations ...”
- “... content data untethered from client versions ...”
- “... in-depth analytics”

“Content data” refers to “... new experiences and content, thereby extending the lifetime of our games“, which explains the claim that LiveOps can reduce up-front investment.

“... the ‘live’ part of LiveOps goes through three post-launch stages:

1. **Iterating** your Game ...
1. **Personalizing** the Player Experience ...
1. Managing the **Community** …”

I think all of these apply to apps in general.

I like how the breakdown also indicates infra and talent required in each step:

1. **Iteration** requires “build, test-and-deploy pipeline, basic analytics, and content configurations“
1. **Personalization** requires “data analysts and product managers to use more sophisticated tools such as recommendation systems and live events managers“
1. **Community** management requires “customer support staff, marketing, and community managers … guild systems, user-generated content, and multiplayer services for matchmaking, cross-network play, and communications.”

The guide presents these as sequential steps of maturity. In my experience with growth, 1 and 3 came before 2, since generating per-user state was relatively resource intensive. Also, we could start with relatively naive approaches to 2 and 3, eg friend recommendations by a static topic like “sports”, and then layer on more sophisticated alternatives, eg per-user behavioral predictions.

# Connecting to people

LiveOps has a **user-centric** perspective: “LiveOps developers know that players and communities evolve. When creating a game, we’re not movie directors with a singular vision, but more like TV network program managers … LiveOps games are player-centric and react to player desires and needs ...”

I’m a fan of a customer-centric perspective. Differentiating user-centric seems like it should be obvious, but it’s nice to see it emphasized.

My recent experience is in growth as a service, which is why I differentiate “users” from “customers” (Customers would be apps that have users/players.)

## Acquisition

“With LiveOps, acquisition is an ongoing process” I guess this recognizes that people may come and go from a game, although in the terminology I’m familiar with, returning would be “resurrection” or “reactivation”. (“Reactivation” is listed later as an example of acquisition.)

I appreciate the list of common acquisition sources:

- Store discovery
- Public relations
- Advertising
- Cross-promotion
- Influencer marketing
- Social installs, eg shares
- Reactivation

Helpful tip: “Track player engagement and retention based on source of acquisition and look for trends” Platforms providing acquisition channels should also provide attribution, eg [Google Play Store’s campaign attribution](https://developers.google.com/analytics/devguides/collection/android/v4/campaigns#google-play-campaigns) passed to [Android’s Install Referrer API](https://developer.android.com/google/play/installreferrer/library#install-referrer).

Kind of obvious, but the guide recommends A/B testing reactivation inducements. Later the guide simply recommends testing everything all the time.

## Retention

Retention is “one of the only data-supported ways to know if players enjoy playing“

Common techniques for increasing retention:

- Adding content
- Stickiness due to **investment** \- this comes up later in the "conversion" section
- Social connections
- Compelling game mechanics, eg Go has “simple rules that allow for endless new strategies”

Helpful tip: “Try to communicate only what’s interesting and valuable, and mix up rewards so they don’t become background noise” I’ve heard this phrased as “fatigue” Messaging platforms should provide features to help customers avoid fatiguing users.

## Engagement

The definition of “engagement” or “active” usage is often mysterious to me, so I appreciate the general description: “Active communities engage with a game by playing, providing feedback, and promoting (discussing online or in person, creating fan content, and so on) … Common reporting period intervals include 1-day, 7-day, and 30-day.” An arbitrary [post](https://medium.com/@sm_app_intel/what-app-developers-should-know-about-the-monthly-active-users-mau-metric-4a92d95db4bd#:~:text=This%20is%20the%20most%20widely,to%20other%20apps%20and%20companies.&text=Within%20the%20last%20month%3A%20Customarily,which%20you're%20calculating%20MAU.) from SurveyMonkey has some context for MAU.

Interesting: “engagement is the only KPI that some studios measure.“

Another relatively obvious tip: “Look at how studios with games like yours engage their community as a baseline for your own engagement efforts”, ie “competitive analysis”. But still, as a general primer, I appreciate the comprehensiveness.

## Support

“Your team needs the tools to isolate and identify problems, fix or escalate them ... and communicate with players throughout the process.” 👍

Common tools:

- External-facing ticketing, so internal and external actors can coordinate
- “ ability to look up individual player profiles and make manual changes”. Ideally, a customer can do this themselves.
- “A way to suspend or ban players”
- “A way for players to upload crash logs” Seems this could be automatic, eg Crashlytics
- “Ways to send messages to players” (and customers)

Good tip: “Changes in support contact and resolution rates (e.g. number of support tickets opened and closed) can indicate larger issues.”

# Data

## Analytics

I like the list of common metrics:

- “ **ARPU** (Average Revenue Per User) … general business health“. I’m guessing [percentiles](https://www.google.com/search?q=percentiles+vs+average) would be good too
- “ **ARPPU** (Average Revenue Per Paying User) … for gauging monetization strategies, such as store design or DLC“
- (from the monetization section) “ **Paying rate** is just as important as ARPPU for measuring monetization” I get the impression paying rate refers to the percentage of users who pay for anything
- “ **Unique Logins** …  indicates newly acquired players”
- “ **Conversion Rate** … success at converting free players into paid players.”
- “ **Retention** … how well your game keeps players interested”
- “ **Average Session Length** … how long your gameplay loop stays fun”
- “ **Session Frequency** … how often players engage with the game”
- “ **LTV** (Lifetime Value) … the total number of unique players divided by total revenue generated”
- “ **Errors** … how stable your game is”
- “ **Content Logs** … popularity, stability, and engagement of specific game content” This seems relatively game-specific, but I guess it could be generalized to feature-specific metrics

Good point: “Some metrics are best reviewed over long periods of time (e.g. Avg. Revenue), while others benefit from constant real-time updates (e.g. Errors)” And this may change over time, eg crash rates while changing a flag value.

Interesting: “Instead of boosting acquisition through marketing or app store advertising, they built traction by focusing on early retention metrics such as daily active users, session length, and crashes“ and “direct player feedback”

Good idea: “implementing direct player feedback through a public Trello community board,  letting users log bugs directly, and holding community votes on what to work on next.“

Good point: “Knowing your retention rate is important, but offers no insight on how to fix it. For that, you need to do a deep drill-down or segment your audience and experiment.”

## Segmentation

“Segmenting groups is a necessary step to deliver the best content to the most players”

Good tip: “your analytics toolset should let you define custom segments”

Common use-cases:

- “Designers segment players based on in-game behavior to understand their needs and develop player-centric content” presumably to increase retention
- “Monetization teams use segments to understand spending patterns, identify fraudulent behavior, and predict revenue”
- “Marketers create custom segments and optimize messaging for each to acquire or engage players”

“The most important thing about the testing aspect is the cohort and the segmentation ...” 🤔 I guess an example would be identifying a low spending segment to test a feature to increase spending, as opposed to testing it on everyone, some of whom may already by spending a max.

A basic funnel:

- New users
- Non-spenders
- Spenders
- High spenders

“Once you \[define a funnel like this\], it’s easy to track your progress getting players to move through the funnel from one segment to the next.”

Good tip: “machine learning can help you automatically segment players”

## Experimentation

“Good experiments have a hypothesis or some sort of goal KPI to change” 👍

I’m glad this is stated: “The size of your audience can affect how complex your testing can be. A game with millions of players can easily test subtle changes, but one with a smaller audience will only get significant data from tests with stark variations. The same goes for how many tests you can run simultaneously—a smaller player base means fewer simultaneous tests are statistically reliable.” I’d also say an opinionated approach, direct feedback and/or severely limited test concurrency can be a more efficient guide for a small user base than cluttering code with conditional logic and waiting a long time for significant data. Nice: “monitor user feedback ... when player data is in short supply.”

Good tip: “be sure the test encompasses at least a whole week to measure fluctuations between weekday and weekend players” and users in different regions.

Interesting: “Make sure if one player sees something different from another, they can clearly understand why” I wonder if an example would be providing UI to list active experiments.

In-game surveys should “only ask one question at a time”

“Failed experiments are an important part of the process to learn” 👍

Best practices:

- “Learn which metrics best capture performance for your game’s KPIs,and set appropriate periods to monitor and review them”
- “Test gameplay mechanics early. It’s harder to test changes … after players have developed expectations” Reminds me of changes to Twitter UX basics, like changing the ⭐️ → ❤️
- “When players have problems, analyze event history ...” which implies an ability to collect and analyze such history is important, which may not be obvious before an issue happens
- “Use limited-time events to test changes to gameplay—players are often more tolerant of gameplay changes when called out as events” Good idea. Reminds me of sports-based features, eg World Cup. I hadn’t thought of them as an opportunity to experiment w basic mechanics.
- “Chart out the “funnel” progression for players in your game and experiment with ways to motivate players to move through your funnel”
- “Ensure your analytics tools let you view KPIs by segment”
- “Establish a clear success metric to gauge the impact of tests”
- “Test qualitative factors by polling players with in-game surveys”

# Launching

“It helps to put together a designated LiveOps team” I’ve also seen feature teams own their launches.

This seems like a launch checklist:

1. Feedback loop and KPIs
1. Support channels and data access guidelines
1. Incident response strategy

## Soft launch

Example soft launch: “choose a smaller geographic area, ideally with the same language as your core audience … and run your game for a few months” or “ limiting your initial audience with an Early Access or Beta period”. EAP and beta are something I have more experience with.

Good idea: “pay close attention to the core engagement metrics” for soft launch

Good idea: “During soft launch, confirm that you can update the game without causing disruption to players – and make sure that you can roll back changes if problems arise during deployment”, ie verify LiveOps infra works as expected.

“Many developers are moving away from soft launches in favor of lean launches“ 🤔… “As a small, indie studio, you don’t have the money to do user acquisition for a soft launch”

## Lean launch

A lean launch:

1. deploys an MVP version of the game
1. connects with a target audience, and then
1. tunes the game based on player data and feedback

Requirements:

- reliable data pipeline
- smaller manageable audience without inflated expectations
- be able to adapt your game quickly

“Collecting and analyzing your crash data and retention metrics is a must”, which is “ dependent on an effective LiveOps pipeline that allows for developing several pieces of content at once, and agile deployment”

## Best practices

- “Assemble a LiveOps team”
- “Develop a calendar” to coordinate live updates post-launch
- “Put validation checks in place” I guess because this approach is premised on making lots of significant changes, so the cost of failure is high
- “Rehearse key LiveOps tasks”, which is good advice, but kind of contradicts an earlier statement “There’s no such thing as a dry run in live games”
- “Ensure your team has a way to roll back changes ”
- “Set roles and permissions”

# Game updates

“Game updates aren’t limited to new levels or game mechanics. They can consist of new items for purchase, events, balance patches, bundles, or anything else that encourages a player to come back and play more.”

“Understanding your player base is a key element in designing and delivering relevant updates”

“Frequency and consistency are as important as quality when making updates”

Tip: experiment with time between updates in addition to the update content “to see if they impact engagement or retention.”

“save client updates for entirely new features or large assets … assets such as art and gameplay logic are included in the client, but how those assets are displayed to players is driven by server-side logic … plan your content architecture in advance and move as much of your game logic as possible onto the server or cloud.”

## Best practices

- “Make a list of everything in your game that could be considered ‘content’”
- Plan how content will get to the client 👈
- “Think about offline mode” 👍
- “Vary your updates” between temporary and permanent changes
- “Consider targeting new content to specific player segments”
- “Consider cloud streaming or downloading assets in the background during gameplay to reduce friction”

# Events

“A live event is any temporary but meaningful change to a game’s content”

“Anything can be an event ... Timebox it, reward it, there you go ...”

“Successful events often include:

- A measurable goal ...
- A limited-time period ...
- Engaging themes and content ...
- Surprise and predictability ...
- A sense of community effort ...
- An effective means of communicating with players …”

Reminds me of a “campaign” in other applications of targeted content.

Experiment w event frequency: “ By experimenting with event timing, they were able to settle on an event schedule that raised their baseline engagement while also minimizing lapsed players”

“Consider running repeatable events … Holidays work because players will be more understanding of temporary changes, and often have more time to play”

“Adding a special, limited-time leaderboard for a specific in-game goal is a common event.”

“Events can also run in parallel”

## Calendars

A calendar can help reduce the complexity of orchestrating events and avoid fatiguing users.

## Communication

“Great player communication is critical to the success of live events”

Push notifications, email and social media are common channels of event communication.

## Best practices

- “Make a list of everything you might want to change as part of an event”
- “Prepare to run events from the server, without a client update”
- “Find natural ways to promote upcoming events in-game”
- “Capture event data in your data warehouse“ for later analysis and segmentation
- “Let your team be flexible when creating events” This seems like basic team management; micro-managing is bad
- “Set goals for events” so we can evaluate performance
- Maintain a calendar for coordination and to avoid fatiguing users
- “Use events to experiment with ideas”
- “Establish an event framework” that separates unique and repeatable aspects of an event

# Monetization

“… every discussion about monetization should consider:

- The kind of game you’re building …
- … \[aligning\] player needs with your revenue goals …
- Ethical guidelines for monetization …
- How your competition is monetizing … “

## Microtransactions

Aka “in app purchases” 👈

Common forms:

- “Cosmetics are items that affect the physical appearance ...”
- “Account Upgrades are permanent enhancements to a player account ...”
- “Consumables are items that can be used once for a temporary effect ...”
- “VIP Programs are subscription-based programs ...”
- Content Access
- “Random Boxes (or loot boxes) are items players can purchase without knowing exactly what they’ll receive”

Common “elements of in-game store management:

- Presentation … should be easy to use ...
- Catalog management … (A good rule of thumb is once a week.) …
- Pricing …
- Offers and promotions …
- Fraud … As soon as you start offering items with real-world currency value, there will be fraud …”

Nice: “Use server-side receipt validation … for added security”

## Conversion

I really like this topic. From the growth perspective, this is part of acquisition.

“two main challenges:

1. eliminating the barriers to entry
1. showing your players value”

The first one I’ve come to see a fundamental product consideration. If we want people to do anything, we need to minimize the cost of doing that thing. I think this also ties into an engineering best-practice: keep migrations and changes separate.

Regarding the second point, I think a great counter-example is a paywall before showing any content. “players have more of a propensity to pay once they have a trust

relationship with the game and the developer”

### How players spend

I don’t have experience with in-app purchases, so this is all interesting.

“Players will have different levels of spending they are comfortable with”

“It’s easy to get caught up focusing on big spenders or trying to sell as much as possible as soon as the game launches. But those methods are often unreliable,

unsustainable, and may reflect poorly on your studio” Reminds me of low-quality ads, which eventually drive users off the platform.

“Build a broader, more reliable, and engaged spending base rather than chasing whales’ … A thousand players paying $10 is preferable to ten players paying $1000 because there is more opportunity for repeat purchases.”

## Advertising

“One of the most popular forms is **rewarded video**—short videos often promoting a different game or app, watched for an in-game reward or more playtime … \[beware\] players might be lured away by a competitor’s game.”

“As with almost every other LiveOps effort, you need to continuously test different solutions.”

Good idea: ”Many developers segment their audience and only show ads to certain segments, often limiting them to non-paying players.”

### Targeting

“You can usually do an on-the-fly calculation to compare the value per impression of an in-house-ad versus one from an external network, so you can decide what to show for a given player segment.”

## Economies

“Many games use two virtual currencies: a “soft” currency earned ingame, and a “hard” purchased currency”

“Build a matrix of all the sources and sinks for in-game resources and build a model of the economic activity you can adjust in a tool such as Microsoft Excel, without rolling out updates.” I’ve heard of managing config this way.

“What we want is sustained investment and signs that a player has really perceived value...”

### Best practices

- Chose a strategy
- Set ethical and quality guidelines
- Prevent fraud
- Simplicity and variety
- Bundle commonly purchased items
- Pair sales with events ← this reminds me of the growth practice of requesting feedback when engagement is high
- Incentivize social sharing
- Diversify ad networks
- Keep loss aversion in mind
- Always be testing “Never stop testing your monetization efforts, because your players’ perception of value (both real-world and in-game) will change over time“

# Multiplayer

“... detailed documentation on multiplayer architecture at playfab.com/multiplayer”

## Leaderboards

“As soon as you add a leaderboard in a game, even if it’s a single-player game, players start seeing progress against other people, and people all of a sudden start engaging more” Makes me think there are mechanics for games based on human behavior comparable those used by growth features. For example, leaderboards increasing engagement highlights a human response to hierarchy.

Filtering makes leaderboards more fun:

- Geo
- Platform
- Mode, eg player-vs-player
- Option, eg difficulty
- Level
- Statistic, eg # wins
- Time, eg stats for today

“combining the variables Platform, Level, and Statistic you could create a leaderboard for ‘Fastest time (Statistic) to complete Ventura Highway (Level) by PC players (Platform).’”

Leaderboards can also encourage social behavior, eg biggest contributor to team

An ability to reset the leaderboard can encourage participation

Award prizes based on achievements shown in the leaderboard.

## Groups

“Groups … can get players more invested in a game”

Some group dynamics:

- Communication
- Game progress
- Stats

I wonder if these can be used for other groups, eg a working group.

Interesting: “Determine how short-term groups are formed based on how much players need to trust teammates to succeed … “

“Long-term groups (such as guilds) have been proven to increase player retention ...” Seems like a form of “investment” that makes an app stickier. The fact that it was “proven” makes me think there might be papers to read.

“... how do I provide you the best experience not only within your guild, but when your guild is gone… It comes down to matchmaking … the right aspiration together as a group.” Reminds me of work dynamics.

## Managing communities

“A dedicated community manager can help keep players satisfied and foster a positive community ...” Reminds me of the dev “advocate” role

Some ways to avoid bad behavior:

- Limiting communication options
- Filtering words and phrases
- Defining a code of conduct

“The team behind Guild Wars 2 reportedly built the whole game around the idea that ‘players should always be happy to see one another.’” :)

“The more you can provide a framework for people to operate in, the more likely they are ...“

## Localization

“50% or more of online users will only buy when presented offers in their native language.”

Good idea: given the localization team access to edit strings

“Store as much of the in-game text on the server as possible, so it can be easily edited and localized”

## Best practices

- Consider multiplayer early in development
- Add multiplayer elements whenever possible
- Experiment with matchmaking algorithms
- Plan for multiplayer scaling needs
- Offer multiple ways to communicate
- Enable customization of groups, to increase engagement
- Reset leaderboards on a regular basis
- Award prizes based on leaderboard stats
- Enable users to “refresh” game to explicitly load new config
- Localize communications(!)

# Tools and services

The guide lists PlayFab’s API, but I think it’s more interesting as an overview of useful entities and controls:

- Auth
- Content
  - Game content
  - User generated content
- User data
- Matchmaking
- Leaderboards
  - Tournaments
  - Reset schedules
  - Prizes
  - Fraud prevention
- Communication
  - P2p
  - Text and voice with transcription and translation
  - Accessibility (speech to text and vice versa)
- Eng controls
  - Config
  - Reporting
  - Events
  - Automation
  - Scheduling
- Product & community controls
  - Reporting
  - Event log
  - User management
  - Automation
  - Scheduling
  - Segmentation
  - Experimentation
  - Messaging
- Economics controls
  - Stores
  - Sales
  - Economy
  - Fraud prevention
