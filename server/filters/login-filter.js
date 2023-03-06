const expressJwt = require("express-jwt")
const config = require("../config/config.json")
const { secret } = config

function loginFilter() {
    return expressJwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            { url: "/users/register", method: "POST" },
            { url: "/users/login", method: "POST" },
            { url: "/users/usertype", method: "POST" },
            { url: "/vacations", method: "GET" }
        ]
    });
};

module.exports = loginFilter