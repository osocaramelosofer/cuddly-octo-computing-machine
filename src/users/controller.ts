import {  type Request, type Response } from 'express'
import { userService } from './services'

export default {
    createUser: async(req: Request, res:Response) => { 
        try {
            const {name, username, email} =  req.body
            const {success, data} = await userService.createUser({name, username, email})
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
    }
}