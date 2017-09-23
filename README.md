# erikeldridge.github.com

## Develop

1. Run test server: `rbenv exec bundle exec jekyll serve`

## Setup

1. Create pre-commit hook to maintain last-modified date:

{% highlight ruby linenos %}
#!/usr/bin/env ruby

require 'yaml'

# https://github.com/jekyll/jekyll/blob/1ac9c21956ed7e31be6fd8f0083f6414b6220684/lib/jekyll/document.rb#L10
YAML_FRONT_MATTER_REGEXP = /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m

`git diff --cached --name-only`.split.each do |path|
  if File.read(path) =~ YAML_FRONT_MATTER_REGEXP

    # https://stackoverflow.com/a/36950919/1971682
    head, body = YAML.load($1), Regexp.last_match.post_match

    head['date'] = Time.now

    output = <<-END
#{YAML.dump head}
---


#{body}
END

    File.write(path, output)
  end
end
{% endhighlight %}

