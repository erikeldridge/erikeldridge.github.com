#!/usr/bin/env ruby

def path(title)
  date = Time.now.strftime('%Y-%m-%d')
  formatted_title = title.downcase.gsub(/\s/, '-')
  "_posts/#{date}-#{formatted_title}.md"
end

def content(title)
  <<~END
  ---
  title: #{title}
  layout: post
  tags:
  ---


  END
end

puts 'Title?'
title = gets.chomp

open(path(title), 'w') { |f| f.puts content(title) }
