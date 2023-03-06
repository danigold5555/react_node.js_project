import IUser from "../Models/IUser";
import IVacations from "../Models/IVacations";

export class AppState {
    public vacations:IVacations[] = [];
    public userFollowedVacationsOrder:IVacations[] = [];
    public editVacation:IVacations[] = [];
    public userFollowedVacationsArray = [];
    public deletedVacation:number = 0;
    public isFollowedVacation:number = 0;
    public currentUserDetails:IUser = {
        userId: 0,
        userName: "guest",
        userType: "guest",
        isSiteLoggedin: 0
    };
}