#!/usr/bin/env bash
# Opens the pull request for the pushed branch. Called by .github/workflows/open-pull-request.yml.
#   feat|fix|docs|ci|build/<issue>-<slug>  →  PR into dev (left alone if one is already open)
#   dev                                    →  PR into main (body rewritten so GitHub closes the issues)
set -euo pipefail

: "${BRANCH:?BRANCH is required}"
: "${GH_TOKEN:?GH_TOKEN secret is missing. Add a fine-grained PAT as the GH_TOKEN repository secret.}"

if [ "$BRANCH" = "dev" ]; then base="main"; else base="dev"; fi

git fetch --no-tags origin "$base"
ahead="$(git rev-list --count "origin/$base..HEAD")"
if [ "$ahead" -eq 0 ]; then
  echo "$BRANCH has no commits ahead of $base; nothing to open."
  exit 0
fi

existing="$(gh pr list --head "$BRANCH" --base "$base" --state open --json number --jq '.[0].number // empty')"

issue_from_branch() {
  # feat/12-short-description → 12
  sed -nE 's#^(feat|fix|docs|ci|build)/([0-9]+)-.*#\2#p' <<<"$1"
}

if [ "$base" = "dev" ]; then
  if [ -n "$existing" ]; then
    echo "Pull request #$existing already open for $BRANCH → dev."
    exit 0
  fi
  issue="$(issue_from_branch "$BRANCH")"
  title="$(git log --reverse --format=%s "origin/dev..HEAD" | head -n 1)"
  {
    echo "Automatic pull request for \`$BRANCH\` → \`dev\`."
    echo
    if [ -n "$issue" ]; then
      echo "Issue: #$issue (closed when \`dev\` is merged into \`main\`)."
      echo
    fi
    echo "### Commits"
    git log --reverse --format='- %s' "origin/dev..HEAD"
  } >/tmp/pr-body.md
  gh pr create --base dev --head "$BRANCH" --title "$title" --body-file /tmp/pr-body.md
  exit 0
fi

# dev → main: collect issues from merged branch names and closing keywords since main.
{
  git log --merges --format=%s "origin/main..HEAD" |
    sed -nE 's#.* from [^/ ]+/(feat|fix|docs|ci|build)/([0-9]+)-.*#\2#p'
  git log --format=%B "origin/main..HEAD" |
    grep -oiE '\b(close[sd]?|fix(e[sd])?|resolve[sd]?) #[0-9]+' |
    grep -oE '[0-9]+'
} | sort -n | uniq >/tmp/issues.txt

{
  echo "Release \`dev\` → \`main\`. Merging this closes:"
  echo
  if [ -s /tmp/issues.txt ]; then
    while read -r n; do echo "Closes #$n"; done </tmp/issues.txt
  else
    echo "_No linked issues._"
  fi
  echo
  echo "### Merged since \`main\`"
  git log --merges --format='- %s' "origin/main..HEAD"
} >/tmp/pr-body.md

if [ -n "$existing" ]; then
  gh pr edit "$existing" --body-file /tmp/pr-body.md
  echo "Updated pull request #$existing."
else
  gh pr create --base main --head dev --title "release: dev → main" --body-file /tmp/pr-body.md
fi
