import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { OpenAI } from 'openai';

const router = Router();

// Initialize OpenAI (will be null if API key not provided)
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Generate resume content
router.post('/generate-resume', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { jobDescription, userProfile, style = 'professional' } = req.body;

  if (!userProfile) {
    throw createError('User profile is required', 400);
  }

  // Mock response if OpenAI is not configured
  if (!openai) {
    const mockResume = {
      summary: `Experienced professional with expertise in ${userProfile.skills?.slice(0, 3).join(', ') || 'various technologies'}. Proven track record of delivering high-quality results and driving innovation.`,
      experience: [
        {
          title: userProfile.experience || 'Software Developer',
          company: 'Previous Company',
          duration: '2020 - Present',
          achievements: [
            'Led development of key features resulting in 25% performance improvement',
            'Collaborated with cross-functional teams to deliver projects on time',
            'Mentored junior developers and conducted code reviews',
          ],
        },
      ],
      skills: userProfile.skills || ['JavaScript', 'React', 'Node.js', 'Python'],
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          institution: 'University Name',
          year: '2018',
        },
      ],
    };

    return res.json({
      success: true,
      data: mockResume,
      message: 'Mock resume generated (OpenAI not configured)',
    });
  }

  try {
    const prompt = `
      Generate a professional resume content for the following user profile:
      
      Name: ${req.user!.firstName} ${req.user!.lastName}
      Skills: ${userProfile.skills?.join(', ') || 'Not specified'}
      Experience: ${userProfile.experience || 'Not specified'}
      Bio: ${userProfile.bio || 'Not specified'}
      
      Job Description: ${jobDescription || 'General position'}
      
      Style: ${style}
      
      Please provide a JSON response with the following structure:
      {
        "summary": "Professional summary paragraph",
        "experience": [{"title": "", "company": "", "duration": "", "achievements": []}],
        "skills": ["skill1", "skill2"],
        "education": [{"degree": "", "institution": "", "year": ""}]
      }
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const generatedContent = completion.choices[0]?.message?.content;
    
    if (!generatedContent) {
      throw createError('Failed to generate resume content', 500);
    }

    // Try to parse JSON response
    let resumeData;
    try {
      resumeData = JSON.parse(generatedContent);
    } catch {
      // If not JSON, return as plain text
      resumeData = { content: generatedContent };
    }

    res.json({
      success: true,
      data: resumeData,
    });
  } catch (error: any) {
    throw createError(`AI generation failed: ${error.message}`, 500);
  }
}));

// Generate cover letter content
router.post('/generate-cover-letter', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { jobDescription, company, position, userProfile } = req.body;

  if (!company || !position) {
    throw createError('Company and position are required', 400);
  }

  // Mock response if OpenAI is not configured
  if (!openai) {
    const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${position} position at ${company}. With my background in ${userProfile?.skills?.slice(0, 2).join(' and ') || 'technology'}, I am confident that I would be a valuable addition to your team.

In my previous experience, I have developed strong skills in problem-solving and collaboration. I am particularly excited about the opportunity to contribute to ${company}'s mission and work with your innovative team.

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's success. Thank you for considering my application.

Sincerely,
${req.user!.firstName} ${req.user!.lastName}`;

    return res.json({
      success: true,
      data: { content: mockCoverLetter },
      message: 'Mock cover letter generated (OpenAI not configured)',
    });
  }

  try {
    const prompt = `
      Write a professional cover letter for:
      
      Applicant: ${req.user!.firstName} ${req.user!.lastName}
      Position: ${position}
      Company: ${company}
      
      User Profile:
      Skills: ${userProfile?.skills?.join(', ') || 'Not specified'}
      Experience: ${userProfile?.experience || 'Not specified'}
      Bio: ${userProfile?.bio || 'Not specified'}
      
      Job Description: ${jobDescription || 'Not provided'}
      
      Make it personalized, professional, and compelling. The cover letter should be 3-4 paragraphs and highlight relevant skills and experience.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    });

    const generatedContent = completion.choices[0]?.message?.content;
    
    if (!generatedContent) {
      throw createError('Failed to generate cover letter content', 500);
    }

    res.json({
      success: true,
      data: { content: generatedContent },
    });
  } catch (error: any) {
    throw createError(`AI generation failed: ${error.message}`, 500);
  }
}));

// Optimize job description keywords
router.post('/optimize-keywords', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { jobDescription, resumeContent } = req.body;

  if (!jobDescription) {
    throw createError('Job description is required', 400);
  }

  // Mock response if OpenAI is not configured
  if (!openai) {
    const mockKeywords = {
      keywords: ['JavaScript', 'React', 'Node.js', 'teamwork', 'problem-solving'],
      suggestions: [
        'Include more specific technical skills mentioned in the job posting',
        'Highlight collaborative experience',
        'Emphasize problem-solving abilities',
      ],
    };

    return res.json({
      success: true,
      data: mockKeywords,
      message: 'Mock keyword analysis (OpenAI not configured)',
    });
  }

  try {
    const prompt = `
      Analyze the following job description and extract key skills, requirements, and keywords:
      
      ${jobDescription}
      
      ${resumeContent ? `Current Resume Content: ${resumeContent}` : ''}
      
      Please provide a JSON response with:
      {
        "keywords": ["list of important keywords/skills"],
        "suggestions": ["specific suggestions for optimization"]
      }
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 500,
    });

    const generatedContent = completion.choices[0]?.message?.content;
    
    if (!generatedContent) {
      throw createError('Failed to analyze keywords', 500);
    }

    // Try to parse JSON response
    let keywordData;
    try {
      keywordData = JSON.parse(generatedContent);
    } catch {
      keywordData = { content: generatedContent };
    }

    res.json({
      success: true,
      data: keywordData,
    });
  } catch (error: any) {
    throw createError(`AI analysis failed: ${error.message}`, 500);
  }
}));

export default router;