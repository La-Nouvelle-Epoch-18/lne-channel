const jwt = require('jsonwebtoken');

const Middleware = {
    parseToken(req, res, next) {
        const authorization = req.headers.authorization;
        let spaceIndex;
        if (authorization && (spaceIndex = authorization.indexOf(' ')) != -1 && authorization.substring(0, spaceIndex) === 'Bearer') {
            req.token = authorization.substring(spaceIndex);
            req.payload = jwt.decode(req.token);
            next();
        }
        else {
            next(new Error("Missing auth token"));
        }
    },
    async verifyToken(req, res, next) {
        // TODO: make a request on user micro-service to check
        next();
    }
};

module.exports = Middleware;
