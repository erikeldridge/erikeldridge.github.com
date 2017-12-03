import glob
from bs4 import BeautifulSoup

def list_files(path):
    return glob.glob(path + "*.html")

def read_file(path):
    with open(path) as f:
        return ''.join(f.readlines())

def read_files(paths):
    return ''.join(map(read_file, paths))

print(read_files(list_files('../_site/notes/')))

