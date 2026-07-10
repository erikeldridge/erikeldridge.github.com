---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51189177908"
_wp_old_date: "2020-11-17"
author: erikeldridge
categories:
  - technical-tools
date: "2008-10-08T20:00:00+00:00"
guid: http://erikeldridge.wordpress.com/?p=13
parent_post_id: null
post_id: "13"
tags:
  - javascript
  - notes
timeline_notification: "1605673836"
title: Notes from Nicholas Zakas' talk on JavaScript error handling
url: /2008/10/08/notes-from-nicholas-zakas-talk-on-javascript-error-handling/

---
Talk given on 10/8/08

1. Assume code will fail
1. Log errors back to server
   - sample code:  
`
     function log(sev, msg) {
     var img = new Image();
     img.src = 'log.php?sev=' +
     encodeURIComponent(sev) +
     '&msg=' + encodeURIComponent(msg);
     }`//example usage  
try {  
//fn()  
catch (e) {  
log(2, 'fn() failed: ' + e.message());  
}
   - Log front-end errors to same place as back-end errors
1. Define error handling
   - Use try-catch
   - Catch block stops exception 'bubbling' (my phrasing)
1. Identify error points
1. Throw errors
1. Fatal vs. non-fatal
1. Define debug mode
