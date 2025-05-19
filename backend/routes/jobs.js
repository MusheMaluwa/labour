const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { protect, authorize } = require('../middleware/auth');

// Get all jobs - public route
router.get('/', async (req, res) => {
  const jobs = await Job.find().populate('postedBy', 'username role');
  res.json(jobs);
});

// Get job by id
router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id).populate('postedBy', 'username role');
  if (!job) return res.status(404).json({ msg: 'Job not found' });
  res.json(job);
});

// Post a job - employer or admin
router.post('/', protect, authorize('employer', 'admin'), async (req, res) => {
  const { title, company, desc } = req.body;
  if (!title || !company) {
    return res.status(400).json({ msg: 'Title and company are required' });
  }

  const job = new Job({
    title,
    company,
    desc,
    postedBy: req.user.id,
  });

  await job.save();
  res.status(201).json(job);
});

// Update a job - admin or owner (employer who posted it)
router.put('/:id', protect, async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ msg: 'Job not found' });

  // Check ownership or admin
  if (req.user.role !== 'admin' && job.postedBy.toString() !== req.user.id) {
    return res.status(403).json({ msg: 'Not authorized to update this job' });
  }

  const updates = req.body;
  Object.assign(job, updates);
  await job.save();

  res.json(job);
});

// Delete a job - admin or owner (employer who posted it)
router.delete('/:id', protect, async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ msg: 'Job not found' });

  if (req.user.role !== 'admin' && job.postedBy.toString() !== req.user.id) {
    return res.status(403).json({ msg: 'Not authorized to delete this job' });
  }

  await job.deleteOne();
  res.json({ msg: 'Job deleted' });
});

module.exports = router;
