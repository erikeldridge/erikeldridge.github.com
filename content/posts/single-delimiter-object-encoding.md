---
_edit_last: "5360656"
_oembed_761b4cdc716c77277c36be02eda1d350: '{{unknown}}'
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-09-13T05:12:51+00:00"
guid: http://erikeldridge.wordpress.com/2010/09/12/single-delimiter-object-encoding/
parent_post_id: null
post_id: "835"
title: Single-delimiter object encoding
url: /2010/09/12/single-delimiter-object-encoding/

---
# Motivation

Suppose we want to pass a collection of key/value pairs as a URL parameter, under the following conditions:

- the URL cannot exceed 2k in length
- Simplicity is important
- The values in the object may contain URL-unsafe characters

For example:
url => http://example.com/? _str_ = encode( {foo => “bar/ba.x”, baz => aN+6786kl76sd+123==} )

Using JSON with example above, we would get:

_str => {"foo":"bar/ba.x","baz":"aN+6786kl76sd+123=="}_

_url => http://example.com/?str= %7B%22foo%22%3A%22bar%2Fba.x%22%2C%22baz%22%3A%22aN%2B6786kl76sd%2B123%3D%3D%22%7D_

This works, but because need to URL-encode the values, the quotes and curly-braces in JSON inflate the resulting parameter size, which can be an issue if the parameters are lengthy to begin with.

If we use form-encoding, we can get a reduction in the resulting string size:

_str => foo=bar%2Fba.x&baz=aN%2B6786kl76sd%2B123%3D%3D_

_url => http://example.com?str= foo%3Dbar%252Fba.x%26baz%3DaN%252B6786kl76sd%252B123%253D%253D_

But form-encoding increases the complexity of the signature preparation because we need to URL-encode each value prior to form-encoding so any URL-unsafe characters do not conflict with the form-encoding (delimiter collision).

If we can assume that there is at least one character that will not appear in the keys and values of the object, and does not interfere with URL-encoding, then another approach comes to mind: using this safe character as a delimiter between the keys and values of the serialized object.

Using this approach we end up with a shorter string that requires less complexity to produce:

_str => foo,bar/ba.x,baz,aN+6786kl76sd+123==_

_url => http://example.com?str= foo%2Cbar%2Fba.x%2Cbaz%2CaN%2B6786kl76sd%2B123%3D%3D_

# Steps

## Encoding

- Define a delimiter. A comma is a good default choice
- Reduce the object to an array by looping through each field in the object, collecting each key/value pair as _{key}{delimeter}{value}_
- Serialize the array by joining all the values with the delimeter to yield a string, e.g. _{key1}{delimeter}{value1}{delimeter}{key2}{delimeter}{value2}…_

## Decoding

- Define a delimeter
- Expand the string into an array by splitting it on the delimeter: _array( {key1}, {value1}, {key2}, {value2}, … )_
- Reconstruct the original object by looping through the array values, building the object’s keys and values from alternating array values

# Sample Implementation

## JavaScript

\[sourcecode lang="javascript"\]
function encodeSingleDelimiter (obj, delimeter) {
 delimeter = delimeter \|\| ',';
 var pairs = \[\];
 for (var i in obj) {
 var pair = i + delimeter + obj\[i\];
 pairs.push(pair);
 }
 return pairs.join(delimeter);
}

function decodeSingleDelimiter (str, delimeter) {
 delimeter = delimeter \|\| ',';
 var items = str.split(delimeter);
 var obj = {};
 for (var i = 0; i &lt; items.length; i++) {
 if (0 === i % 2) {
 var key = items\[i\];
 } else {
 var val = items\[i\];
 }
 obj\[key\] = val
 }
 return obj;
}
\[/sourcecode\]

# References

- [Form encoding](http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1)
- [Wikipedia’s “Comparison of data serialization formats”](http://en.wikipedia.org/wiki/Comparison_of_data_serialization_formats)
