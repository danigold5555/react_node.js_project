const connection = require('./connection-wrapper');

async function getAllVacations() {
    let sql = `Select id,destination, price, amount_of_followers as amountOfFollowers, is_followed as isFollowed,
    img_url as img, start_date as startDate, end_date as endDate FROM vacations_table;`
    let vacations = await connection.execute(sql);
    return vacations;
}

async function getFollowedVacations() {
    let sql = `Select destination, amount_of_followers as amountOfFollowers FROM vacations_table where is_followed=1;`
    let followedVacations = await connection.execute(sql);
    return followedVacations;
}


async function changeVacation(changedVacationData) {
    let sql = `Update vacations_table SET price=?, start_date=?, end_date=?, img_url=? WHERE id = ?`
    let parameters = [changedVacationData.price, changedVacationData.startDate, changedVacationData.endDate, changedVacationData.img, changedVacationData.id];
    await connection.executeWithParameters(sql, parameters);
}

async function addVacation(addedVacationData) {
    let sql = `insert into vacations_table(destination, price, amount_of_followers, is_followed,
        img_url, start_date, end_date)`+
        `values(?, ?, ?, ?, ?, ?, ?)`;
    let parameters = [addedVacationData.destination, addedVacationData.price, addedVacationData.amountOfFollowers, addedVacationData.isFollowed,
    addedVacationData.img, addedVacationData.startDate, addedVacationData.endDate];
    await connection.executeWithParameters(sql, parameters);
}


async function deleteVacation(deletedVacationId) {
    let sql = `Delete From vacations_table where id = ?`
    let parameters = [deletedVacationId];
    await connection.executeWithParameters(sql, parameters);
}

async function isVacationExist(vacationDestination) {
    let sql = `Select id From vacations_table where destination = ?`;
    let parameters = [vacationDestination];
    let [existId] = await connection.executeWithParameters(sql, parameters);
    if (existId) {
        return true;
    }
    return false;
}

async function isVacationFollowed(vacationId) {
    let sql = `Select vacation_id as vacationId From followed_vacations where vacation_id = ?`;
    let parameters = [vacationId];
    let [FollowedVacationId] = await connection.executeWithParameters(sql, parameters);
    if (FollowedVacationId) {
        return true;
    }
        return false;
}

async function followedVacation(followedVacationData,currentUserId) {
  if (followedVacationData.isFollowed == 1)
  {
    updateFollowedVacationsTable(followedVacationData,currentUserId)
    increaseVacationFollowers(followedVacationData)
  }
  else {
    let vacationCurrentAmountOfFollowers = await getVacationCurrentAmountOfFollowers(followedVacationData);
    decreaseVacationFollowers(followedVacationData,vacationCurrentAmountOfFollowers) 
    deleteVacationFromFollowedVacationsTable(followedVacationData,currentUserId)
  }
} 

async function updateFollowedVacationsTable(followedVacationData,currentUserId) {
    let sql = `insert into followed_vacations(vacation_id, user_id)`+
        `values(?, ?)`;
    let parameters = [followedVacationData.vacationId,currentUserId];
    await connection.executeWithParameters(sql, parameters); 
}

async function increaseVacationFollowers(followedVacationData) {
    let sql = `Update vacations_table Set is_followed=?, amount_of_followers=amount_of_followers+1 Where id = ?`
    let parameters = [followedVacationData.isFollowed, followedVacationData.vacationId];
    await connection.executeWithParameters(sql, parameters);
}

async function deleteVacationFromFollowedVacationsTable(followedVacationData,currentUserId) {
    let sql = `Delete From followed_vacations where vacation_id = ? And user_id = ?`
    let parameters = [followedVacationData.vacationId,currentUserId];
    await connection.executeWithParameters(sql, parameters); 
}

async function getVacationCurrentAmountOfFollowers(followedVacationData) {
    let sql = `Select amount_of_followers as vacationAmountOfFollowers From vacations_table where id = ?`;
    let parameters = [followedVacationData.vacationId];
    let [response] = await connection.executeWithParameters(sql, parameters);

    return response.vacationAmountOfFollowers
}
  
    async function decreaseVacationFollowers(followedVacationData,vacationCurrentAmountOfFollowers) {
        if (vacationCurrentAmountOfFollowers == 1) {
            let sql = `Update vacations_table Set is_followed=?, amount_of_followers=amount_of_followers-1 Where id = ?`
            let parameters = [followedVacationData.isFollowed, followedVacationData.vacationId];
            await connection.executeWithParameters(sql, parameters);
        }

        else if (vacationCurrentAmountOfFollowers > 1) {
            let sql = `Update vacations_table Set amount_of_followers=amount_of_followers-1 Where id = ?`
            let parameters = [followedVacationData.vacationId];
            await connection.executeWithParameters(sql, parameters);
        }
    }






module.exports = {
    getAllVacations,
    getFollowedVacations,
    changeVacation,
    deleteVacation,
    isVacationExist,
    isVacationFollowed,
    addVacation,
    followedVacation
};