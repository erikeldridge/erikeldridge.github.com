---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-12-27T05:51:56+00:00"
guid: http://erikeldridge.wordpress.com/?p=491
parent_post_id: null
post_id: "491"
tags:
  - centos
  - mochiweb
  - nginx
title: setting up nginx and mochiweb on centos 5
url: /2009/12/26/setting-up-nginx-and-mochiweb-on-centos-5/

---
1. Install nginx on centos using [cyberciti's tutorial](//www.cyberciti.biz/faq/rhel-fedora-install-configure-nginx-php5/)
1. update default iptables to allow http traffic:
   \[sourcecode lang="shell"\]
   \# ref: http://www.cyberciti.biz/faq/redhat-fedora-ip6tables-firewall-configuration/
   \# ref: http://wiki.zimbra.com/index.php?title=Firewall\_Configuration
   \# Firewall configuration written by system-config-securitylevel
   \# Manual customization of this file is not recommended.
   \*filter
   :INPUT ACCEPT \[0:0\]
   :FORWARD ACCEPT \[0:0\]
   :OUTPUT ACCEPT \[0:0\]
   :RH-Firewall-1-INPUT - \[0:0\]
   -A INPUT -j RH-Firewall-1-INPUT
   -A FORWARD -j RH-Firewall-1-INPUT
   -A RH-Firewall-1-INPUT -i lo -j ACCEPT
   -A RH-Firewall-1-INPUT -p icmp --icmp-type any -j ACCEPT
   -A RH-Firewall-1-INPUT -p 50 -j ACCEPT
   -A RH-Firewall-1-INPUT -p 51 -j ACCEPT
   -A RH-Firewall-1-INPUT -p udp --dport 5353 -d 224.0.0.251 -j ACCEPT
   -A RH-Firewall-1-INPUT -p udp -m udp --dport 631 -j ACCEPT
   -A RH-Firewall-1-INPUT -p tcp -m tcp --dport 631 -j ACCEPT
   -A RH-Firewall-1-INPUT -m tcp -p tcp --dport 80 -j ACCEPT
   -A RH-Firewall-1-INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
   -A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
   -A RH-Firewall-1-INPUT -j REJECT --reject-with icmp-host-prohibited
   COMMIT
   \[/sourcecode\]
1. install mochiweb using [BeeBole's tutorial](http://beebole.com/en/blog/erlang/web-application-on-erlang-configure-nginx-with-mochiweb/).  For ease of use while testing, launch dev server using separate [screen](http://www.cyberciti.biz/tips/linux-screen-command-howto.html), as the mochiweb shell will own the terminal used to launched it by default, and add the following line to iptables so we can hit the server directly:
   \[sourcecode lang="shell"\]
   -A RH-Firewall-1-INPUT -m tcp -p tcp --dport 8000 -j ACCEPT # allow access to mochiweb
   \[/sourcecode\]

   Test that mochiweb is available to localhost by running the following from the command line on the server:

   \[sourcecode lang="shell"\]
   curl http://127.0.0.1:8000
   \[/sourcecode\]

   You should get something back like:

   <html>
   <head>
   <title>It Worked</title>
   </head>
   <body>
   MochiWeb running.
   </body>
   </html>
1. Configure nginx to proxy api calls to mochiweb.  Put this in /etc/nginx/nginx.conf:
   \[sourcecode lang="shell"\]
   user nginx;
   worker\_processes 1;
   error\_log /var/log/nginx/error.log;
   pid /var/run/nginx.pid;
   events {
    worker\_connections 1024;
   }
   http {
    include /etc/nginx/mime.types;
    default\_type application/octet-stream;
    log\_format main '$remote\_addr - $remote\_user \[$time\_local\] $request '
    '"$status" $body\_bytes\_sent "$http\_referer" '
    '"$http\_user\_agent" "$http\_x\_forwarded\_for"';
    access\_log /var/log/nginx/access.log main;
    sendfile on;
    keepalive\_timeout 65;
    include /etc/nginx/conf.d/\*.conf;
    server {
    listen 80;
    server\_name localhost;
    location ~ api { # <-- pass requests for 'api...' to mochiweb
    proxy\_pass http://127.0.0.1:8000;
    }
    location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    }
    error\_page 404 /404.html;
    location = /404.html {
    root /usr/share/nginx/html;
    }
    error\_page 500 502 503 504 /50x.html;
    location = /50x.html {
    root /usr/share/nginx/html;
    }
    }
   }
   \[/sourcecode\]

   As per [BeeBole's tutorial](http://beebole.com/en/blog/erlang/how-to-quickly-set-up-ubuntu-804-loaded-with-erlang-mochiweb-and-nginx/), edit the mochiweb request handler to handle requests for 'api':

   \[sourcecode lang="erlang"\]
   %% @author author <author@example.com>
   %% @copyright YYYY author.

   %% @doc Web server for myapp.

   -module(myapp\_web).
   -author('author <author@example.com>').

   -export(\[start/1, stop/0, loop/2\]).

   %% External API

   start(Options) ->
    {DocRoot, Options1} = get\_option(docroot, Options),
    Loop = fun (Req) ->
    ?MODULE:loop(Req, DocRoot)
    end,
    mochiweb\_http:start(\[{name, ?MODULE}, {loop, Loop} \| Options1\]).

   stop() ->
    mochiweb\_http:stop(?MODULE).

   loop(Req, DocRoot) ->
    "/" \+\+ Path = Req:get(path),
    case Req:get(method) of
    Method when Method =:= 'GET'; Method =:= 'HEAD' ->
    case Path of
    "api" -> Req:ok({"text/html", \[\],\["<h1>Congratulation</h1>"\]}); % <-- the 'api' request handler
    \_ -> Req:serve\_file(Path, DocRoot)
    end;
    'POST' ->
    case Path of
    \_ ->
    Req:not\_found()
    end;
    \_ ->
    Req:respond({501, \[\], \[\]})
    end.

   %% Internal API

   get\_option(Option, Options) ->
    {proplists:get\_value(Option, Options), proplists:delete(Option, Options)}.
   \[/sourcecode\]

   As per [James Gardner's post _Streaming File Upload with Erlang and Mochiweb Multipart Post_](http://jimmyg.org/blog/2007/multipart-post-with-erlang-and-mochiweb.html), rebuild the request handler by running _make_ in the _myapp_ directory. The mochiweb server will automatically restart
1. confirm the proxy is working by hitting http://domain/ and http://domain/api.  The former should return the nginx install confirmation page, and the latter should return the simple "Congratulation" page.
