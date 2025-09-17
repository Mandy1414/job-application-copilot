# Post-Merge Validation & Deployment (Solo Contributor)

This guide helps solo contributors verify that the automated project deadline notification system is live, functional, and documented after merging PRs.

---

## Steps

1️⃣ Run Post-Merge Validation Script

```bash
chmod +x apply-post-merge-check.sh
./apply-post-merge-check.sh
```

✅ Confirm all checks pass:
- Main branch up-to-date
- Workflow file exists
- CLI script works (dry-run)
- Documentation exists
- README badge is visible

2️⃣ Merge PR #3 (choose one)

```bash
gh pr merge 3 --merge      # Merge commit
gh pr merge 3 --squash     # Single commit
gh pr merge 3 --rebase     # Rebase then merge
```

3️⃣ Optional: Clean Up Feature Branch

```bash
git push origin --delete copilot/fix-48dff370-39b1-424b-b01b-3ec17fef060b
```

4️⃣ Verify Live Functionality
- Workflow: Check GitHub Actions tab for “Post Project Deadline Comment”
- CLI Script: Dry-run works

```bash
./post-deadline-comment.sh 1 "September 16, 2025" "Job Application Copilot" "@everyone" --dry-run
```

- README Badge: Badge renders correctly

✅ Once completed, the deadline notification system is fully live and functional.