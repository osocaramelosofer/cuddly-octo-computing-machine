import { Router } from 'express'
import controller from './controller'

export const tripPlanRouter = Router()
tripPlanRouter.post('/create', controller.createTripPlan)
