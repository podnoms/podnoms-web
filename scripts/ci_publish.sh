#1 /usr/bin/env bash

if [ -z "$(git status --porcelain)" ]; then
    echo 'Good to go'
else
    echo 'Please commit all changes first'
    git status --porcelain
fi
