const express = require("express")
const router = express.Router()
const taskControllers = require('../controllers/taskControllers')

router.route("/")
    .get(taskControllers.getAllTasks)
    .post(taskControllers.createNewTask)
    .patch(taskControllers.updateTask)
    .delete(taskControllers.deleteTask)

router.route("/:taskId")
    .get(taskControllers.getSingleTask)

module.exports = router;