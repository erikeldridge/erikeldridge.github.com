# Ref: https://github.com/appden/appden.github.com/blob/master/Rakefile
desc "Build site using Jekyll"
task :default do
  sh "jekyll"
end

desc "Delete _site files"
task :clean do
  sh "rm -rf _site"
end

desc "New post from paths"
task :new do
  require "erb"
  # process args
  dirs = ARGV[1..-1]
  # build contents
  contents = {}
  for dir in dirs do
    contents[dir] = {}
    Dir["#{dir}/*"].each do |path|
      contents[dir][path] = File.readlines(path).join
    end
  end
  # generate output
  output = <<-EOS.gsub(/^[^\S\n]+/, "")
---
layout: base
---


# New post

## Project structure

<% contents.each_key do |dir| -%>
  <%= dir %>
  <% contents[dir].each_key do |path| -%>
    <%= File.basename(path) %>
  <% end %>
<% end %>

<% contents.each_key do |dir| -%>
  <% contents[dir].each do |path, content| %>
    ## <%= File.basename(path) %>

    {% highlight <%= File.extname(path).sub('.','') %> tabsize 2 %}
    <%= content %>
    {% endhighlight %}

  <% end %>
<% end %>
EOS
  # write output
  File.open("_posts/#{Time.new.strftime('%Y-%m-%d')}-new-post.md", "w") do |f|
    f.write(ERB.new(output, nil, '-').result(binding))
  end
end


desc "Serve on localhost:4000 & refresh after changes"
task :server do
  sh "jekyll --server --auto"
end
