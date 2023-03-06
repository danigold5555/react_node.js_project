const usersLogic = require("../logic/users-logic")
const express = require("express");
const router = express.Router();

router.post("/register", async (request, response, next) => {
    let userRegistrationData = request.body;
    try {
       await usersLogic.registerUser(userRegistrationData);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});


router.post("/login", async (request, response, next) => {
    let userLoginData = request.body;
    try {
        let successfulLoginResponse = await usersLogic.login(userLoginData);
        response.json(successfulLoginResponse);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/usertype", async (request, response, next) => {
    let currentToken = request.body.currentToken;
    try {
        let loggedInUserObject = await usersLogic.updateUserType(currentToken);
        response.json(loggedInUserObject);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/logout", async (request, response, next) => {
    let currentToken = request.body.currentToken
    try {
       await usersLogic.logOut(currentToken);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.post("/userfollowedvacations", async (request, response, next) => {
    let currentToken = request.body.currentToken
    try {
       let userFollowedVacationsResponse = await usersLogic.userFollowedVacations(currentToken);
        response.json(userFollowedVacationsResponse);
    }
    catch (e) {
        return next(e);
    }
});





module.exports = router;