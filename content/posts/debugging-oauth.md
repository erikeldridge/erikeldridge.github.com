---
_edit_last: "5360656"
_wp_old_slug: ""
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-07-11T21:16:21+00:00"
guid: http://erikeldridge.wordpress.com/?p=830
parent_post_id: null
post_id: "830"
tags:
  - oauth
title: Debugging OAuth
url: /2010/07/11/debugging-oauth/

---
```

This is some code I use to debug oauth issues.

Note: there is a bug somewhere in this that results in an invalid signature.  Please let me know if you spot it.

Usage:
```

1. Upload this file to your server
1. Get a key/secret from your oauth data provider.  The code currently has Yahoo! hardcoded as the provider, so just change the endpoints to use another one.

\[sourcecode lang="php"\]

<?php // a php script that uses the standard oauth lib (via yos sdk) to do the oauth dance
// error\_reporting(E\_ALL);
require '../yosdk/yahoo-yos-social-php5-86eef28/lib/OAuth/OAuth.php';

// we've got a stored access token
if ( $\_COOKIE\['serialized\_access\_token'\] ) {

 $access\_token = json\_decode( stripslashes( $\_COOKIE\['serialized\_access\_token'\] ) );

 printf('<pre>%s</pre>', print\_r($access\_token, true));

// we're on the callback
} elseif ( $\_COOKIE\['serialized\_request\_token'\] && $\_GET\['oauth\_verifier'\] ) {

 //debug - sanity check to see if input is passed correctly
 // echo $\_GET\['oauth\_verifier'\].$\_COOKIE\['callback'\];die;

 $consumer = new OAuthConsumer($\_COOKIE\['key'\], $\_COOKIE\['secret'\]);

 $parameters = array('oauth\_verifier' => $\_GET\['oauth\_verifier'\], 'oauth\_callback' => $\_COOKIE\['callback'\]);

 $request\_token = json\_decode( stripslashes( $\_COOKIE\['serialized\_request\_token'\] ) );

 //debug - make sure the request token decoded properly
 // var\_dump($request\_token); die;

 //kludge
 $request\_token->key = $\_GET\['oauth\_token'\];

 $request = OAuthRequest::from\_consumer\_and\_token(
 $consumer, $request\_token, 'GET', 'https://api.login.yahoo.com/oauth/v2/get\_token', $parameters);

 //debug - see params: useful for debugging empty variable issues
 // var\_dump($request); die;

 $request->sign\_request(new OAuthSignatureMethod\_HMAC\_SHA1(), $consumer, $request\_token);

 //debug - see base string: useful for debugging encoding issues
 var\_dump($request); die;

 //debug - see url: useful for sanity checking actual request to server
 // echo $request->to\_url(); die;

 $curl = curl\_init($request->to\_url());
 curl\_setopt($curl, CURLOPT\_RETURNTRANSFER, true);
 curl\_setopt($curl, CURLOPT\_HEADER, true);
 $response = curl\_exec($curl);

 //debug - see raw response, incl headers, which can contain additional info
 // var\_dump($response); die;

 curl\_close($curl);

 parse\_str($response, $access\_token);

 //debug - see parsed data: useful for debugging parsing bugs
 // var\_dump($token); die;

 // clear req token
 setcookie('serialized\_request\_token', '', time()-3600);

 // cache access token
 setcookie('serialized\_access\_token', json\_encode( $access\_token ) );

 printf('<pre>%s</pre>', print\_r($access\_token, true));

 exit;

// we just submitted the form
} elseif( $\_GET\['submit'\] ){

 $consumer = new OAuthConsumer($\_GET\['key'\], $\_GET\['secret'\]);

 $parameters = array('oauth\_callback' => $\_GET\['callback'\]);
 $request = OAuthRequest::from\_consumer\_and\_token($consumer, null, 'GET', 'https://api.login.yahoo.com/oauth/v2/get\_request\_token', $parameters);

 $request->sign\_request(new OAuthSignatureMethod\_HMAC\_SHA1(), $consumer, null);

 //debug - see base string: useful for debugging encoding issues
 // var\_dump($request); die;

 //debug - see url: useful for sanity checking actual request to server
 // echo $request->to\_url(); die;

 $curl = curl\_init($request->to\_url());
 curl\_setopt($curl, CURLOPT\_RETURNTRANSFER, true);
 $response = curl\_exec($curl);
 curl\_close($curl);

 //debug - see raw response, incl headers, which can contain additional info
 // var\_dump($response); die;

 parse\_str($response, $token);

 //debug - see parsed data: useful for debugging parsing bugs
 // var\_dump($token); die;

 // cache params & token for 2nd step
 setcookie('key', $\_GET\['key'\] );
 setcookie('secret', $\_GET\['secret'\] );
 setcookie('callback', $\_GET\['callback'\] );
 setcookie('serialized\_request\_token', json\_encode($token));

 $params = array('oauth\_token'=>$token\['oauth\_token'\]);
 header("Location: https://api.login.yahoo.com/oauth/v2/request\_auth?".http\_build\_query($params));
 exit;
}
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
 "http://www.w3.org/TR/html4/strict.dtd">
<html>
 <head>
 <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.8.1/build/reset-fonts-grids/reset-fonts-grids.css">
 <style>
 body {
 padding: 20px;
 }
 button {
 float: left;
 background-color: #fff;
 padding: 1ex;
 margin: 2ex 0;
 }
 label {
 display: block;
 text-align: left;
 width: 10em;
 }
 input {
 float: left;
 width: 64em;
 padding: 1ex;
 margin: 2ex 0;
 }
 #submit {
 width: 7em;
 }
 </style>
 </head>
 <body>
 <form>
 <div>
 <label>Consumer key:</label><input name="key" value="">
 <div style="clear:both"/>
 </div>
 <div>
 <label>Consumer secret:</label><input name="secret" value="">
 <div style="clear:both"/>
 </div>
 <div>
 <label>Callback URL:</label><input name="callback" value="">
 <div style="clear:both"/>
 </div>
 <input value="Authorize" name="submit" type="submit" id="submit">
 </form>
 </body>
</html>

\[/sourcecode\]
