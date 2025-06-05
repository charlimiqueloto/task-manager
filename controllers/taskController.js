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

//Get tasks with pagination. Ex: /tasks?page=2&limit=5
const getAllTasksWithPaging = async (req, res) => {
    try {

        console.log(req.query)
        console.log(req.query.page)
        const page = parseInt(req.query.page);
        console.log('page', page)
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const tasks = await Task.find().skip(skip).limit(limit);
        const total = await Task.countDocuments();

        res.json({
            data: tasks,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



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
    deleteTaskById,
    getAllTasksWithPaging
};