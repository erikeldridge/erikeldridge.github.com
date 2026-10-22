---
title: Migrating from SQLite WASM to IndexedDB
date: 2026-10-21
tags:
  - sqlite, wasm, indexeddb, adb, chrome
categories:
  - technical-tools
---


## Context

I recently started [using SQLite WASM](../sqlite-wasm) for a test app. SQLite is great, and SQLite WASM enables me to use SQLite in the browser, which is great, but, SQLite WASM is a dependency that must be downloaded, and then interpreted, by every instance of my app. My app can cache it, but that doesn't alleviate the WASM interpretation requirement, so I explored an alternative.

## Initial Tests On An Old Pixel

I'd been prototyping with SQLite, but had only tested the app on my laptop. In retrospect, since my goal is to design for older hardware, I should have been testing each iteration on my Pixel 3a (code name Sargo) too.

I was able to access the Vite server running on my laptop from the Pixel using the local network by starting the Vite server with the [`host` flag](https://vite.dev/config/server-options#server-host):

```sh
$ npm run dev -- --host 0.0.0.0

> app@0.0.0 dev
> vite --host 0.0.0.0


  VITE v8.3.0  ready in 972 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.123:5173/  wlp2s0
  ➜  press h + enter to show help
```

Conveniently, the server logged the IP address on start so I didn't need to use `ip addr`, but since I already looked up the syntax and ran it, I'll note it here too:

```sh
$ ip a
...
2: wlp2s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
...
    inet 192.168.1.123/24 brd 192.168.1.255 scope global dynamic noprefixroute wlp2s0
```

Minor curiosity: Vite includes the interface name `wlp2s0` in its output.

The app I was testing calls an Express server, so I needed to bind that too:

```js
...
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1'; 
...
app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
```

Then I could start it like this:

```sh
HOST=0.0.0.0 npm start
```

Navigating to that address on my phone, I observed the app never actually loads!

After commenting-out pieces and reloading, it did seem related to the SQLite dependency. Since one of my high level goals was to extend device lifespan, I needed to balance search abilities with hardware requirements. In other words, the full flexibility of SQLite is great, but not if it prevents the app from loading. Since my app is just for taking notes, a more rudimentary search that only depends on browser-native IndexedDB (IDB, not to be confused with `idb`) may be acceptable.

## IDB Search

IDB doesn't provide full text search (FTS) natively, but it does support [`multiEntry` indices](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/multiEntry) mapping an array of tokens to a given record. The author of Dexie [wrote about using this for FTS](https://hacks.mozilla.org/2014/06/breaking-the-borders-of-indexeddb/) way back in 2014.

I'll approach this with a few principles in mind:

1. use the native `multiEntry` to create a disk-backed inverted index
2. use the native `Intl.Segmenter` for tokenization
3. only request the primary keys for each search and then use simple set operations to narrow results

This approach has a couple benefits:

1. using native APIs avoids expensive downloads
2. operating on minimal objects minimizes CPU load and RAM requirements

This doesn't provide sophisticated search, but it's better than nothing and uses less RAM than loading the entire search corpus into memory.

Side benefit: I can directly view IDB in the browser's developer tools, which is a lot easier than installing an extension to view the Origin Private File System (OPFS), downloading the SQLite DB file from the OPFS and then using the `sqlite` CLI to inspect the DB. I documented the latter process in [my post on SQLite WASM](../sqlite-wasm).

## Dexie

IDB has an infamously awkward API, so I'm inclined to wrap it. I've heard [Dexie](https://dexie.org/) provides a lot of utility, and the author described how to use it for FTS in the link above, so I'll try it (and test on the Pixel along the way!)

Migrating to Dexie was straightforward, so I'll just include a couple examples. Here's the initialization diff:

```diff
-    await this.db.schema
-      .createTable('local')
-      .ifNotExists()
-      .addColumn('id', 'text', (col) => col.primaryKey())
-      .addColumn('text', 'text', (col) => col.notNull())
-      .addColumn('updated', 'text', (col) => col.notNull())
-      .addColumn('status', 'text', (col) => col.notNull())
-      .execute();
-    await this.db.schema
-      .createTable('remote')
-      .ifNotExists()
-      .addColumn('id', 'text', (col) => col.primaryKey())
-      .addColumn('text', 'text', (col) => col.notNull())
-      .addColumn('etag', 'text', (col) => col.notNull())
-      .addColumn('updated', 'text', (col) => col.notNull())
-      .execute();
+    this.db.version(1).stores({
+      local: 'id, text, status, updated',
+      remote: 'id, text, etag, updated'
+    });
```

Here's the insert diff:

```diff
-    await this.db.insertInto('remote')
-      .values(metadatasWithContents)
-      .onConflict((oc) => oc
-        .column('id')
-        .doUpdateSet((eb) => ({
-          text: eb.ref('excluded.text'),
-          etag: eb.ref('excluded.etag'),
-          updated: eb.ref('excluded.updated'),
-        }))
-      ).execute();
+    await this.db.remote.bulkPut(metadatasWithContents)
```

One fun thing: I was able to effectively reuse my Kysely schema:

```diff
+import { Dexie, type EntityTable } from "dexie"
+
+type DbSchema = Dexie & {
+  local: EntityTable<LocalSchema, 'id'>,
+  remote: EntityTable<RemoteSchema, 'id'>
+}
 
 // Defines view state.
 interface Note {
@@ -24,11 +28,6 @@ interface RemoteSchema {
   updated: string;
 }
 
-interface KysleySchema {
-  local: LocalSchema;
-  remote: RemoteSchema;
-};
-...
-    const db = new Kysely<KysleySchema>({ dialect });
+    const db = new Dexie('Notes') as DbSchema;
```

## Android/Chrome USB Debugging

I'd gotten the app to load, but it wasn't fetching data, presumably due to CORS or some error. I vaguely remember being able inspect  the test device from a dev machine. To do this, I needed to have Chrome (or Firefox) on both sides. The Pixel has Chrome installed by default, so I installed Chromium on my trusty Debian Chromebook dev machine.

Next, I needed to have `adb` installed:

```sh
sudo apt install adb
```

Then I needed to start the ADB server:

```sh
adb start-server
```

Then I needed to connect the phone to the dev machine using a USB cable. I can verify ADB sees it:

```sh
$ adb devices
List of devices attached
93RAY0EQWE      device
```

Then I could open chrome://inspect on my dev machine and see the device listed. Clicking on the "inspect" link opened the inspector and ... system freeze!

## RAM Side Quest

... One hard reboot later, I was reminded of my limits. Turns out I could keep launching apps until the system grinds to a halt. 

I installed a cool, little, single-purpose package called [`earlyoom`](https://github.com/rfjakob/earlyoom) to kill any app that's about to take my RAM usage over 90%. I also installed the [Resource Monitor Gnome extension](https://github.com/0ry0n/Resource_Monitor/) so I can keep an eye on my RAM usage via a top bar widget.

Disturbingly, I could then see that just running Debian and Gnome required almost 2 GB RAM or about 40% of what I have. I spelunked a bit to see if I was doing something wrong. To [spare the eMMC storage](../debian-chromebook#emmc-wear-reduction), which doesn't wear evenly, I'd diverted a few ephemeral things like swap, tmpfs and logging to RAM, and may have naively crossed some wires, but nothing stood out. AI said it was normal for Debian with Gnome to require 1-2 GB, but it still felt like a lot. I wanted to better understand what it was being used for.

System Monitor was the first thing I checked. It conveniently listed usage by process. I didn't see anything exceptionally heavy. It would've been helpful to see a list of all RAM usage that summed to the total RAM installed, but I wasn't able to find a view like that. Apparently, it's challenging because objects in RAM can be shared and/or space can be reclaimed.

Next, I ran `free` to double check the top bar number:

```sh
$ free -h
               total        used        free      shared  buff/cache   available
Mem:           3.8Gi       1.5Gi       1.2Gi       367Mi       1.7Gi       2.3Gi
Swap:          3.4Gi       496Mi       2.9Gi
```

3.8 GB total aligns with the 4 GB this Chromebook (code name Edgar) ships with. Used divided by total results in a comparable number to the top bar, i.e., 1.5 / 3.8 = 0.4. One minor complication was that usage changed depending on the tools I was using to measure and document usage!

Next, I used `sram` to look at system-wide usage:

```sh
$ sudo smem -ktw
Area                           Used      Cache   Noncache 
firmware/hardware                 0          0          0 
kernel image                      0          0          0 
kernel dynamic memory          1.7G       1.1G     641.4M 
userspace memory               1.5G     543.7M     957.6M 
free memory                  574.3M     574.3M          0 
----------------------------------------------------------
                               3.8G       2.2G       1.6G
```

And per-process usage. Just for illustration, these were the top ten:
```sh
$ sudo smem -kt                    
PID   User     Command                            Swap USS PSS  RSS
...
47647 erik     /usr/lib/chromium/chromium         0    31.1M    53.0M   152.3M 
44624 erik     node /home/erik/app    18.4M    64.3M    72.1M    90.8M 
47597 erik     /usr/lib/chromium/chromium         0    52.7M    76.5M   158.4M 
46954 erik     gnome-system-monitor               0    60.3M    76.9M   149.6M 
47729 erik     /usr/lib/chromium/chromium         0    59.4M    84.4M   191.6M 
46916 erik     /usr/bin/gjs -m /usr/share/        0    71.9M    91.7M   170.2M 
49222 erik     /usr/lib/chromium/chromium         0    72.9M    98.1M   204.9M 
 1693 erik     /usr/bin/gnome-shell           77.6M   105.2M   129.4M   178.4M 
46738 erik     /usr/bin/python3 /usr/bin/a        0    99.7M   130.0M   238.3M 
47534 erik     /usr/lib/chromium/chromium         0   140.9M   174.8M   307.0M 
-------------------------------------------------------------------------------
  141 9                                      610.4M     1.0G     1.4G     3.5G
```

One last test: stop Gnome and then run `free`, to get a sense of how much RAM Debian alone requires. I used the Ctrl + Alt + F3 key combination to switch to the TTY interface. Then I stopped Gnome:

```sh
sudo systemctl stop gdm3
```

This caused the screen to only display black with an unresponsive blinking cursor, but pressing the key combination again brought me back to the shell where I could run `free`:

```sh
$ free -h 
               total        used        free      shared  buff/cache   available
Mem:           3.8Gi       688Mi       1.9Gi       9.1Mi       1.4Gi       3.1Gi
Swap:          3.4Gi        79Mi       3.3Gi
```

So, Gnome is responsible for 1.5 Gi - 688 Mi = 848 Mi.

I then restarted Gnome, which restored the UI:

```sh
sudo systemctl start gdm3
```

At that point, I had a lot of numbers, but nothing seemed obviously wrong or actionable. AI was good for pointing me at tools, but the recommendations started to get circular. My main impression was that things were basically fine: my baseline usage was within range for Debian with Gnome; I don't have a lot of RAM; the system needs ~40% of it, and each significant app needs ~10%; so I should just keep an eye on the top bar number and avoid launching too many apps at once.

This made me rethink my consideration of the Chromebook as a dev machine. Later, a related thought came to mind: the line might have something to do with the ease with which components can be replaced; any device that's hard to upgrade is likely an edge device.

Fortunately, Chromium turns out to be the lighter than Firefox or even Epiphany. Running Terminal, Chromium and VSCodium brings me to ~70% usage, which I can live with.

## Back To Android/Chrome USB Debugging

Once I could load the inspector, I quickly saw the issue: I was using `crypto.randomUUID()` to generate a UUID. This API was available as of Android Chrome 155, and I had 155 installed, but I was loading the app using http and my dev machine's IP address, which was insecure, so the browser disabled the API.

Fortunately, `adb` provides reverse port forwarding so I could load the app over http and localhost, which is secure. I forwarded the Vite and Express server ports:

```sh
$ adb reverse tcp:5173 tcp:5173
 
$ adb reverse tcp:3000 tcp:3000
 
$ adb reverse --list
UsbFfs tcp:3000 tcp:3000
UsbFfs tcp:5173 tcp:5173
``` 

Once that was done, the app was able to work as expected and I could verify the migration from SQLite to Dexie was complete.

## Summary

This started with an intent to explore the feasibility of using IndexedDB for search and ended up being more about how to verify a web app on an Android phone without running out of RAM, but it's running long, so I'll defer search to a follow up post. At this point, the app just does basic CRUD, and the migration from SQLite to Dexie was straightforward.

Credit to the teams behind all the great tooling mentioned above. Thank you!
