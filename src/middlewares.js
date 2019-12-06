const jwt = require('jsonwebtoken');
const request = require('request');

const config = require('./config');

const Middleware = {
    parseToken(req, res, next) {
        const authorization = req.headers.authorization;
        let spaceIndex;
        if (authorization && (spaceIndex = authorization.indexOf(' ')) != -1 && authorization.substring(0, spaceIndex).toLowerCase() === 'bearer') {
            req.token = authorization.substring(spaceIndex + 1);
            req.payload = jwt.decode(req.token);
            next();
        }
        else {
            next(new Error("Missing auth token"));
        }
    },
    async verifyToken(req, res, next) {
        if (req.payload) {
            request.post(`${config.USER_SERVICE_URL}/v1/auth/verify`, {
                headers: {
                    authorization: 'bearer ' + req.token
                }
            }, (err, response, body) => {
                if (err) {
                    next(err);
                }
                else if (response.statusCode == 200) {
                    next(); // ok
                }
                else {
                    next(new Error("Invalid auth token"));
                }
            });
        }
        else {
            next(new Error("Invalid payload"));
        }
    }
};

module.exports = Middleware;
