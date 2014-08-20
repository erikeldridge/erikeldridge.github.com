---
layout: base
---


# Feature toggles

* toc
{:toc}


## Goal

Enable/disable features independent of release dates.

Enable developers to merge unfinished features safely into master.

Define a single system controlling feature availability


## Unique id

Define a unique id for each feature


## Toggle fields

Define fields to toggle on, eg:

- percentage availability
- os type
- os version
- app id
- app version
- user id
- guest id
- user type
- user preferences
- user language
- geo
- promotion


## Inputs

### ID

Use the guest or user id to partition users. If a user is in the enabled pool, activate the feature.


### Client

Parse the user agent string into toggle fields


### Geo

Resolve the client's IP to a location using a geocoding tool like Max Mind, Foursquare, etc.


### User type

If the user object has attributes, eg is_new, language, preferences, etc


## Selection

Filter features according to the toggle fields and inputs. The feature is unavailable if any test fails.

List all available features in a client's config, keyed on the unique id.


## Developer usage

Client developers wrap features in a check function that takes the unique id as a param


## Business usage

Provide a dashboard non-engineering can use to define campaigns


## Testing

Enable campaign targeting to be applied transparently and log usage that would have been affected to sanity-check rules


## Consistency

Cache state for a period of time to ensure the user has a consistent product experience.


## Applications

Prompt targeting, feature targeting, A/B testing, customization, ad targeting, etc.
