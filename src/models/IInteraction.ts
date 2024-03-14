import { type ILog, type ILogComment } from './ILog'

export interface IInteraction {
  documentId: string
  comments: ILogComment[]
  shares: ILog[]
  saves: ILog[]
  likes: ILog[]
}
