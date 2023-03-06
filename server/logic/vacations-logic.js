const vacationsDal = require("../dal/vacations-dal");
const pushLogic = require("./push-logic");
const jwt_decode = require('jwt-decode');
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getAllVacations() {
    let vacations = await vacationsDal.getAllVacations();
    if (vacations.length == 0) {
        throw new ServerError(ErrorType.NO_VACATIONS);
    }
    return vacations
}

async function getFollowedVacations() {
    let followedVacations = await vacationsDal.getFollowedVacations();
    return followedVacations
}



async function changedVacation(changedVacationData) {
    if (!changedVacationData.id) {
        throw new ServerError(ErrorType.INVALID_VACATION);
    }
    validateVacationData(changedVacationData)
    if (!await vacationsDal.isVacationExist(changedVacationData.destination)) {
        throw new ServerError(ErrorType.INVALID_VACATION);
    }
   await vacationsDal.changeVacation(changedVacationData);
   pushLogic.broadcast("refresh-vacations",changedVacationData.destination)
}


async function deleteVacation(vacationId, deletedVacationDestination) {
    validateDeletedVacationObject(vacationId, deletedVacationDestination)
    if (!await vacationsDal.isVacationExist(deletedVacationDestination)) {
        throw new ServerError(ErrorType.INVALID_VACATION);
    }
    if (await vacationsDal.isVacationFollowed(vacationId)) {
        throw new ServerError(ErrorType.FOLLOWED_VACATION_DELETE);
    }
    await vacationsDal.deleteVacation(vacationId);
    pushLogic.broadcast("refresh-vacations", deletedVacationDestination)
}


async function addVacation(addedVacationData) {
    validateVacationData(addedVacationData)
    validateAddedVacationFollowers(addedVacationData)
    if (await vacationsDal.isVacationExist(addedVacationData.destination)) {
        throw new ServerError(ErrorType.VACATION_ALREADY_EXISTS);
    }
    await vacationsDal.addVacation(addedVacationData);
    pushLogic.broadcast("refresh-vacations",addedVacationData.destination )
}


async function followedVacation(followedVacationData) {
    validateFollowedVacationData(followedVacationData)
    let currentUserId = validateTokenAndDecryptUserId(followedVacationData.currentToken)
    await vacationsDal.followedVacation(followedVacationData,currentUserId);
}

function validateTokenAndDecryptUserId(currentToken) {
    validateCurrentToken(currentToken)
    let decryptedToken = jwt_decode(currentToken);
    let currentUserId = decryptedToken.userId;
    return currentUserId
}

function validateCurrentToken(currentToken) {
    if (!currentToken) {
        throw new ServerError(ErrorType.INVALID_TOKEN);
        }

        if (!currentToken.startsWith('Bearer ' )){
        throw new ServerError(ErrorType.INVALID_TOKEN);
        }

    }


function validateVacationData(vacationData) {

    if (!vacationData.price || vacationData.price == 0) {
        throw new ServerError(ErrorType.INVALID_VACATION_DATA)
    }

    if (!vacationData.startDate) {
        throw new ServerError(ErrorType.INVALID_VACATION_DATA)
    }

    if (!vacationData.endDate) {
        throw new ServerError(ErrorType.INVALID_VACATION_DATA)
    }

    if (!vacationData.img || vacationData.img == undefined ) {
        throw new ServerError(ErrorType.INVALID_VACATION_DATA)
    }

    if (!vacationData.destination) {
        throw new ServerError(ErrorType.INVALID_VACATION_DATA)
    }
}

function validateAddedVacationFollowers(addedVacationData) {
if (addedVacationData.amountOfFollowers != 0) {
    throw new ServerError(ErrorType.INVALID_VACATION_DATA)
}

if (addedVacationData.isFollowed != 0) {
    throw new ServerError(ErrorType.INVALID_VACATION_DATA)
}
}


function validateFollowedVacationData(followedVacationData) {
    if (followedVacationData.isFollowed != 0 && followedVacationData.isFollowed != 1) {
        throw new ServerError(ErrorType.INVALID_VACATION_FOLLOW_STATUS)
    }
    
    if (!followedVacationData.vacationId) {
        throw new ServerError(ErrorType.INVALID_VACATION);
    }
}

    function validateDeletedVacationObject(vacationId,deletedVacationDestination){
        if (!vacationId)
        {
            throw new ServerError(ErrorType.INVALID_VACATION);
        }
        
        if (!deletedVacationDestination)
        {
            throw new ServerError(ErrorType.INVALID_VACATION_DATA)
        }
    }




module.exports = {
getAllVacations,
getFollowedVacations,
changedVacation,
deleteVacation,
addVacation,
followedVacation
};