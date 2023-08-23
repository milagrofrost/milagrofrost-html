#!/bin/bash

# Perform a dry run to list files that will be deleted
deleted_files=$(git log --diff-filter D --pretty="format:" --name-only | sed '/^$/d')

# Loop through and remove the files from each commit
for file in $deleted_files; do
    git filter-branch --tree-filter "git rm -f $file" -- --all
done

# Force push the changes to the current branch
git push origin --force
