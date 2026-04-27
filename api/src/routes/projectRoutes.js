const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  listProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjectMembers,
  addProjectMember,
  removeProjectMember,
  getProjectMetrics,
} = require('../controllers/projectController');

// Project routes
router.get('/', authMiddleware, listProjects);
router.post('/', authMiddleware, createProject);
router.get('/:projectId', authMiddleware, getProject);
router.put('/:projectId', authMiddleware, updateProject);
router.delete('/:projectId', authMiddleware, deleteProject);

// Project member routes
router.get('/:projectId/members', authMiddleware, getProjectMembers);
router.post('/:projectId/members', authMiddleware, addProjectMember);
router.delete('/:projectId/members/:userId', authMiddleware, removeProjectMember);

// Project metrics
router.get('/:projectId/metrics', authMiddleware, getProjectMetrics);

module.exports = router;