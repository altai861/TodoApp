const Task = require("../model/Task")
const TaskList = require("../model/TaskList")
const User = require("../model/User")

const getAllTaskLists = async (req, res) => {
    const { userId } = req.body

    if (!userId) return res.status(400).json({ message: "UserId is needed to get Lists" })

    const user = await User.findById(userId).exec()
    if (!user) {
        return res.status(401).json({ message: "User does not exist" })
    }

    const tasksListIds = user.taskLists
    const tasksLists = []
    for (const id of tasksListIds) {
        const taskList = await TaskList.findById(id).exec()
        tasksLists.push(taskList);
    }
    return res.status(201).json(tasksLists)
}

const createNewTaskList = async (req, res) => {
    const { userId, name } = req.body

    if (!userId || !name) return res.status(401).json({ message: "UserId and name of the list is needed" })

    const user = await User.findById(userId).exec()

    if (!user) return res.status(401).json({ message: `User with ${userId} does not exist` })

    const newList = await TaskList.create({
        userId,
        name
    })

    if (newList) {
        user.taskLists.push(newList._id);
        user.save()
        return res.status(201).json({ message: "Created new List." })
    } else {
        return res.status(400).json({ message: "Invalid list data received" })
    }
}

const updateTaskList = async (req, res) => {
    const { userId, taskListId, name } = req.body
    if (!userId || !taskListId) return res.status(401).json({ message: "UserId and ListId required to update list" })

    const user = await User.findById(userId).exec()
    if (!user) return res.status(401).json({ message: "User does not exist" })

    const index = user.taskLists.findIndex((id) => id.equals(taskListId));

    if (index === -1) {
        return res.status(401).json({ message: "List does not exist to this user" })
    }

    const list = await TaskList.findById(taskListId).exec()

    if (!list) return res.status(401).json({ message: "List does not exist" })

    if (name) {
        list.name = name;
        list.save()
    }

    return res.status(201).json({ message: "List updated" })
}

const deleteTaskList = async (req, res) => {
    const { userId, taskListId } = req.body

    if (!userId || !taskListId) return res.status(401).json({ message: "UserId and ListId required to update list" })

    const user = await User.findById(userId).exec()
    if (!user) return res.status(401).json({ message: "User does not exist" })

    const index = user.taskLists.findIndex((id) => id.equals(taskListId));

    if (index === -1) {
        return res.status(401).json({ message: "List does not exist to this user" })
    }

    const list = await TaskList.findById(taskListId).exec()

    if (!list) return res.status(401).json({ message: "List does not exist" })

    const result = await list.deleteOne();
    if (result) {
        
        for (const id of result.tasks) {
            const task = await Task.findById(id).exec()
            const indexToRemoveInUser = user.tasks.findIndex((id) => id.equals(task._id))
            if (indexToRemoveInUser !== -1) {
                user.tasks.splice(indexToRemoveInUser, 1)
                user.save()
            }
            task.deleteOne();
        }

        const indexToRemove = user.taskLists.findIndex((id) => id.equals(result._id));
        if (indexToRemove !== -1) {
            user.taskLists.splice(indexToRemove, 1);
            user.save()
        }
        
        return res.status(201).json({ message: "deleted successfully" })
    } else {
        return res.status(401).json({ message: "Delete unsuccessful" })
    }
    

}

module.exports = {
    getAllTaskLists,
    createNewTaskList,
    updateTaskList,
    deleteTaskList
}