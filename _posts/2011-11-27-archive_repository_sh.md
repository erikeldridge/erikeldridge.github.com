---
layout: post
---

## archive_repository.sh

### Goals

1. "Archive" a repository into another repository
2. Retain the source repo's history
3. Avoid clobbering resources in either the source or the archive repositories

### Terminology

* *archive*: to merge one repo into another, containing all new files in a given directory
* *source repo*: the repository to archive
* *archive repo*: a repository containing multiple archived repositories
* *archive directory*: a directory created in the _source repo_ into which all files are moved. This directory is then merged into the _archive repo_
* *archive branch*: a branch in the source repo used to contain changes and facilitate merging of resources into the _archive repo_

### Overview

The archive script accepts a github repo url and will:

1. Extract the repo name from the url using the following pattern: git@github.com:erikeldridge/{repo name}.git
1. Clone the _source repo_ into _../{repo name}_
1. Create a new branch (the _archive branch_) to contain changes in the source repo
1. Create a new directory (the _archive directory_) to contain all archived files
1. Move all files into the _archive directory_
1. In the _archive repo_, create a new remote repo definition pointing at the source repo
1. Pull the _archive branch_ from the _source repo_ into the _archive repo_
1. Commit all changes to the _archive repo_
1. Delete the remote repo definition
1. Delete the _archive branch_ in the _source repo_

### Usage

1. `$ bash archive_repository.sh {repo url}`
1. `$ git push origin master`

### Code

From the [archive Github repo](https://github.com/erikeldridge/archive/), Sha 050d3a93a82c265ea4688081a27b512cf7b75ea5

{% highlight sh %}
# This script accepts a github repo url, clones it, and merges it into the archive repository

# Require project repo url as 1st arg
if [ ! $1 ]; then
  echo "$0: repository url required, e.g., $ bash archiver.sh git@github.com:erikeldridge/CivicDB.git"
  exit 1
fi

# Extract repository name from url
repository_name=$( ruby -e "print '$1'.scan(/([\w-]+)\.git/)[0][0]" );

echo "$0: Cloning repository";
git clone $1 ../$repository_name;

echo "$0: Changing directory to ../$repository_name";
cd ../$repository_name

echo "$0: Making archive_branch";
git co -b archive_branch

archive_dir="repository_archive"
mkdir $archive_dir;
echo "$0: Making '$archive_dir' directory to house repository files";

echo "$0: Moving files into archive directory";
for f in *
do

  # Skip archive dir itself
  if [ $f = $archive_dir ]
  then
    continue
  fi

  mv "$f" $archive_dir
done

echo "$0: Committing archive directory";
git add $archive_dir
git ci -am "Create $archive_dir dir & add files"

echo "$0: Changing directory back to archive repository";
cd -

echo "$0: Defining remote repository pointing at ../$repository_name";
git remote add merge_remote ../$repository_name;

echo "$0: Merging in repository";
git pull merge_remote archive_branch;

echo "$0: Renaming archive directory to $repository_name"
if [ -d $repository_name ]
  then
  echo "$0: Error: directory with this name already exists"
  exit 1
fi
mv $archive_dir $repository_name

echo "$0: Committing changes to merge_branch"
git add $repository_name
git ci -am "Renaming archive directory to $repository_name"

echo "$0: Deleting remote definition";
git remote rm merge_remote;

echo "$0: Deleting archive branch"
cd -
git co master

# Force deletion because branch is not merged into master
git branch -D archive_branch

cd -
{% endhighlight %}

