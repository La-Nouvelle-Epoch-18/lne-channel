const mongoose = require('mongoose');

const config = require('./config');
const logger = require('./logger');

const database = {
    connect() {
        mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        return mongoose.connection;
    },
    init(callback) {
        database.connect().on('error', logger.error).on('disconnected', database.connect).once('open', () => {
            callback();
        });
    }
}

module.exports = database;
