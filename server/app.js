const express = require("express");
const cors = require('cors');
const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const loginFilter = require("./filters/login-filter");
const errorHandler = require("./errors/error-handler");
const server = express();

server.use(cors({ origin: "http://localhost:3000"}));
server.use(loginFilter());
server.use(express.json());
server.use("/users", usersController);
server.use("/vacations", vacationsController);

server.use(errorHandler);
server.listen(3001, () => console.log("Listening on http://localhost:3001"));