# erikeldridge.github.com

## Develop

1. Build JS: `cd src && npm run build`
1. Run test server: `bundle exec jekyll serve --host=0.0.0.0 --port=3000
   (Note: if running on a cloud provider, remember to open the firewall
   for this port.)

## NLP

1. Generate site: `rbenv exec bundle exec jekyll build`
1. Build corpus: `cd nlp && pipenv run python3 runner.py` (Note this currently just reads and dumps content)

