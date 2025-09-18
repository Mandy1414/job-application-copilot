# How to Check Your GitHub Actions Workflow and Render Deployment

## 1. Go to the Actions Tab

- Open your repo: Mandy1414/job-application-copilot
- Click Actions on the top menu.

## 2. Find the Latest Workflow Run

- Look for the workflow named Deploy to Render.
- Green check ✅ = success, red X ❌ = failure.

## 3. Open the Workflow Run

- Click the run to see all steps.
- Expected steps:
  - Checkout repository ✅
  - Setup Node.js ✅
  - Install dependencies ✅
  - Trigger Render deployment ✅

## 4. Confirm Render Deployment

- Go to your Render dashboard → your service.
- Check timestamp → matches push time.
- Visit your Render URL → backend should be live.

## 5. Troubleshooting Tips

- Click any failed step in Actions for full logs.
- Common issues:
  - Secrets not set correctly (RENDER_API_KEY or RENDER_SERVICE_ID)
  - Missing package.json or server.js
  - Node version mismatch

## 6. Testing Deployment

- Make a tiny change and push to main:
```bash
echo "Testing Render deployment workflow ✅" >> README.md
git add README.md
git commit -m "Test Render deployment workflow"
git push
```

- Watch Actions → confirm Render deployment.