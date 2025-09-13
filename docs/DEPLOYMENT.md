# Deployment Guide

This guide covers deploying the Job Application Copilot to various cloud platforms.

## Prerequisites

- Repository pushed to GitHub
- Environment variables configured
- Database (MongoDB Atlas) set up

## Frontend Deployment

### Vercel (Recommended)

Vercel is optimized for Next.js applications and provides the best experience.

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Build Settings**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Automatic deployments on git push

### Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - New site from Git
   - Choose your repository

2. **Build Settings**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`

3. **Environment Variables**
   Set in Site settings > Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

### AWS Amplify

1. **Connect Repository**
   - AWS Console > Amplify
   - Host web app > GitHub

2. **Build Settings**
   Create `amplify.yml` in repository root:
   ```yaml
   version: 1
   applications:
     - frontend:
         phases:
           preBuild:
             commands:
               - cd frontend
               - npm ci
           build:
             commands:
               - npm run build
         artifacts:
           baseDirectory: frontend/.next
           files:
             - '**/*'
         cache:
           paths:
             - frontend/node_modules/**/*
   ```

## Backend Deployment

### Render (Recommended)

Render provides easy deployment for Node.js applications.

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - New > Web Service
   - Connect your repository

2. **Configuration**
   - Name: `job-copilot-api`
   - Environment: `Node`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Environment Variables**
   Add all variables from `.env.example`:
   ```
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://your-frontend-url.vercel.app
   MONGODB_URI=mongodb+srv://...
   SESSION_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   OPENAI_API_KEY=your-openai-key
   ```

4. **OAuth Callback URLs**
   Update your OAuth apps with production URLs:
   - Google: `https://your-backend-url.onrender.com/api/auth/google/callback`
   - GitHub: `https://your-backend-url.onrender.com/api/auth/github/callback`

### Heroku

1. **Create App**
   ```bash
   heroku create your-app-name
   heroku git:remote -a your-app-name
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=mongodb+srv://...
   heroku config:set SESSION_SECRET=your-secret-key
   # Add all other environment variables
   ```

3. **Create Procfile**
   In backend directory:
   ```
   web: npm start
   release: npm run build
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Railway

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - New Project > Deploy from GitHub

2. **Configuration**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Environment Variables**
   Add all required variables in the Variables tab

## Database Setup

### MongoDB Atlas

1. **Create Cluster**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create free cluster
   - Choose cloud provider and region

2. **Network Access**
   - Add IP addresses: `0.0.0.0/0` (allow all)
   - Or specific IPs for better security

3. **Database User**
   - Create database user with read/write access
   - Note username and password for connection string

4. **Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/job-application-copilot?retryWrites=true&w=majority
   ```

## Domain Configuration

### Custom Domain (Optional)

1. **Purchase Domain**
   - Any domain registrar (Namecheap, GoDaddy, etc.)

2. **DNS Configuration**
   - Frontend: Point to Vercel/Netlify nameservers
   - Backend: CNAME to render.com or other platform

3. **SSL Certificates**
   - Automatically provided by most platforms
   - Ensure HTTPS is enforced

## Monitoring and Logging

### Vercel Analytics
- Enable in Vercel dashboard
- Monitor performance and usage

### Render Logs
- View logs in Render dashboard
- Set up log drains for external monitoring

### Database Monitoring
- Use MongoDB Atlas monitoring
- Set up alerts for performance issues

## Security Checklist

- [ ] Environment variables set correctly
- [ ] OAuth redirect URIs updated for production
- [ ] CORS origins configured properly
- [ ] Database network access configured
- [ ] HTTPS enforced on all endpoints
- [ ] Session secrets are secure random strings
- [ ] API keys are not exposed in frontend code

## Scaling Considerations

### Frontend
- Vercel automatically scales
- Consider CDN for global performance

### Backend
- Render: Scale up plan for more resources
- Consider horizontal scaling for high traffic

### Database
- MongoDB Atlas: Scale cluster size as needed
- Monitor connection limits and performance

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `FRONTEND_URL` in backend environment
   - Ensure exact URL match (no trailing slash)

2. **OAuth Failures**
   - Verify callback URLs in OAuth app settings
   - Check client ID/secret environment variables

3. **Database Connection**
   - Verify connection string format
   - Check network access settings in Atlas

4. **Build Failures**
   - Check build logs for specific errors
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

### Health Checks

Set up health check endpoints:

**Backend Health Check**
```
GET https://your-backend.onrender.com/api/health
```

**Frontend Health Check**
```
GET https://your-frontend.vercel.app/
```

## Backup and Recovery

### Database Backups
- MongoDB Atlas provides automatic backups
- Consider additional backup strategies for critical data

### Code Backups
- Repository is backed up on GitHub
- Tag releases for easy rollbacks

### Environment Variables
- Keep secure backup of all environment variables
- Use secret management services for sensitive data