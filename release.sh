#!/bin/bash

set -e

TAG="$(git describe --tags $(git rev-list --tags --max-count=1))"
echo "Is '$TAG' the latest tag?"
read -p "[y/N] " yN
if [[ $yN = "y" || $yN = "Y" ]]; then
  npm run build
  npm run build-css
  cp -r dist tmp
  cp index.html tmp/
  git checkout gh-pages
  mv tmp/index.html ./
  mv tmp/* dist/
  rmdir tmp
  git add .
  git commit -m "$TAG"
  git push origin gh-pages
  git checkout master
  echo "release finished."
else
  echo "abort."
fi
