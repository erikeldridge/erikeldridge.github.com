---
_last_editor_used_jetpack: block-editor
_publicize_job_id: "57852970360"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - organizational-tools
date: "2021-05-01T22:24:52+00:00"
guid: http://blog.erikeldridge.com/?p=2253
parent_post_id: null
post_id: "2253"
timeline_notification: "1619907896"
title: Project governance
url: /2021/05/01/project-governance/

---
I was recently looking for an organizational pattern to 1) help design documents gain visibility, and 2) build a community of senior engineers. We have OWNERS files, but they specify lists of people for ease of maintenance, which complicates the task of finding an appropriate person to review design proposal for affected code. Engineers often have informal conversations about design options, but there's no body of expertise to query before an impersonal inter-/intra-net search. I needed something in the middle.

This search made me aware of the Fuchsia project, and in particular, [its use of the phrase "governance"](https://fuchsia.dev/fuchsia-src/contribute/governance/governance) for the the type of patterns I was looking for. In short: an ["eng council"](https://fuchsia.dev/fuchsia-src/contribute/governance/eng_council) provides "a small group of senior technical leaders responsible for providing a coherent technical vision"; a [Request For Comments (RFC) process](https://fuchsia.dev/fuchsia-src/contribute/governance/rfcs/current_rfc_process) provides "a consistent and transparent path for making project-wide, technical decisions"; an [API council](https://fuchsia.dev/fuchsia-src/contribute/governance/api_council) provides "a group of people who are accountable for the quality and long-term health of the Fuchsia API Surface. The council will collaborate constructively with the people who create and modify Fuchsia’s APIs to help guide the evolution of those APIs." The Fuchsia project recently [revised its governance model](https://opensource.googleblog.com/2020/12/expanding-fuchsias-open-source-model.html) as part of opening the project for external contributions.

Google has an [AIP](https://aip.dev/) process, which is like RFCs for APIs.

My team had an API Council, but that focused on the external API surface rather than internal technical decisions. The external focus and the fact it operated at the highest level, required more structure than could be justified for internal discussions. It was helpful to see this council in the context of governance, but I still needed a new structure.

With this in mind, I proposed an eng council structure for the team. We identified ~10 people with several years of diverse experience on the team. We have a weekly meeting, which we cancel if there's nothing on the agenda.

Interestingly, it now appears team members are better able to find reviewers outside the process, perhaps because the range of reviewers is now more well known. I've also heard from eng management that the process has helped teammates have more confidence in their projects. Also of interest, this governing body seems to have a life of its own and needs to be cared for. After several weeks of empty agendas I proposed cancelling the process in favor of exploring options, but several teammates expressed appreciation for a weekly checkpoint, even cancellation is the common outcome.
