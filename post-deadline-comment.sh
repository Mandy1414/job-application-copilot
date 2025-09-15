#!/bin/bash

# Script to post project deadline comment to PR #1
# Usage: ./post-deadline-comment.sh

REPO_OWNER="Mandy1414"
REPO_NAME="job-application-copilot"
PR_NUMBER="1"
COMMENT_BODY="@everyone Please note: The target completion date for the Job Application Copilot project is September 16, 2025. All final features, fixes, and documentation should be completed by this deadline. Thank you!"

echo "Posting deadline comment to PR #${PR_NUMBER}..."
echo "Repository: ${REPO_OWNER}/${REPO_NAME}"
echo "Comment: ${COMMENT_BODY}"
echo ""

# Check if gh CLI is available
if command -v gh &> /dev/null; then
    echo "Using GitHub CLI..."
    gh pr comment $PR_NUMBER --body "$COMMENT_BODY"
    if [ $? -eq 0 ]; then
        echo "✅ Comment posted successfully!"
    else
        echo "❌ Failed to post comment using GitHub CLI"
        exit 1
    fi
else
    echo "GitHub CLI (gh) not found. Please install it or use the GitHub Actions workflow."
    echo "See PROJECT_DEADLINE.md for alternative methods."
    exit 1
fi