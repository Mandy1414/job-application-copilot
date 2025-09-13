# Job Application Copilot

AI-powered job application tracking, resume optimization, and career management platform. Built with Next.js, Express.js, MongoDB, and OpenAI integration.

## 🌟 Features

- **Smart Application Tracking**: Organize and track all your job applications in one place
- **AI-Powered Resume Generation**: Create optimized resumes tailored to specific job postings
- **Cover Letter Automation**: Generate personalized cover letters with AI assistance
- **Analytics Dashboard**: Get insights into your job search performance
- **OAuth Authentication**: Secure login with Google and GitHub
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Cloud-Ready**: Easy deployment to popular cloud platforms

## 🏗️ Project Structure

```
job-application-copilot/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── config/         # Database and authentication setup
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Custom middleware
│   │   └── index.ts        # Server entry point
│   ├── .env.example        # Environment variables template
│   └── package.json
├── frontend/               # Next.js React application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # Reusable React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and API client
│   │   └── types/         # TypeScript type definitions
│   └── package.json
├── docs/                  # Documentation
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Google OAuth app credentials (optional)
- GitHub OAuth app credentials (optional)
- OpenAI API key (optional, falls back to mock data)

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd job-application-copilot

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

#### Backend Configuration

Copy the environment template and configure your settings:

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-application-copilot

# OAuth (Get these from Google/GitHub developer consoles)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Optional: OpenAI for AI features
OPENAI_API_KEY=your-openai-api-key

# Session Secret (generate a secure random string)
SESSION_SECRET=your-super-secret-session-key
```

#### Frontend Configuration

Create a `.env.local` file in the frontend directory:

```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
```

### 3. Database Setup

The application uses MongoDB Atlas. Create a free cluster at [mongodb.com](https://www.mongodb.com/atlas) and update your `MONGODB_URI` in the backend `.env` file.

### 4. OAuth Setup (Optional but Recommended)

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`

#### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:5000/api/auth/github/callback`

### 5. Start Development Servers

Open two terminal windows:

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📱 Usage

1. **Sign In**: Use Google or GitHub OAuth to authenticate
2. **Dashboard**: View your application statistics and quick actions
3. **Add Applications**: Track new job applications with details
4. **Generate Resume**: Use AI to create optimized resumes
5. **Cover Letters**: Generate personalized cover letters
6. **Profile Management**: Update your skills and preferences

## 🚢 Deployment

### Frontend (Vercel - Recommended)

1. Connect your repository to [Vercel](https://vercel.com)
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL=your-backend-url`
3. Deploy automatically on push

### Backend (Render - Recommended)

1. Connect your repository to [Render](https://render.com)
2. Create a new Web Service
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm start`
5. Add environment variables from your `.env` file

### Alternative Deployment Options

- **Frontend**: Netlify, AWS Amplify, GitHub Pages
- **Backend**: Heroku, Railway, AWS EC2, DigitalOcean

## 🛠️ API Documentation

### Authentication Endpoints
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/github` - GitHub OAuth login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/info` - Update basic user info

### Job Applications
- `GET /api/applications` - List applications
- `POST /api/applications` - Create application
- `GET /api/applications/:id` - Get application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application
- `GET /api/applications/stats/overview` - Get statistics

### AI Tools
- `POST /api/ai/generate-resume` - Generate resume
- `POST /api/ai/generate-cover-letter` - Generate cover letter
- `POST /api/ai/optimize-keywords` - Optimize keywords

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev    # Start with nodemon (auto-reload)
npm run build  # Build TypeScript
npm start      # Start production server
```

### Frontend Development
```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Create Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
2. **Database Connection**: Verify MongoDB URI and network access in Atlas
3. **OAuth Errors**: Check redirect URIs match exactly in OAuth app settings
4. **Build Failures**: Ensure all environment variables are set correctly

### Getting Help

- Check the [Issues](../../issues) page for known problems
- Create a new issue if you encounter bugs
- Join our [Discord community](link-to-discord) for support

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Express.js](https://expressjs.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for the database
- [OpenAI](https://openai.com/) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide Icons](https://lucide.dev/) for beautiful icons