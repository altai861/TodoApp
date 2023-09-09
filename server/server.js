require('dotenv').config()
const express = require('express')
const path = require('path');
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logger");
const connectDB = require('./config/dbConn');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3500;

connectDB();

// middlewares
app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.use("/", require('./routes/root'))

app.use('/users', require("./routes/usersRoutes"))

app.use('/auth', require('./routes/authRoutes'))

app.use('/tasks', require('./routes/tasksRoutes'))

app.use('/taskList', require('./routes/taskListRoutes'))

app.all("*", (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(port, () => console.log(`Server running on port ${port}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})