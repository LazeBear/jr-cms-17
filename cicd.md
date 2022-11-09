jira tasks

master -> feature-1/xxxxxx
PR

integration (continuous integration)

CI checks - run tests (lint(eslint), unit tests, integration test, visual test)
ci checks passed + reviewers approved
PR merged into master

deploy (continues deployment)

branch <-> environment
master -> testing (CI/CD)

master -> testing
staging -> staging
staging-2022-11-09 -> staging (1day,1 week)
production-2022-11-08 -> production (1day, 1 week)

feature -> master -> staging -> QA !-> production (manually)

{
enableFeatureA: true
}

return (
{enableFeatureA && <Component />}
)

master -> production
testing -> testing

test party

snapshot

html

<div class="">
  welcome
</div>

snapshot-xxxxx

html

<div class="">
  welcome!
</div>
