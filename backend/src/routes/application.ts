import { Router, Response } from 'express';
import { JobApplication } from '../models/JobApplication';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();

// Get all applications for user
router.get('/', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { status, page = 1, limit = 10, sortBy = 'updatedAt', sortOrder = 'desc' } = req.query;

  const filter: any = { userId: req.user!._id };
  if (status) {
    filter.status = status;
  }

  const applications = await JobApplication.find(filter)
    .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 })
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  const total = await JobApplication.countDocuments(filter);

  res.json({
    success: true,
    data: applications,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
}));

// Get application by ID
router.get('/:id', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const application = await JobApplication.findOne({
    _id: req.params.id,
    userId: req.user!._id,
  });

  if (!application) {
    throw createError('Application not found', 404);
  }

  res.json({
    success: true,
    data: application,
  });
}));

// Create new application
router.post('/', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const applicationData = {
    ...req.body,
    userId: req.user!._id,
  };

  const application = new JobApplication(applicationData);
  await application.save();

  res.status(201).json({
    success: true,
    data: application,
  });
}));

// Update application
router.put('/:id', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const application = await JobApplication.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!application) {
    throw createError('Application not found', 404);
  }

  res.json({
    success: true,
    data: application,
  });
}));

// Delete application
router.delete('/:id', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const application = await JobApplication.findOneAndDelete({
    _id: req.params.id,
    userId: req.user!._id,
  });

  if (!application) {
    throw createError('Application not found', 404);
  }

  res.json({
    success: true,
    message: 'Application deleted successfully',
  });
}));

// Get application statistics
router.get('/stats/overview', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!._id;

  const totalApplications = await JobApplication.countDocuments({ userId });
  const appliedCount = await JobApplication.countDocuments({ userId, status: 'applied' });
  const interviewCount = await JobApplication.countDocuments({ userId, status: 'interview' });
  const offerCount = await JobApplication.countDocuments({ userId, status: 'offer' });
  const rejectedCount = await JobApplication.countDocuments({ userId, status: 'rejected' });

  const statusBreakdown = await JobApplication.aggregate([
    { $match: { userId } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const monthlyApplications = await JobApplication.aggregate([
    { $match: { userId, appliedDate: { $exists: true } } },
    {
      $group: {
        _id: {
          year: { $year: '$appliedDate' },
          month: { $month: '$appliedDate' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  res.json({
    success: true,
    data: {
      summary: {
        total: totalApplications,
        applied: appliedCount,
        interviews: interviewCount,
        offers: offerCount,
        rejected: rejectedCount,
      },
      statusBreakdown,
      monthlyApplications,
    },
  });
}));

export default router;