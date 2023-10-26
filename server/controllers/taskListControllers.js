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

   TaskList.find({ userId: userId }, (err, lists) => {
    if (err) {
        console.error(err);
    } else {
        return res.status(201).json(lists);
    }
   })
    
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

    const list = await TaskList.findById(taskListId).exec()

    if (!list) return res.status(401).json({ message: "List does not exist" })

    const result = await list.deleteOne();
    if (result) {
        
        Task.deleteMany({ ofWhatList: result._id }, (err, tasks) => {
            if (err) {
                console.error(err);
            } else {
                return res.status(201).json({ message: "deleted successfully" })
            }
        })
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