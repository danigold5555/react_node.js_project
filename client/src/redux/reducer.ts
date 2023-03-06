import { Action } from "./action";
import { ActionType } from "./action-type";
import { AppState } from "./appState";
import { arrayMoveImmutable } from 'array-move';

export function reduce(oldAppState: AppState = new AppState(), action: Action): AppState {

    let newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.currentUserDetails:
            newAppState.currentUserDetails = action.payload.currentUserDetailsObject;
            break;


        case ActionType.getAllVacations:
            newAppState.vacations = action.payload.vacations;
            break;


        case ActionType.userFollowedVacationsOrder:
            newAppState.vacations = arrayMoveImmutable(newAppState.vacations, newAppState.vacations.findIndex((index => index.id == action.payload.vacationId)), 0);
            break;

        case ActionType.userFollowedVacationsArray:
            newAppState.userFollowedVacationsArray = action.payload.userFollowedVacationsIds;
            break;


        case ActionType.deleteVacation:
            let deletedVacationId = action.payload.deletedVacationObject.data.deletedVacationId;
            newAppState.vacations = newAppState.vacations.filter(vacation => vacation.id != deletedVacationId);
            break;

        case ActionType.addVacation:
            newAppState.vacations = [...newAppState.vacations, action.payload.newVacationData]
            break;


        case ActionType.isFollowedVacation:
            newAppState.vacations.map(vacation => {
                if (vacation.id == action.payload.followedVacationId) {
                    if (action.payload.isFollowedVacation == 1) {
                        return (
                            vacation.isFollowed = 1,
                            vacation.amountOfFollowers++,
                            newAppState.vacations = arrayMoveImmutable(newAppState.vacations, newAppState.vacations.findIndex((index => index.id == vacation.id)), 0)
                        )
                    }
                    else { 
                        return (
                            vacation.isFollowed = 0,
                            vacation.amountOfFollowers--
                        )      
                    }
                }
            })     
            break;

        case ActionType.editVacation:
            newAppState.vacations.map(vacation => {
                if (vacation.id == action.payload.vacationChangedDetailsData.id) {
                    return (
                        vacation.price = action.payload.vacationChangedDetailsData.price,
                        vacation.startDate = action.payload.vacationChangedDetailsData.startDate,
                        vacation.endDate = action.payload.vacationChangedDetailsData.endDate,
                        vacation.img = action.payload.vacationChangedDetailsData.img
                    )
                }
            })
            break;
    }

    return newAppState;
}