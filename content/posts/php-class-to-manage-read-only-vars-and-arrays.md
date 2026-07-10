---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2008-10-26T00:04:58+00:00"
guid: http://erikeldridge.wordpress.com/?p=121
parent_post_id: null
post_id: "121"
tags:
  - code-php
title: PHP class to manage read-only vars and arrays
url: /2008/10/26/php-class-to-manage-read-only-vars-and-arrays/

---
Source code:

\[sourcecode language='php'\]

class Constants
{
    private $var\_cache;

    public function set($key, $val)
    {
        if(isset($this->var\_cache\[$key\]))
        {
            throw(new Exception("Constants->get() error: var $key has already been defined"));
        }
        else
        {
            $this->var\_cache\[$key\] = $val;
        }
    }

    public function get($key)
    {
        return $this->var\_cache\[$key\];
    }
}
\[/sourcecode\]
Example usage:

\[sourcecode language='php'\]
$constants = new Constants();

$constants->set('base\_url', 'www.domain.com/path');

...

$img\_src\_url = $constants->get('base\_url').'/img/file.jpg';

echo "![]($img_src_url)";

\[/sourcecode\]
