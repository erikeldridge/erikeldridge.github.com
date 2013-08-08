---
layout: note
updated: 8-6-2013
---


#### Managing external contributions

Conceptually, management can be broken down to enabling self-determination and providing community.

Goals:
* Consistency
* Scale
* Professional development
* Freedom
* Safety


##### Self-determination

To commit to making a reasonable change in a project and not being able to contribute is frustrating and complicates planning. The core team should define a clear path for contributors.

This path should cover accessing, setting up, modifying, building, commiting, and releasing changes.


###### Getting started

To get started, we need information, so create discoverable documentation, host training, define starter projects new contributors can pick up, and provide a forum for asking questions efficiently.


####### Discoverable documentation

Folks new to a given code base should be able to find the on-ramp independently.

Example:

Use a common publishing platform for documentation in the company, define a top level page for each code base, link to the getting started documentation from the landing page.

Goals:

* Ability to self-start

Requirements:

* Consistency across teams


####### Classes

Run periodic, structured classes for training new contributors.

Examples:

* Once a quarter, host a tech talk over lunch
* Define a one week course covering: general concepts --> project specifics --> initial bug fix

Goals:

* Efficient communication of best practices
* Professional development

Requirements:

* Time budgeted from student's team to do homework
* Access to project code
* Access to starter project list


####### Starter projects

Maintain a list of easy changes appropriate for new contributors.

Examples:

* Small string change
* Improve test coverage
* Fix small bug

Goals:

* Familiarity with non-development aspects of contribution
* Demonstration of good will by improving the code base

Requirements:

* Low time pressure
* Low complexity


####### Getting help

At some point, new contributors will need help. Provide an efficient way to get it

Examples:

* Providing a searchable FAQ, chat room, and/or mailing list
* Defining office hours // idea: office hour rotation
* Publishing a public index of subject matter experts (SME)

Goals:

* Efficient information sharing
* Help resources that grow as the contributor base grows, i.e., as new contributors join, the load on existing developers should decrease

Requirements:

* Budget time for providing help


####### Learning more

Example:

* Defining a recommended reading and viewing lists
* Encouraging contributors to share learnings with the group

Goals:

* Professional development
* Improved quality in the product
* Talent acquisition


###### Building

Anything required for building the project should be straightforward. Anything unintuitive will slow those asking and answering questions.

Examples:

* Using a common toolset
* Providing a set up script

Goals:

* Efficient development
* Ability to use external support sources

Requirements:

* Time budgeted to improve build systems


####### Stable env

Consider external contributors when scheduling large, breaking changes

Example:

* Avoid merging changes that break the env just before a deadline affecting contributors.


####### Supported editor

If particular editor exists for the type of code in a project, and a significant number of people use it, support it.

Examples:

* Using Android Studio for Android work
* Creating a set up script for editor configuration


###### Committing

Anything required for committing code should be straightforward. Anything arbitrary will slow the review process


####### Rational

The rules should be rational. Avoid superstition. Learning the rules should improve a developer's skill set

Goals:

* Efficient code reviews
* Professional development

Examples:

* Basing style rules on Java recommendations
* Documenting the rationale behind non-obvious rules


######## Consistent

The rules applying to the core team should be as transparent as those applying to external contributors. All contributing teams should be following the same rule set.

Goals:

* Contributing teams can plan effectively
* Fewer questions about, and requests to bend, the rules


######## Programmatic enforcement

Ideally, we could programmaticlaly enforce everything we care about. Baring that, we should prog enforce as much as possible

Goals:

* Less explanation
* Less to review
* Fewer errors in review
* Reduced stress on reviewers
* Source-control rule definitions
* Consistency

Examples:

* Using checkstyle to enforce and guide style guidelines
* Using lint and FindBugs to detect syntactic errors
* Using tools like Flog, Reek, JSHint to perform cyclomatic complexity analysis
* Using tools like emma and rcov to quantify test coverage
* Defining a build tool, like gradle or ant, to run all the programmatic checks; using this same tool in CI


######## SME

Define a subject matter expert (SME) for each core component of the project, and publish the list of SMEs. There should be no mystery about who to talk to regarding significant components in a project.

Goals:

* Efficient, self-serve question routing and review composition
* Structured escalation path: peers --> SME

Example:

* Defining a default owner for tickets tracking bugs in a given component
* Publishing a list of SMEs and their corresponding areas of expertise
* Generating an SME list dynamically

Requirements:

* Willingness to specialize in a core component


###### Releasing

Contributors should be able to easily find and comprehend the release process and schedule.


######## Clear process

Simply state the intended process.

Goals:

* Consistent application
* Self-serve


######## Automate

As much as possible automate the release process.

Examples:

* Pushing to alpha channel from CI every night, beta every week, production every other week

Goals:

* Reduced stress on human gate-keepers


######## Platform-appropriate

Take advantage of all the features available for releasing on a given platform

Example:

* Pushing to the Google Play store relatively frequently because it doesn't have a manual review policy and supports auto-update
* Using the Play store's multiple release channels to get feedback

Goals:

* Rational release process


##### Community

The community supports the individual and is larger than the individual. Belonging to a community feels good. As contributors join the community, they should be encouraged and required to share the cost of production.

Goals:

* Team pride
* Efficient information sharing
* An increase in the scale of achievable goals
* A decrease in the work load for members of the community


###### Shared cost

Production requires effort in the form of code reviews, bug triage, incident response, and developer support. As contributors join the community, they should be able and encouraged to help in this effort.

Goals:

* Increased familiarity with the code base
* Decreased work and risk for existing community members
* Increased production capacity


####### Code reviews

If manual code reviews are a component of production, enable contributors to participate.

Define a two-step review process: peer review and approval. The first step is for a contributor's peer, who should be familiar with the contributor's goals, to review the contributor's work. After the peer confirms correct implementation, the approver reviews the change with project-level considerations in mind like architecture, release plans, conflicting planned changes, etc.

If new reviewers are intimidated, encourage them to ask questions. What is this supposed to do? Why are we implementing the change in this way? The contributor producing the change should be able to provide clear answers, and the act of answering often helps shake out unknowns in the solution.

If the contributor's team plans on producing lots of code, over a long period of time, it may make sense to become an approver. Define a path to achieving this, such as:

1. Take the introductory class
1. Answer n questions
1. Review n changes for peers without incident
1. Produce n significant changes without incident
1. Participate in on call rotation
1. Participate in bug triage
1. Commit to involvement for n months
1. Approval based on vote by existing approvers

Note these all involve sharing the cost of production and building trust. Many can be programmatically quantified.

Provide feedback to those working toward approval status to enable efficient progress.


####### Bug triage

As bug are reported, one or more people must triage them. As the community grows, more people become eligible to help.


####### On call

Increasing contributors and contributions rapidly is risky. To offset this risk, enable contributors to participate in the on call rotation.

Examples:

* Defining one week shifts
* Providing a diagnostic checklist


###### Providing help

New contributors can help other with the basics of getting started.

Examples:

* As contributors onboard, asking them to correct any errors in the documentation
* Defining FAQ resources that new contributors can reference and update
