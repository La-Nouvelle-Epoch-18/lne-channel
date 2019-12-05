const mongoose = require('mongoose');

const RssSourceSchema = new mongoose.Schema({
    user: {
        type: Number,
        index: true
    },
    url: {
        type: String
    }
});

const RssItemSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true,
        trim: true
    },
    link: {
        type: String,
    },
    content: {
        type: String,
    },
    pubDate: {
        type: Date,
        index: true
    },
    user: {
        type: Number,
        index: true
    }
});

const RssSource = mongoose.model('RssSource', RssSourceSchema);
const RssItem = mongoose.model('RssItem', RssItemSchema);

module.exports = {
    RssSource,
    RssItem
};
