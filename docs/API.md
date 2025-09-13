# API Documentation

## Authentication

All protected endpoints require authentication via session cookies. Users authenticate through OAuth providers (Google/GitHub).

### Auth Endpoints

#### `GET /api/auth/google`
Initiates Google OAuth flow.

#### `GET /api/auth/github`
Initiates GitHub OAuth flow.

#### `GET /api/auth/me`
Returns current authenticated user information.

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "fullName": "string",
    "avatar": "string",
    "provider": "google|github"
  }
}
```

#### `POST /api/auth/logout`
Logs out the current user and destroys session.

## User Management

### `GET /api/user/profile`
Get detailed user profile including preferences.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "avatar": "string",
    "profile": {
      "phone": "string",
      "location": "string",
      "bio": "string",
      "skills": ["string"],
      "experience": "string"
    },
    "jobPreferences": {
      "jobTitles": ["string"],
      "locations": ["string"],
      "salaryRange": {
        "min": "number",
        "max": "number",
        "currency": "string"
      }
    }
  }
}
```

### `PUT /api/user/profile`
Update user profile and job preferences.

**Request Body:**
```json
{
  "profile": {
    "phone": "string",
    "location": "string",
    "bio": "string",
    "skills": ["string"],
    "experience": "string"
  },
  "jobPreferences": {
    "jobTitles": ["string"],
    "locations": ["string"],
    "salaryRange": {
      "min": "number",
      "max": "number",
      "currency": "string"
    }
  }
}
```

## Job Applications

### `GET /api/applications`
List user's job applications with pagination and filtering.

**Query Parameters:**
- `status` (optional): Filter by application status
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: updatedAt)
- `sortOrder` (optional): Sort direction (asc/desc, default: desc)

### `POST /api/applications`
Create a new job application.

**Request Body:**
```json
{
  "jobTitle": "string",
  "company": "string",
  "jobDescription": "string",
  "applicationUrl": "string",
  "status": "draft|applied|interview|rejected|offer|accepted",
  "priority": "low|medium|high",
  "location": "string",
  "jobType": "string",
  "source": "string",
  "deadline": "date",
  "notes": "string"
}
```

### `GET /api/applications/:id`
Get specific application details.

### `PUT /api/applications/:id`
Update application information.

### `DELETE /api/applications/:id`
Delete an application.

### `GET /api/applications/stats/overview`
Get application statistics and analytics.

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total": "number",
      "applied": "number",
      "interviews": "number",
      "offers": "number",
      "rejected": "number"
    },
    "statusBreakdown": [
      {
        "_id": "status",
        "count": "number"
      }
    ],
    "monthlyApplications": [
      {
        "_id": {
          "year": "number",
          "month": "number"
        },
        "count": "number"
      }
    ]
  }
}
```

## AI Tools

### `POST /api/ai/generate-resume`
Generate AI-powered resume content.

**Request Body:**
```json
{
  "jobDescription": "string",
  "userProfile": {
    "skills": ["string"],
    "experience": "string",
    "bio": "string"
  },
  "style": "professional|creative|technical"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "string",
    "experience": [
      {
        "title": "string",
        "company": "string",
        "duration": "string",
        "achievements": ["string"]
      }
    ],
    "skills": ["string"],
    "education": [
      {
        "degree": "string",
        "institution": "string",
        "year": "string"
      }
    ]
  }
}
```

### `POST /api/ai/generate-cover-letter`
Generate AI-powered cover letter.

**Request Body:**
```json
{
  "jobDescription": "string",
  "company": "string",
  "position": "string",
  "userProfile": {
    "skills": ["string"],
    "experience": "string",
    "bio": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": "string"
  }
}
```

### `POST /api/ai/optimize-keywords`
Analyze job description and suggest keyword optimizations.

**Request Body:**
```json
{
  "jobDescription": "string",
  "resumeContent": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "keywords": ["string"],
    "suggestions": ["string"]
  }
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": {
    "message": "string",
    "stack": "string" // Only in development
  }
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

- All endpoints are rate limited to 100 requests per 15 minutes per IP
- OAuth endpoints have additional restrictions
- AI endpoints may have lower limits due to external API constraints