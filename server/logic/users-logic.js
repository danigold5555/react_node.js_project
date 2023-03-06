const usersDal = require("../dal/users-dal")
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const jwt_decode = require('jwt-decode');
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function registerUser(userRegistrationData) {
    validateFirstAndLastName(userRegistrationData.lastName, userRegistrationData.firstName)
    validateUserNameAndPassword(userRegistrationData.userName, userRegistrationData.password)
    if (await usersDal.isUserNameExist(userRegistrationData.userName)) {
        throw new ServerError(ErrorType.USER_ALREADY_EXISTS);
    }
    userRegistrationData.password = encryptPassword(userRegistrationData.password);
    await usersDal.registerUser(userRegistrationData);
}


async function login(userLoginData) {
    validateUserNameAndPassword(userLoginData.userName, userLoginData.password)
    let userId = await usersDal.isUserNameExist(userLoginData.userName);
    if (!userId) {
        throw new ServerError(ErrorType.INVALID_CREDENTIALS);
    }
    userLoginData.password = encryptPassword(userLoginData.password);
    let registeredUserPassword = await usersDal.getUserEncryptedPassword(userId);
    if (registeredUserPassword == userLoginData.password) {
       let userToken = await loginUser(userLoginData, userId)
        return { successfulLoginResponse: userToken }
    }
    else {
        throw new ServerError(ErrorType.INVALID_CREDENTIALS);
    }
}

async function loginUser(userLoginData, userId) {
    const userToken = jwt.sign({ password: userLoginData.password, userId: userId }, config.secret);
    await usersDal.login(userId);
    return userToken
}


async function updateUserType(currentToken) {
    let currentUserId = validateTokenAndDecryptUserId(currentToken)
    let loggedInUserDetails = await usersDal.updateUserType(currentUserId);
    if (!loggedInUserDetails) {
        throw new ServerError(ErrorType.INVALID_TOKEN);
    }
    let loggedInUserObject = {
        loggedInUserDetails: loggedInUserDetails.loggedInUserDetails,
        userType: loggedInUserDetails.userType }
        
    return loggedInUserObject
}

async function logOut(currentToken) {
    let currentUserId = validateTokenAndDecryptUserId(currentToken)
    await usersDal.logOut(currentUserId);
}

async function userFollowedVacations(currentToken) {
    let currentUserId = validateTokenAndDecryptUserId(currentToken)
    let followedVacations = await usersDal.userFollowedVacations(currentUserId);
    return followedVacations;
}

function validateTokenAndDecryptUserId(currentToken) {
    validateCurrentToken(currentToken)
    let decryptedToken = jwt_decode(currentToken);
    let currentUserId = decryptedToken.userId;
    return currentUserId
}



function validateUserNameAndPassword(userName, password) {
    if (!userName) {
        throw new ServerError(ErrorType.INVALID_CREDENTIALS);
    }

    if (!password) {
        throw new ServerError(ErrorType.INVALID_CREDENTIALS);
    }

    if (password.length < 8) {
        throw new ServerError(ErrorType.PASSWORD_LENGTH);
    }
}

function validateFirstAndLastName(lastName, firstName) {
    if (!lastName) {
        throw new ServerError(ErrorType.INVALID_CREDENTIALS);
    }

    if (!firstName) {
        throw new ServerError(ErrorType.INVALID_CREDENTIALS);
    }
}


function validateCurrentToken(currentToken) {
    if (!currentToken) {
        throw new ServerError(ErrorType.INVALID_TOKEN);
    }

    if (!currentToken.startsWith('Bearer ')) {
        throw new ServerError(ErrorType.INVALID_TOKEN);
    }

}



function encryptPassword(password) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}


module.exports = {
    registerUser,
    login,
    updateUserType,
    logOut,
    userFollowedVacations
}