import glob
from markdown import markdown
from bs4 import BeautifulSoup
import frontmatter
from collections import Counter
import itertools
import yaml

def read_files(paths):
    return [read_file(path) for path in paths]

def read_file(path):
    with open(path) as f:
        return f.read()

def jekyll_to_markdown(jekyll):
    post = frontmatter.loads(jekyll)
    return post.content

def html_to_text(html):
    return ' '.join(BeautifulSoup(html, features="html.parser").findAll(text=True))

def clean_word(word):
    # Note: we can only clean so much because we have to match Liquid's
    # filter functions in notes.html
    return word.strip().lower()

def tokenize(contents):
    md = jekyll_to_markdown(contents)
    html = markdown(md)
    text = html_to_text(html)
    tokens = [clean_word(word) for word in text.split(' ')]
    non_empty = [token for token in tokens if token]
    unique = set(non_empty)
    return unique

def flatten(iterables):
    return list(itertools.chain.from_iterable(iterables))

def intersect(sets, tolerance):
    counts = Counter(flatten(sets))
    intersection = set()
    for key in counts.keys():
        if counts[key] / len(sets) > tolerance:
            intersection.add(key)
    return intersection

# Experiment with extracting common words from posts
contents = read_files(glob.glob("../_posts/*.md"))
tokens = [tokenize(content) for content in contents]
words = intersect(tokens, 0.2)

# Add MySQL's words
# https://dev.mysql.com/doc/refman/8.0/en/fulltext-stopwords.html
for line in open("mysql_stop_words.txt"):
    for word in line.split():
        words.add(word.strip())

# Integrate with Jekyll
with open("../_data/stop_words.yml", "w") as f:
    yaml.dump(list(words), f)

