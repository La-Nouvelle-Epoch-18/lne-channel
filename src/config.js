const config = {
    HTTP_PORT: parseInt(process.env.HTTP_PORT || "8082", 10),
    USER_SERVICE_URL: process.env.USER_SERVICE_URL || "http://localhost:8081",
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/lne-channel',
};

module.exports = config;
