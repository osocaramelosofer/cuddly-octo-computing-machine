import {  type Request, type Response } from 'express'
import { tripPlanService } from './services'

export default {
    createTripPlan: async(req: Request, res:Response) => { 
        try {
            console.log("creating trip plan")
            const { tripPlan } =  req.body
            const {success, data} = await tripPlanService.createTripPlan(tripPlan)
            if(success){
                return res.json({
                   success: true,
                    data:  data.id
                })
            }            
      
        } catch(error){
            console.error(error);
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