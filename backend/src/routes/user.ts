import { Router, Response } from 'express';
import { User } from '../models/User';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();

// Get user profile
router.get('/profile', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.user!._id);
  if (!user) {
    throw createError('User not found', 404);
  }

  res.json({
    success: true,
    data: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
      provider: user.provider,
      profile: user.profile,
      jobPreferences: user.jobPreferences,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
}));

// Update user profile
router.put('/profile', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { profile, jobPreferences } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user!._id,
    {
      ...(profile && { profile: { ...req.user!.profile, ...profile } }),
      ...(jobPreferences && { jobPreferences: { ...req.user!.jobPreferences, ...jobPreferences } }),
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw createError('User not found', 404);
  }

  res.json({
    success: true,
    data: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
      provider: user.provider,
      profile: user.profile,
      jobPreferences: user.jobPreferences,
      updatedAt: user.updatedAt,
    },
  });
}));

// Update basic user info
router.put('/info', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    throw createError('First name and last name are required', 400);
  }

  const user = await User.findByIdAndUpdate(
    req.user!._id,
    { firstName, lastName },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw createError('User not found', 404);
  }

  res.json({
    success: true,
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      updatedAt: user.updatedAt,
    },
  });
}));

export default router;