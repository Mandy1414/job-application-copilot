# GitHub Actions & Render Deployment Checklist

## 1. Test Deployment
- Even a minor change (like a README update) triggers the workflow when pushed to `main`.

## 2. Monitor in Actions Tab
- Open your GitHub repo → Actions tab.
- Click the latest run of **Deploy to Render**.
- Confirm steps succeed:
  - Checkout repository
  - Setup Node.js
  - Install dependencies
  - Trigger Render deployment

## 3. Verify on Render
- Visit your Render service URL after workflow completes to confirm deployment.

## 4. Troubleshoot
- Check failed step logs for Node/npm errors or Render API issues.
- Retry workflow by pushing a new commit if needed.

## 5. Customize Workflow (Optional)
- Deploy from other branches.
- Add notifications (Slack, email).
- Trigger on pull requests or tags.