import { Router, type Request, type Response } from 'express'
import { db } from '../firebaseAdmin' 

export const searchRouter = Router()

// Get the details of a place with an fsq_id
searchRouter.post('/search', async(req: Request, res:Response) => { 
    try {
        console.log("Request => ",req.body)
        const docRef = await db.collection('test').add({
            first: "Ada",
            last: "Lovelace",
            born: 1815
          });
        console.log(`Documento creado con ID: ${docRef.id}`);
        return res.json({
           success: true,
            data:  docRef.id
        })
  
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
})
