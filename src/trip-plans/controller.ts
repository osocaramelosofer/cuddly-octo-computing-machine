import {  type Request, type Response } from 'express'
import { tripPlanService } from './services'
import { ITripPlan } from '../models/ITripPlan'
import { IUser } from '../models/ILog'

export default {
    createTripPlan: async(req: Request, res:Response) => { 
        try {
            console.log("creating trip plan")
            const { tripPlan }  =  req.body
            const {success, data, error} = await tripPlanService.createTripPlan(tripPlan)
            if(success){
                return res.status(201).json({
                   success: true,
                   data: data
                })
            } else {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Error creating the trip plan",
                        detail: error ? error.message : ''
                    }
                })
            }
      
        } catch(error){
            res.status(500).json({
                success: false,
                error: {
                    message: `Error in the request: ${error.message}`,
                    detail: error.message,
                    code: "INTERNAL_SERVER_ERROR",
                }
            })
        }
    },
    getTripPlans: async (req: Request, res:Response) => {
        try {
            console.log("Getting trip plans")
            const {success, data, error} = await tripPlanService.getTripPlans()
            if(success){
                return res.status(201).json({
                    success,
                    data
                 })
            } else {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Error creating the trip plan",
                        detail: error ? error.message : ''
                    }
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                error: {
                    message: `Error in the request: ${error.message}`,
                    detail: error.message,
                    code: "INTERNAL_SERVER_ERROR",
                }
            })
        }
    },
    saveTripPlan: async (req: Request, res: Response) => {
        try {
            const { tripPlanId, user } : {tripPlanId: string, user:IUser} = req.body
            if(!tripPlanId) throw new Error('No trip plan id was given')
            if(!user) throw new Error('No user was given')           
            const {success, data} = await tripPlanService.getTripPlan(tripPlanId)
            if(success && data !== undefined){
                const { places, tripName, tripLocation, dates, people, budget} = data
                const newTripPlan: ITripPlan = {
                    tripName,
                    places,
                    tripLocation,
                    dates,
                    people,
                    budget,
                    owner : user,
                    isPrivate: false,
                    invitedUsers: [],
                    interactionRef: ''
                } 
                const {success, error, data: tripPlanCreated} = await tripPlanService.createTripPlan(newTripPlan)
                if(!success) throw new Error(error?.message)
                return res.status(201).json({
                    success: true,
                    data: tripPlanCreated
                })
            }else{
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Error saving the trip plan"
                    }
                })
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                error: {
                    message: `Error in the request: ${error.message}`,
                    detail: error.message,
                    code: "INTERNAL_SERVER_ERROR",
                }
            })
        }
    }
}