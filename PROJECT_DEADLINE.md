# Project Deadline Notification

This repository contains automation to post important project deadline notifications to pull requests.

## Target Completion Date

**September 16, 2025** - All final features, fixes, and documentation should be completed by this deadline.

## How to Post the Deadline Comment

### Option 1: GitHub Actions Workflow (Recommended)

1. Go to the **Actions** tab in the GitHub repository
2. Select the "Post Project Deadline Comment" workflow
3. Click "Run workflow"
4. Enter the PR number (default is 1)
5. Click "Run workflow" to execute

The workflow will automatically post the following comment to the specified PR:

> @everyone Please note: The target completion date for the Job Application Copilot project is September 16, 2025. All final features, fixes, and documentation should be completed by this deadline. Thank you!

### Option 2: Manual GitHub CLI

If you have GitHub CLI installed and authenticated:

```bash
gh pr comment 1 --body "@everyone Please note: The target completion date for the Job Application Copilot project is September 16, 2025. All final features, fixes, and documentation should be completed by this deadline. Thank you!"
```

### Option 3: GitHub API

Using curl with a GitHub token:

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Mandy1414/job-application-copilot/issues/1/comments \
  -d '{"body":"@everyone Please note: The target completion date for the Job Application Copilot project is September 16, 2025. All final features, fixes, and documentation should be completed by this deadline. Thank you!"}'
```

## Files Created

- `.github/workflows/post-pr-comment.yml` - GitHub Actions workflow for automated comment posting
- `PROJECT_DEADLINE.md` - This documentation file with instructions

## Usage Instructions

The GitHub Actions workflow is the recommended approach as it provides a user-friendly interface and handles authentication automatically within the GitHub environment.