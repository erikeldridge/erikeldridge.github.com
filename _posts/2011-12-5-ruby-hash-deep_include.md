---
layout: default
---

# Another Hash.deep_include? function for Ruby

I recently wanted to check if a hash was a sub-hash of another. A colleague was writing a test for a piece of code that used a library function to make a network request. In general, this library function would send a given data object, and users of this function would augment this data with additional attributes.

For example:

    ...
    def test_specific_network_request
      assert_network_request_includes {
        :key1 => "val1",
        :key2 => {
          :key3 => "val2"
        }
      }
    end
    ...

This assertion should return false if the request does not contain

    {
      :key1 => "val1",
      ...
      :key2 => {
        ...
        :key3 => "val2"
      }
    }

But it should return true if the request contains this hash in addition to other elements. A simple deep comparison would not work.

After a bit of research, esp. [_ruby Hash include another hash, deep check_](http://stackoverflow.com/questions/3826969/ruby-hash-include-another-hash-deep-check), consultation with colleagues, esp. [@iamnirav](https://twitter.com/iamnirav), and hacking, I came up with this:

## Le code

{% highlight ruby %}

def deep_compare(hash1, hash2)

  # handle nested hashes
  if hash1.kind_of? Hash and hash2.kind_of? Hash

    # all children of hash1 must be in hash2
    hash1.keys.all? do |key|
      if hash2.has_key? key
        deep_compare(hash1[key], hash2[key])
      else
        false
      end
    end

  # handle leaves
  else
    hash1 == hash2
  end

end

require "test/unit"

class BasicTest < Test::Unit::TestCase
  def test_two_nonmatching_hashes
    assert_equal( false, deep_compare({"a" => 1 }, {"a" => 2}) )
  end
  def test_two_matching_hashes
    assert_equal( true, deep_compare({"a" => 1 }, {"a" => 1}) )
  end
  def test_two_matching_nested_hashes
    assert_equal( true, deep_compare({"a" => {"b" => 1} }, {"a" => {"b" => 1} }) )
  end
  def test_two_nonmatching_nested_hashes
    assert_equal( false, deep_compare({"a" => {"b" => 1} }, {"a" => {"b" => 2} }) )
  end
  def test_two_matching_nested_hashes_with_other_attributes
    assert_equal( true, deep_compare({"a" => {"b" => 1} }, {"a" => {"b" => 1, "c" => 2} }) )
  end
end
{% endhighlight %}

## Learnings

Ruby's [_all?_](http://www.ruby-doc.org/core-1.9.3/Enumerable.html#method-i-all-3F) method is really nice. It iterates over all the elements of a collection and, as @iamnirav put it, "_and_s them together".