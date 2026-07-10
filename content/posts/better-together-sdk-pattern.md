---
_edit_last: "5360656"
_publicize_job_id: "35670940011"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - organizational-tools
  - technical-tools
date: "2019-09-25T16:20:15+00:00"
guid: https://erikeldridge.wordpress.com/?p=1465
parent_post_id: null
post_id: "1465"
tags:
  - api
  - sdk
timeline_notification: "1569428419"
title: Better together SDK pattern
url: /2019/09/25/better-together-sdk-pattern/

---
I’m a fan of an SDK product pattern I’ve heard people call “better together”. The idea is for SDKs to be decoupled, but complementary.

An example is an SDK that needs telemetry. One approach would be to add telemetry to the SDK, but this has a few problems: bloat, opacity, redundancy and coupling. An app may already have a telemetry SDK installed, so bundling another with an unrelated SDK bloats the app. Data logged inside the SDK is opaque to the app, which also complicates any SDK billing story. If the SDK does want to export telemetry data, it will need to build telemetry-specific logic redundant to the app’s telemetry provider. Any telemetry logic built by the SDK is coupled to the SDK.

The better-together pattern provides an alternative. To continue with the example above, an SDK requiring telemetry could detect if a telemetry provider is installed and publish events to it. A simplistic example would be to provide a method on the SDK to set a telemetry provider, eg:

```
class SDK {
   constructor(telemetry = null);
   …
   sayHi(){
     if (telemetry) {
       telemetry.logEvent(‘said_hi’);
     }
   }
 }
 …
 telemetry = new Telemetry();
 sdk = new SDK(telemetry);
 sdk.sayHi();
```

With this approach telemetry is only included in the app if the app owner wants it, minimizing bloat. Telemetry from the SDK is visible alongside the app’s other telemetry. The SDK can focus on whatever it does best. Telemetry is reusable elsewhere in the app.

One potential downside with this pattern concerns differentiating “internal” use-cases. Continuing with the telemetry example, the SDK may want to log events that are unrelated to the app’s functionality. I’ve seen three approaches: don’t differentiate, differentiate throughout, or don’t use the better-together pattern. The first approach treated all data as belonging to the app and namespaced all events published by the SDK, which worked well. The second approach was expensive due to technical complexity and eventually discontinued. The third approach was expensive due to redundant staffing, infra, UX, etc, but necessary so long as some parties don't buy into the better-together pattern. I guess this stresses the "together" part of better-together 🙂
