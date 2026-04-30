const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.get('/', authMiddleware, listTasks);
router.post('/', authMiddleware, createTask);
router.put('/:taskId', authMiddleware, updateTask);
router.delete('/:taskId', authMiddleware, deleteTask);

module.exports = router;
