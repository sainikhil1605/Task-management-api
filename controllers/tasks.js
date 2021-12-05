const task = require('../models/tasks');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createCustomError } = require('../utils/customError');
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await task.find();
  res.status(200).json(tasks);
});
const createTask = asyncWrapper(async (req, res) => {
  const taskCreated = await task.create(req.body);
  res.status(200).json(taskCreated);
});
const getTask = asyncWrapper(async (req, res, next) => {
  const taskFound = await task.findById(req.params.id);

  if (!taskFound) {
    next(createCustomError('Task not found', 404));
  } else {
    res.status(200).json(taskFound);
  }
});
const updateTask = asyncWrapper(async (req, res, next) => {
  if (
    !(await task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }))
  ) {
    next(createCustomError('Task not found', 404));
  } else {
    res.status(200).json({ message: 'Task updated' });
  }
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  if (!(await task.findByIdAndDelete(req.params.id))) {
    next(createCustomError('Task not found', 404));
  } else {
    res.status(200).json({ message: 'Task deleted' });
  }
});
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
