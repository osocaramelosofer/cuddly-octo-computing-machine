import {  type Request, type Response } from 'express'
import { sendSMS } from './service'
export default {
    sendSMS: async(req: Request, res:Response) => {
        try {
            const {to, body} = req.body
            const {success, data} = await sendSMS(to, body)
            if(!success){
                throw new Error('We couldn\'t send the sms')
            }
            res.status(201).json({
                success,
                data:data
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "Error sending the sms",
                    detail: error ? error.message : ''
                }
            })
        }
    }
}