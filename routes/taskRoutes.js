const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController')

router.get('/', TaskController.getAllTasks);

router.get('/:id', TaskController.getTaskById);

router.post('/', TaskController.createTask);

router.put('/:id', TaskController.updateTaskById);

router.delete('/:id', TaskController.deleteTaskById)

module.exports = router;