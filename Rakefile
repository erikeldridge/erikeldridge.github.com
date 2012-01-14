# Ref: https://github.com/appden/appden.github.com/blob/master/Rakefile
desc "Build site using Jekyll"
task :default do
  sh "jekyll"
end

desc "Delete _site files"
task :clear do
  sh "rm -rf _site"
end

desc "Serve on localhost:4000 & refresh after changes"
task :server do
  sh "jekyll --server --auto"
end