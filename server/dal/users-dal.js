const connection = require('./connection-wrapper');

async function registerUser(userRegistrationData) {
    let sql = `insert into users(first_name,last_name, user_name, password) ` +
        `values(?, ?, ?, ?)`;
    let parameters = [userRegistrationData.firstName, userRegistrationData.lastName, userRegistrationData.userName, userRegistrationData.password];
    await connection.executeWithParameters(sql, parameters);
}

async function isUserNameExist(userName) {
    let sql = `SELECT id from users where user_name = ?`;
    let parameters = [userName];
    let [response] = await connection.executeWithParameters(sql, parameters);
    if (!response) {
        return false;
    }
    return response.id
}

async function getUserEncryptedPassword(userId) {
    let sql = `SELECT password from users where id = ?`;
    let parameters = [userId];
    let [response] = await connection.executeWithParameters(sql,parameters);

 return response.password
}


async function updateUserType(currentUserId) {
    let sql = `SELECT id as userId, user_name as userName from users where id = ?`;
    let parameters = [currentUserId];
    let [loggedInUserDetails] = await connection.executeWithParameters(sql, parameters);
    if (!loggedInUserDetails) {
        return false
    }
    let userType = checkUserType(loggedInUserDetails);
    await updateUserTypeInDb(userType,loggedInUserDetails.userId)
    return {loggedInUserDetails,userType}
}

function checkUserType(loggedInUserDetails) {
    if (loggedInUserDetails.userName != "admin") {
       return "user";
    }
    else {
        return "admin";
    }
}

async function updateUserTypeInDb(userType, userId) {
    let sql = `Update users Set user_type=? where id = ?`;
    let parameters = [userType, userId];
    await connection.executeWithParameters(sql, parameters);
}


async function login(currentUserId) {
    let sql = `Update users Set is_logged_in=1 where id = ?`;
    let parameters = [currentUserId]
    await connection.executeWithParameters(sql, parameters);
}

async function logOut(currentUserId) {
    let sql = `Update users Set is_logged_in=0 where id = ?`;
    let parameters = [currentUserId];
    await connection.executeWithParameters(sql, parameters);
}

async function userFollowedVacations(userId) {
    let sql = `Select vacation_id as followedVacationId From followed_vacations where user_id = ?`;
    let parameters = [userId];
    let userFollowedVacationsArray = await connection.executeWithParameters(sql, parameters);
    return userFollowedVacationsArray;
}



module.exports = {
    registerUser,
    isUserNameExist,
    getUserEncryptedPassword,
    login,
    updateUserType,
    logOut,
    userFollowedVacations
};