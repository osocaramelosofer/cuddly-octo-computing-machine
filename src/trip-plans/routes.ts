import { Router } from 'express'
import controller from './controller'

export const tripPlanRouter = Router()
tripPlanRouter.post('/create', controller.createTripPlan)
tripPlanRouter.get('/get-trip-plans', controller.getTripPlans)
tripPlanRouter.post('/save-trip-plan', controller.saveTripPlan)
