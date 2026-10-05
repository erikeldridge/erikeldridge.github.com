

# Debian On Acer Chromebook 14
These are my notes from migrating my Chromebook (codename Edgar) from postmarketOS (pmOS) to Debian. I'm using the laptop as my dev machine and a glibc-based system is more straightforward for this. Additionally, Debian is small enough for good performance on this machine.

## eMMC Wear Reduction
As [documented in my notes from installing pmOS](https://erikeldridge.com/posts/postmarketos-on-chromebook/#emmc), Edgar uses eMMC for storage, and eMMC wears relatively poorly, so the goal is to avoid excessive or unnecessary writes.

See my earlier notes linked above for general guidance. For now, the notes below only concern on Firefox, since that's what I'm focusing on at the moment.

### Firefox ESR
Gnome comes with Firefox ESR by default, and it performs relatively well, so I use it as my primary browser.

Edgar only has 4gb of RAM, so we can't simply use a tool like [profile-sync-daemon](https://github.com/graysky2/profile-sync-daemon) to manage a browser profile in RAM.

#### Configuration

| Preference Name | Value | Purpose |
|---|---|---|
| browser.cache.disk.parent_directory | /tmp/firefox-cache | Create a new string preference configuring Firefox to persist to /tmp, which is backed by tmpfs in RAM |
| browser.cache.disk.enable | true | Ensure this is true so Firefox uses the new tmp dir |
| browser.sessionstore.max_tabs_undo | 0 | Don't save tab state |
| browser.sessionstore.max_windows_undo | 0 | Don't save window state |
| browser.sessionstore.resume_from_crash | false | Don't restore session after a crash |
| browser.startup.page | 1 | Loads a blank page/home page, as opposed to 3, which restores the session |
| browser.sessionstore.privacy_level | 2 | Don't save form data and scroll positions. |
| storage.nfs_filesystem | true | Use alternative locking mechanisms for its SQLite databases, lowering synchronous write strain. |
| datareporting.healthreport.uploadEnabled | false | Disable background logging and health report uploads. |
| toolkit.telemetry.enabled | false | Disable background telemetry metrics gathering. |
| browser.safebrowsing.downloads.enabled | false | Disable  background database syncing for file downloads. |

#### Software

Install uBlock Origin to generally reduce load.


