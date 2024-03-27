import twilio from 'twilio'
import dotenv from 'dotenv'
import { MessageInstance } from 'twilio/lib/rest/previewMessaging/v1/message'

interface ISMSResponse {
    success: boolean,
    data?: any,
    error?: {
        message: string
        detail?: string
        code?: string
    }
}

dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

const twilioClient = twilio(accountSid, authToken)


export const sendSMS = async (to:string, body:string):Promise<ISMSResponse> => {
    try {
        console.log('sending sms');
        
        const message = await twilioClient.messages.create({
            body,
            to,
            from: twilioPhoneNumber
        })
        if(message.status === 'sent'){
            console.log('SMS sent')
            return {
                success: true,
                data: message.toJSON()
            }
        }
        console.log("We couldn't send the sms")
        return {
            success: false,
            error: {
                message: "Something went wrong sending the sms.",
                detail: "none"
            }
        }
    } catch (error) {
        console.log("Error trying to send the sms", error)
        return {
            success: false,
            error: {
                message: error instanceof Error ? error.message : 'Unexpected error',
                detail: error instanceof Error ? error.name : ''
            }
        }
    }
}  