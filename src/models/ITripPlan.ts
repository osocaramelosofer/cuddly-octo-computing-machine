import { IFSQPlace } from "./IFSQPlace"
import IFirebaseUser from "./IFirebaseUser"
import { IInteraction } from "./IInteraction"
import { IUser } from "./ILog"



export interface IInvitedUsers {
  message: string
  status: string
  uid: string
  user: IFirebaseUser
}

interface IBabelonPlace {
    placeId: string
    apiProvider: string
    dates: IDates
    location: string // should be a string?
    categoryType: number // maybe we can handle with numbers, ask Lili
}

interface IDates {
    from: Date
    to: Date
}

  export interface IInvitedUsers {
    message: string
    status: string
    uid: string
    user: IFirebaseUser
  }
  export interface ITripPlan {
    dateCreated?: Date
    dates: IDates
    
    tripName: string
    tripLocation: string
    budget: string
    people: number
    isPrivate: boolean

    owner: IUser
    places: IFSQPlace[]
    invitedUsers: IInvitedUsers[] 

    interactionRef: string
  }


export interface IReadTripPlan extends ITripPlan {
  documentId: string
  interactions?: IInteraction
}
export interface ITripPlanWithInteractions extends IReadTripPlan{
  interactions?: IInteraction
}