import IFirebaseUser from "./IFirebaseUser"
import { IUser } from "./ILog"


interface IBabelonPlace {
    placeId: string
    apiProvider: string
    dates: ITravelDates
    location: string // should be a string?
    categoryType: number // maybe we can handle with numbers, ask Lili
}

interface ITravelDates {
    startDate: Date
    endDate: Date
  }

  export interface IInvitedUsers {
    message: string
    status: string
    uid: string
    user: IFirebaseUser
  }
  export interface ITripPlan {
    dateCreated?: Date
    travelDates: ITravelDates
    
    tripName: string
    tripLocation: string
    budget: string
    people: number
    isPrivate: boolean

    owner: IUser
    places: IBabelonPlace[] 
  }
