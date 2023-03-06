let ErrorType = {
    
    TECHNICAL_ERROR: {id: 1, httpCode: 600, message : "There has been a general error, please try again later", isShowStackTrace: true},
    VACATION_ALREADY_EXISTS: {id: 2, httpCode: 601, message: "Vacation already exists", isShowStackTrace: false},
    USER_ALREADY_EXISTS: {id: 3, httpCode: 602, message: "User already exists", isShowStackTrace: false},
    INVALID_CREDENTIALS: {id: 4, httpCode: 603, message: "Invalid user credentials", isShowStackTrace: false},
    PASSWORD_LENGTH: {id: 5, httpCode: 604, message: "Password length must be at least 8 characters", isShowStackTrace: false},
    INVALID_TOKEN: {id: 6, httpCode: 401, message: "Invalid token", isShowStackTrace: true},
    NO_VACATIONS: {id: 7, httpCode: 606, message: "No vacations were found in DB", isShowStackTrace: true},
    INVALID_VACATION: {id: 8, httpCode: 607, message: "Invalid vacation id", isShowStackTrace: false},
    INVALID_VACATION_DATA: {id: 9, httpCode: 608, message: "Invalid vacation data", isShowStackTrace: false},
    INVALID_VACATION_FOLLOW_STATUS: {id: 10, httpCode: 609, message: "Invalid vacation follow status", isShowStackTrace: false},
    FOLLOWED_VACATION_DELETE: {id: 11, httpCode: 610, message: "Vacation is liked by site users & can't be deleted", isShowStackTrace: false},

    
}

module.exports = ErrorType;