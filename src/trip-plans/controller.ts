import {  type Request, type Response } from 'express'
import { tripPlanService } from './services'
import { ITripPlan } from '../models/ITripPlan'

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
    
}