# erikeldridge.github.com

## Develop

1. Run test server: `bundle exec jekyll serve --host=0.0.0.0 --port=3000`

## NLP

1. Generate site: `rbenv exec bundle exec jekyll build`
1. Build corpus: `cd nlp && pipenv run python3 runner.py` (Note this currently just reads and dumps content)

