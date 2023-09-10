const Task = require("../model/Task")
const User = require("../model/User")
const TaskList = require("../model/TaskList")
const mongoose = require("mongoose")
const Mongoose = new mongoose.Mongoose()

const getAllTasks = async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        return res.status(400).json({ message: "UserId required to fetch tasks." })
    }

    const user = await User.findById(userId).exec()

    if (!user) {
        return res.status(401).json({ message: "User does not exist" })
    }

    const tasksIds = user.tasks
    const tasksList = []
    for (const id of tasksIds) {
        const task = await Task.findById(id).exec()
        tasksList.push(task);
    }
    return res.status(201).json(tasksList)

}

const createNewTask = async (req, res) => {
    const { userId, main, dueDate, ofWhatList } = req.body
    if (!userId || !main ) {
        return res.status(401).json({ message: "UserId and main content of task needed." })
    }

    const user = await User.findById(userId).exec()
    if (!user) {
        return res.status(401).json({ message: `User with ${userId} does not exist.` })
    }

    const newTask = await Task.create({
        userId,
        main,
        dueDate, 
        ofWhatList
    })


    if (newTask) {
        user.tasks.push(newTask)
        user.save()

        if (ofWhatList) {
            const list = await TaskList.findById(ofWhatList).exec()
            list.tasks.push(newTask)
            list.save()
        }
        return res.status(201).json({ message: "New Task created" })
    } else {
        return res.status(400).json({ message: "Invalid task data received" })
    }
}

const updateTask = async (req, res) => {
    const { userId, taskId, main, completed, dueDate, ofWhatList } = req.body

    if (!userId || !taskId) {
        return res.status(401).json({ message: "UserId and taskId needed to update task" })
    }

    const task = await Task.findById(taskId).exec();
    if (!task) {
        return res.status(401).json({ message: "Task not found" })
    }

    if (!task.userId.equals(userId)) {
        return res.status(401).json({ message: "UserId of task does not match the userId received" })
    }

    if (main) {
        task.main = main
    }
    if (completed) {
        task.completed = completed
    }
    if (dueDate) {
        task.dueDate = dueDate
    }
    if (ofWhatList) {
        task.ofWhatList = ofWhatList
        const list = await TaskList.findById(ofWhatList).exec()
        list.tasks.push(task)
        list.save()
    }
    const updatedTask = await task.save()
    if (updatedTask) {
        return res.status(201).json({ message: `task with id of ${taskId} updated.` })
    } else {
        return res.status(401).json({ message: "Invalid task data received" })
    }

}

const deleteTask = async (req, res) => {
    const { userId, taskId } = req.body

    if (!userId || !taskId) {
        return res.status(401).json({ message: "UserId and taskId needed to update task" })
    }

    const task = await Task.findById(taskId).exec();
    if (!task) {
        return res.status(401).json({ message: "Task not found" })
    }

    if (!task.userId.equals(userId)) {
        return res.status(401).json({ message: "UserId of task does not match the userId received" })
    }

    const result = await task.deleteOne()
    const user = await User.findById(userId).exec()
    for (let i = 0; i < user.tasks.length; i++) {
        if (user.tasks[i]._id === result._id) {
            user.tasks.splice(i, 1);
            break;
        }
    }

    if (result.ofWhatList) {
        const list = await TaskList.findById(ofWhatList).exec()
        for (let i = 0; i < list.tasks.length; i++) {
            if (list.tasks[i]._id === result._id) {
                list.tasks.splice(i, 1)
                break;
            }
        }
    }
    const reply = `${result._id} task deleted`
    res.json(reply)
}   

const getSingleTask = async (req, res) => {
    const { userId, taskId } = req.body

    if (!userId || !taskId) {
        return res.status(401).json({ message: "UserId and taskId needed to update task" })
    }

    const task = await Task.findById(taskId).exec();
    if (!task) {
        return res.status(401).json({ message: "Task not found" })
    }

    if (task.userId !== userId) {
        return res.status(401).json({ message: "UserId of post does not match the userId received" })
    }

    return res.json(task)
}


module.exports = {
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask,
    getSingleTask
}