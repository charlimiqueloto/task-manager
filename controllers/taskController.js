const Task = require('../models/task');

//GET Task
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

//GET Task by Id /task/:id
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task)
            return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Create Task
const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const saved = await newTask.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Update Task by Id /task/:id
const updateTaskById = async (req, res) => {
    try {
        const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updated)
            return res.status(404).json({ message: 'Task not found' });
        res.status(400).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete Task by Id /task/:id
const deleteTaskById = async (req, res) => {
    try {
        console.log(req.params.id)
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task Deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById
};