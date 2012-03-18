---
layout: post
title: notes on running Rails tasks via Rake
---

* toc
{:toc}

## Introduction

I've got a rails (2.3.8) app that works with user data. I want to count certain user actions and generate a summary, but this operation is time consuming, and only it makes sense to do it offline and then send a summary somewhere. I would like to reuse my rails code to do this.

Rake comes to mind as a convenient manager for this task, so here's my approach:

1. define a rake task for the operation
1. fetch and prepare the user data
1. email the summary
1. run this task via cron

## Defining a rake task & fetching data

I chose to define my task in a file called _lib/tasks/cron.rake_. (My app's _Rakefile_ includes all _.rake_ files under _lib/tasks/_ via _vendor/rails/railties/lib/tasks/rails.rb_.

Here's the code from my controller I want to run offline:

{% highlight ruby %}

events = Event.all(
  :select => 'name, sum(event_count) as event_count, sum(unique_users_count) as unique_users_count',
  :group => 'name',
  :conditions => "created_at >= '%s' AND created_at <= '%s' AND name = 'click'" %
    ['20101231'.to_date, '20111231'.to_date]
)

{% endhighlight %}

Here's a corresponding task definition:

{% highlight ruby %}

desc "Fetch events, summarize, and email"
task :process_events => :environment do
  events = Event.all(
    :select => 'name, sum(event_count) as event_count, sum(unique_users_count) as unique_users_count',
    :group => 'name',
    :conditions => "created_at >= '%s' AND created_at <= '%s'" % ['20101231'.to_date, '20111231'.to_date]
  )
end

{% endhighlight %}

*Note:* by depending on the _environment_ task, i.e. `task :process_events => :environment do` we can access our rails environment.

## Emailing the data

I want to mail this info out, so I need to create an ActionMailer class and view:

_app/mailers/event&#95;mailer.rb_

{% highlight ruby %}
class EventMailer < ActionMailer::Base

  default :from => "erik@example.com"

  def summarize(data)
    prepared = {
      'name' => [],
      'event_count' => [],
      'unique_users_count' => []
    }
    data.inject(prepared) do |prepared, row|
      prepared['name'] << row['name']
      prepared['event_count'] << row['event_count']
      prepared['unique_users_count'] << row['unique_users_count']
      prepared
    end
  end

  def summary(events)
    @summary = summarize events
    mail(:to => 'erik@example.com', :subject => "Event summary")
  end
end
{% endhighlight %}

_app/views/event&#95;mailer/summary.html.erb_

{% highlight ruby %}
Name: <%= @summary['name'] %>
Event count: <%= @summary['event_count'] %>
Unique user count: <%= @summary['unique_users_count'] %>
{% endhighlight %}

Then I can update the rake task to use this:

{% highlight ruby %}
desc "Fetch events, summarize, and email"
task :process_events => :environment do
  events = Event.all(
    :select => 'name, sum(event_count) as event_count, sum(unique_users_count) as unique_users_count',
    :group => 'name',
    :conditions => "created_at >= '%s' AND created_at <= '%s'" % ['20101231'.to_date, '20111231'.to_date]
  )
  EventMailer.deliver_summary events
end
{% endhighlight %}

## Scheduling this task via cron

The project changed before this step became necessary, but here is the approach I would use to run this task every night:

`00 0 * * * cd /rails_app && /usr/bin/rake RAILS_ENV=production process_events`

## Resources

* [Rails 2.3.8 API docs](http://railsapi.com/doc/rails-v2.3.8/)
* [Jason Seifer's Rake tutorial](http://jasonseifer.com/2010/04/06/rake-tutorial), esp. the _Rails_ and _Scheduling Rake Tasks_ sections.

## Conclusion

<a href="http://www.flickr.com/photos/foxtree1/4508495523/">
![Water Rat, by Tim Schofield](http://farm5.staticflickr.com/4064/4508495523_26886640f2_m.jpg "Water Rat, by Tim Schofield")
</a>
