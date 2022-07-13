#!/usr/bin/env bash

patchlevel=patch

if [ -z "$(git status --porcelain)" ]; then
  echo 'Good to go'
  npm --no-git-tag-version --tag-version-prefix="" version $patchlevel
  git commit -am "Releasing patch"
  git checkout trunk &&
    git merge develop &&
    git push origin trunk develop &&
    git checkout develop
else
  echo 'Please commit all changes first'
  git status --porcelain
fi
