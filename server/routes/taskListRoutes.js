const express = require("express")
const router = express.Router()
const taskListControllers = require("../controllers/taskListControllers")

router.route("/")
    .get(taskListControllers.getAllTaskLists)
    .post(taskListControllers.createNewTaskList)
    .patch(taskListControllers.updateTaskList)
    .delete(taskListControllers.deleteTaskList)

module.exports = router