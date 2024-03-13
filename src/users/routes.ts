import { Router } from 'express'
import controller from './controller'

export const userRouter = Router()
userRouter.post('/create', controller.createUser)
userRouter.get('/get-user', controller.getUser)
