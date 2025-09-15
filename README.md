# job-application-copilot

## Project Deadline

**Target Completion Date: September 16, 2025**

All final features, fixes, and documentation should be completed by this deadline.

## Project Deadline Notification

This repository includes automation to post project deadline notifications to pull requests. See [PROJECT_DEADLINE.md](PROJECT_DEADLINE.md) for detailed instructions on how to post the deadline comment to PR #1.

### Quick Start

To post the project deadline comment to PR #1:

1. **Via GitHub Actions** (Recommended): Go to Actions → "Post Project Deadline Comment" → Run workflow
2. **Via Script**: Run `./post-deadline-comment.sh` (requires GitHub CLI authentication)
3. **Via GitHub CLI**: `gh pr comment 1 --body "@everyone Please note: The target completion date for the Job Application Copilot project is September 16, 2025. All final features, fixes, and documentation should be completed by this deadline. Thank you!"`