import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.route('/')
  .get(getTasks)      // GET /api/tasks - Get all tasks for logged-in user
  .post(createTask);  // POST /api/tasks - Create new task

router.route('/:id')
  .get(getTaskById)   // GET /api/tasks/:id - Get single task
  .put(updateTask)    // PUT /api/tasks/:id - Update task
  .delete(deleteTask); // DELETE /api/tasks/:id - Delete task

export default router;
