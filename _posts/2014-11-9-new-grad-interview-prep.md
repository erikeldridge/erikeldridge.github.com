---
layout: note
tags: hiring
---


Contents:

* toc
{:toc}


## Context

These notes are focused on software engineering interview prep for new grads.


## Purpose of an interview

Interviews enable employers and applicants to see if there's a good cultural
and technical fit for a given role.

One aspect of technical fit involves how you apply your previous experience to a
new problem.

Culture fit includes how you'd lead a project, and collaborate with your
interviewers, as exmplified by your approach to solving the interview problem.


## Recruiter involvement

Recruiters are responsible for finding qualified candidates and guiding them
through hiring process.


## Flow

Here's the general sequence I've seen, both as an applicant and interviewer:

1. A call from a recuiter to establish contact and explain the process
2. A code exercise via email
3. 1-2 phone calls with engineers
4. 1-2 days of onsite interviews


## Coding exercises

Coding exercises help an employer sanity-check an application.
[Codility](https://codility.com) is one tool I've seen used.

Codility provides [practice exercises](https://codility.com/programmers/),
though I don't have experience with them.


## Phone interviews

During a phone interview, you'll be asked to write code in a shared text editor
like [collabedit](http://collabedit.com/).

Calls are ~45 min long.


## Onsite interviews

If everything has gone well, you'll be brought onsite for 1-2 interview
panels. Each panel has ~5 interviews. Each interview is ~45 min long.

During each interview, you'll write code with the interviewer. Writing on a
whiteboard is most common, though some interviewers may ask you to write/run
actual code.


## Language choice

If a role is language-specific, you may be required to write code in that
language.

In general, I've found familiarity with Python to be helpful, for phone and
onsite interviews, given its terse, self-documenting syntax.


## Practice questions

Ideally, the questions in an interview relate to the role. So, to prepare for,
say, an Android interview, study the Android documentation, build a practice app
to ground your experience, and note any questions you have (so you can discuss
in your interviews).

Your interviewer may also ask general academic questions. Your
coursework should prepare you for this, i.e., review your algorithms, data
structures, and software design coureswork and notes.

Product familiarity is also important. Why do you want to work on this project?
What would you like to work on? Is there a feature you'd like to add, or a bug
you'd like to fix?

I'd recommend practicing all the above with your classmates. Writing code in
front of another person, let alone someone you don't know, and with unfamiliar
tools, can be stressfull, but practice can help.

Warming up for an interview is great, though there is such a thing as too much.
As with tests, make sure you get enought sleep, eat before the interview, etc.


## Strategy

Locking up is a common pitfall. To avoid this:

1. verbally describe the steps you'd take to solve the problem, ie
   your algorithm *
2. ask your interviewer if your approach is consistent with the interviewer's
   goals, e.g., "is this what you have in mind?"
3. write down, i.e., document, your algorithm
4. implement your algorithm **
5. test your implementation by stepping through a common case and verbally
   what each step does

\* if you're completely stuck, describe a similar problem and work with your
  interviewer to find commonalities.

** if you're unsure of any syntax, make an assumption, communicate your
   assumption, e.g., "I believe list.sort() accepts a comparison function.
   I'll assume this for now. In the real world, I'd double check on the
   standard python docs.", and then proceed.