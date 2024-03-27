import { Router } from 'express'
import controller from './controller'

export const twilioRouter = Router()
twilioRouter.post('/send', controller.sendSMS)