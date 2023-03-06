const vacationsLogic = require("../logic/vacations-logic")
const express = require("express");
const router = express.Router();

router.get("/", async (request,response, next) => {
    try {
        let vacations = await vacationsLogic.getAllVacations();
        response.json(vacations);
    }
    catch (e) {
        return next(e);
    }
})

router.get("/sitefollowedvacations", async (request,response, next) => {
    try {
        let siteFollowedVacations = await vacationsLogic.getFollowedVacations();
        response.json(siteFollowedVacations);
    }
    catch (e) {
        return next(e);
    }
})
    

router.put("/", async (request, response, next) => {
    let changedVacationData = request.body;
    try {
       await vacationsLogic.changedVacation(changedVacationData);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});


router.delete("/:id", async (request, response, next) => {
    let vacationId = request.params.id;
    let deletedVacationDestination = request.body.deletedVacationDestination;
    try {
        await vacationsLogic.deleteVacation(vacationId,deletedVacationDestination);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.post("/", async (request, response, next) => {
    let addedVacation = request.body;
    try {
        await vacationsLogic.addVacation(addedVacation);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});


router.put("/followedvacation", async (request, response, next) => {
    let followedVacationData = request.body;
    try {
        await vacationsLogic.followedVacation(followedVacationData);
        response.json();
    }
    catch (e) {
    return next(e);
    }
});


module.exports = router;