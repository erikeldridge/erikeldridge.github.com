---
title: Adventures in academic advisory
date: 2018-03-10 17:33:32 -0800
tags:
- academic
- advisory
- interests
layout: post
---
## Problem

How can students in a standard CS program prepare for the job market, and how can faculty help them prepare, in a way that's efficient for all involved (students, faculty, industry)?

## Solution

Tldr: Faculty and industry should **standardize** approaches (to scale and avoid corporate bias) and provide **material support**, eg scholarships, resources and jobs (to avoid institutional bias in traditional hiring). Students should focus on **academic performance** (implicit interview prep) with their **interests** (aka "passion") and **collaboration** (we work in teams) in mind.

### Soft-skills

Software development has a large collaborative component. Soft-skills like interviewing, resume tuning, mentoring, reviewing code, etc are extremely important, but not formally covered by a standard CS curriculum. A regular meeting devoted to this enables students to develop these skills and helps scale administrators' time by allowing industry representatives to drop in with minimum coordination. [CSUMB's ABCs](https://csumb.edu/scd/academic-support-services) is a great example.

### Internship symposium

Accelerate cultural normalization by hosting a showcase at the end of the summer intern season in which interns can share their experiences with other students. [CSUMB's 2017 CS internship symposium](https://twitter.com/erikeldridge/status/901681673066053632) was a great example: each intern presents a very brief overview to the whole group in a "firehose" format, an industry representative presents a keynote and then the group breaks into a poster session.

### Academic advisory panel

Enable industry to describe needs in a scalable way by hosting an annual panel and inviting industry to attend.

### Campus advocacy

Industry can scale university hiring by empowering employees to identify and advocate for campuses and team up with other advocates. Help these teams by providing academic content (for teaching classes) and material support to relay to students, eg scholarships, technical resources, on-campus interviews, etc.

### Community

Nurture the tech community near campus by hosting events like hack days, unconferences, and meetups.

### One thing well

The ["one thing well"](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well) phrasing comes from Unix philosophy, but I think it works for career planning too. Pick something interesting to you and bias towards it, eg I want to develop mobile apps. Use this to guide your career, eg the classes you pick, questions you ask, interview questions you practice, code you push to github, tldr on your resume, meetups you attend, projects you volunteer for etc. This is what's described as having "passion" for a topic, a "north star", or "goals" :)

You can always tune this focal point, eg I want to develop mobile apps --> I want to develop apps on Android, but consistency will help push back against day-to-day distractions.

Actually being able to do this thing full time for work is also a matter of luck, but you'll be best prepared when opportunity comes along.

"T-shaped" focus refers to doing one thing well, but being aware of related skills, eg I specialize in Android, but I'm familiar w service development enough to help debug network requests made from my Android app.

### Log

Regularly noting what I work on has a couple benefits:

1. Artifacts of work, eg git log entries, task tracking cards, etc, may not succinctly capture the intent of a significant project, ie they're often too granular
2. I often forget what I worked on, and who I worked with, over time

I find a weekly log in a doc to be just right. I can review last week's entry on Monday to remember what I was working on, and I can review the log on Friday to add details. Note how this aligns with the Agile pattern of kickoff and demo. Making the log public to my team also helps provide context if I'm unavailable.

I like this format:

    2018-02-04
    
    Auth project
    * Fixed bug 123 with Sarah and Sidhant preventing people from signing in: git.io/a1s2d
    * Continued adding auth-specific config to remote config response so we can control steps in the flow
    ...
    
    Organization
    * Interviewed three candidates for Android role
    ...

Periodically aggregating this log makes it easier to keep a resume up to date, and can highlight patterns. I like quarterly aggregation, which aligns with a biannual feedback cycle commonly used by large companies. For contrast, without a log, I'd have to think back over six months and try to remember what I did to argue persuasively for a raise.

I collect aggregates in a spreadsheet, which enables me to group by date, keyword, project, goal and/or collaborator, so I can gauge progress against a career ladder and structure for a resume.

### Sharpening the saw

Unscheduled time is a common occurance. For example, as a project nears release, it may make sense to reduce the number of people involved; in the absence of another priority, people will have free time. (The time spent looking for a job might be described as an extreme example.)

Productive uses of this time include: moving into a support role for those still involved, testing and documenting the product, supporting customers on stackoverflow and github, training in new skills to "sharpen the saw", hackweek, stretching entrepreneurial muscles, switching from [the "productive zone" to the "learning zone"](https://m.subbu.org/accept-tentative-decline-f12185b31259#a012), etc.

This ties into "ownership" too; rather than wait for someone to tell you what to do next, you can use the time to advance toward your goals.

### Discovery

Help opportunities find you by populating a linkedin profile, which recruiters mine for leads, and hosting code on github, which interviewers can use to start establishing rapport. Follow [Write/Speak/Code's](http://www.writespeakcode.com/) example by publishing professional ideas, eg via a github blog, and seeking feedback from trusted peers, eg friends in your CS classes. (Credit [@megha](https://twitter.com/megha) for attending and sharing with our team.)

### Interviewing

The interview process attempts to approximate the experience of working together such that the interviewer can recommend the interviewee for a job after a brief conversation.

An interviewer's day-to-day work is usually private to a company and/or difficult to abstract for an interview, so CS basics may be the only thing in common between the interviewer and interviewee. Prepare by reviewing a book like Algorithms for Interviews, Cracking the Coding Interview, etc and practice solving problems on a whiteboard with other people, eg the "soft-skills" program mentioned above, your campus' ACM chapter, etc. The goal is not to memorize solutions, but to gain experience breaking down problems, solving them collaboratively and producing a solution that's understandable by other people.

I've found interview prep can also motivate academic requirements, ie "When will I ever use this? In an interview." Students are actively steeped in CS basics; the books mentioned above just summarize and provide interview-specific context.

Two consistently high-performing groups of people I've interviewed are Waterloo interns and folks with competitive programming, eg [International Olympiad in Informatics](https://en.wikipedia.org/wiki/International_Olympiad_in_Informatics), experience. The former has a ton of experience [interviewing](https://uwaterloo.ca/co-operative-education/get-hired/interview-process/interview-process-and-procedures). The latter has experience using algorithmic thinking and a standard language to solve problems as a team under pressure.

Interviewing is similar to pair programming in that two are involved, but one person is "driving". The interviewer may look to you for motivation, eg "Is this applicant self-motivated?", be inexperienced and/or slammed with work, so prepare to humbly take a lead role in identifying the problem, implementing the solution and asserting correctness.

"Think out loud" when solving the problem. Write intermediate steps on the whiteboard and ask the interviewer if you're on the same page. An interview is not like an academic test in which we work alone.

Typically, a hiring team will schedule an initial phone interview using a shared text editor like [collabedit](http://collabedit.com/), and then invite the applicant onsite for a day of in-person interviews with \~5 engineers and managers. At this point, practice is less important than responsiveness to coordination emails and getting sufficient food and sleep to think clearly under pressure, especially since we often interview with multiple companies in unfamiliar places simultaneously.

Interviews are also intended to give applicants a chance to see if the team seems like a good fit, so prepare questions, eg "What is your development process like?", "Do you use any externally-available tools I can learn about before I join?", "Are there any tools/patterns you use you think everyone should know about?"

Some companies are better than others regarding follow-up after an interview. Reach out to the recruiter you've been working with if you haven't heard back after a day or so, and especially if one company extends an offer, but you'd prefer to work at another you haven't heard back from.

### Ownership

To perform well in an interview and the workplace, we must demonstrate an interest in the role, even if it’s just a connection with a personal interest. [ABC: Always Be Coding](https://medium.com/tech-talk/d5f8051afce2) and [The ten principles for growth as an engineer](https://medium.com/@daniel.heller/ten-principles-for-growth-69015e08c35b) describe this well.

### Customer focus

In my experience, this is a great focal point, eg when prioritizing features. A student can [be her own customer](http://paulgraham.com/startupideas.html) initially.

### Code review

Prepare for the experience of having your code read by others by pushing code to github and seeking feedback from classmates. Use a styleguide ([example](https://google.github.io/styleguide/jsguide.html)) to get ideas about what to review for, and, ideally, what can be [automated](https://medium.com/@mikeal/modern-modules-d99b6867b8f1#6d53) ([example](https://github.com/google/eslint-config-google)).

### Source control

Incremental development and the ability to revert changes is fundamental. Git and github are a great default choice. Use source control individually to ensure your project is always in a working state, and to simplify coordination on team projects.

### Incremental development

Philisophically: progress > perfection.

Pragmatically, this refers to reducing risk by keeping changes small and maintaining a working product you can "ship" at any time. [Agile development](https://en.wikipedia.org/wiki/Agile_software_development) defines this formally, but I see this pattern applied broadly: in test-taking when solving easy problems first; in interviews by describing a solution verbally, then in psuedo-code, then with correct syntax, then with optimizations; in the workplace explicitly when scoping a change to commit to source control; in career planning by defining a goal and then building skills and choosing opportunities to advance toward that goal; etc.

In general, it's easier to estimate the cost of a small change than a large change, so breaking up large changes into small changes is helpful. I've found a one week "cadence" works well for making progress and minimizing coordination effort.

### Maker & manager schedules

[Paul Graham's "Maker's schedule, manager's schedule"](http://www.paulgraham.com/makersschedule.html) essay persuasively argues wricting code and meeting with people require fundamentally different forms of attention. Both are important, mutually incompatible. [Subbu Allamaraju's essay "Accept | Tentative ✓ | Decline"](https://m.subbu.org/accept-tentative-decline-f12185b31259) also addresses this topic. Carve out "no-meeting" blocks on your calendar for focus work.

### Reduce chaos

I first heard this phrase in the context of advancing a tech ladder ([example ladder](https://github.com/urbanairship/techladder/blob/master/eng.md)), eg senior engineers reduce chaos from a system, but I think it's broadly applicable for career (and life) planning: identifying a personal career goal (see "one thing well" above) to buffer against corporate goal fluctuation; saving an emergency fund to buffer against employment fluctuation; diversifying investments to avoid single points of failure; etc.

### Pre-college

From [article on Vietnamese education](http://neil.fraser.name/news/2013/03/16/) wrt Google’s hiring criteria: "There is no question that half of the students in that grade 11 class could pass the Google interview process."