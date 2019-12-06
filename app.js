const cors = require('cors');
const express = require('express');

const db = require('./src/database');
const tasks = require('./src/tasks');
const logger = require('./src/logger');
const config = require('./src/config');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/', require('./src/routes'));

app.get('*', function(req, res) {
    res.status(404).json({ err: "Not found" });
});

tasks.startTasks();

db.init(() => {
    app.listen(config.HTTP_PORT, function() {
        logger.info(`Channel service running on http://localhost:${config.HTTP_PORT} !`);
    });
});
