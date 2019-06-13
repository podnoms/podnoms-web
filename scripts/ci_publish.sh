#1 /usr/bin/env bash

if [ -z "$(git status --porcelain)" ]; then
    echo 'Good to go'
    git checkout master && \
        git merge develop && \
        git push origin master develop && \
        git checkout develop
else
    echo 'Please commit all changes first'
    git status --porcelain
fi
