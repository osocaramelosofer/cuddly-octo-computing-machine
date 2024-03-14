export interface IUser {
  uid: string
  photo: string
  username: string
}
export interface ILog {
  id: string
  dateCreated: Date
  user: IUser
}
export interface ILogComment {
  id: string
  dateCreated: Date
  user: IUser
  comment: string
}
export interface ILogCommentReport {
  id: string
  dateCreated: Date
  comment: ILogComment
  reason: string
}
