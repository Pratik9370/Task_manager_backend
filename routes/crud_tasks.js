const express = require('express')
require('dotenv').config()
const router = express.Router()

const fetchUser = require('../middleware/fetchUser')

const Tasks = require('../models/Task')
const User = require('../models/User')


router.post("/createTask", fetchUser, async (req, res) => {

  try {
    let { title, description, deadline ,category, status } = req.body
    const userid = req.user.id

    let newTask = await Tasks.create({ user: userid, title, description, deadline, category, status })

    let user = await User.findOne({ _id: userid })
    await user.tasks.push(newTask._id)
    await user.save()
    console.log(newTask)
    res.json({message:'Task added successfully'})
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server error")
  }
})

router.get("/readTasks", fetchUser, async (req, res) => {
  const userid = req.user.id
  const tasks = await Tasks.find({ user: userid })
  res.json(tasks)
})

router.patch("/updateTask/:id", fetchUser, async (req, res) => {
  try {
    let { title, description, category, deadline, status } = req.body;
    let taskId = req.params.id;

    let task = await Tasks.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "You can’t edit others’ notes" });
    }

    let updateFields = { title, description, category, deadline, status };

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      updateFields,
      { new: true }
    );

    res.json({message:'Task updated successfully'});
  } catch (error) {
    console.error("Edit Task Error:", error);
    res.status(500).send("Internal Server error");
  }
});


router.delete("/deleteTask/:id", fetchUser, async (req, res) => {
  try {
    let taskId = req.params.id
    let task = await Tasks.findOne({ _id: taskId })
    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    if (task.user.toString() != req.user.id) {
      return res.status(401).json({ error: "You cant delete others task" })
    }
    await Tasks.findByIdAndDelete(taskId)
    let user = await User.findOne({ _id: req.user.id })
    user.tasks.pull(taskId)
    user.save()
    res.json({ success: "Task deleted successfully" })
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server error")
  }
})

module.exports = router