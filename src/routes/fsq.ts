import { Router, type Request, type Response } from 'express'
import { getPlaceDetail } from '../fsq/get-place-detail'
import { getPlaces } from '../fsq/getPlaces'

export const fsqRouter = Router()

// Get the details of a place with an fsq_id
fsqRouter.post('/get-place-detail', async(req: Request, res:Response) => { 
    try {
      const { fsqId, extraFields, limit } = req.body
      const response = await getPlaceDetail({ fsqId, extraFields, limit })

      if(!response.success){
        res.status(404).json({
            success: false,
            error: {
              message: response.error,
              code: "PLACE_NOT_FOUND", 
            }
        })
        return
      }

      res.json({
        success: true,
        data: response.data
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

// Use for input autocomplete at frontend
fsqRouter.post('/search-places', async (req: Request, res: Response) => {
  try {
    const { location, extraFields } = req.body
    const [hotels, activities, restaurants, clubs] = await Promise.all([
      getPlaces({ location, place: '', category: '19014', limit: '4', extraFields }),
      getPlaces({ location, place: '', category: '19028', limit: '4', extraFields }),
      getPlaces({ location, place: '', category: '13065', limit: '4', extraFields }),
      getPlaces({ location, place: '', category: '10032', limit: '4', extraFields })
    ])
    res.json({ hotels, activities, restaurants, clubs })
  } catch (error) {
    res.status(500).json({ error: `There was an error fsq/search-places: ${error}` })
  }
})

// No sure if we still use this
fsqRouter.post('/places', async (req: Request, res: Response) => {
  try {
    const { location, hotel, activity, food, nightlife, limit, extraFields } = req.body

    const [hotels, activities, restaurants, clubs] = await Promise.all([
      getPlaces({ location, place: hotel, category: '19014', limit, extraFields }),
      getPlaces({ location, place: activity, category: '19028', limit, extraFields }),
      getPlaces({ location, place: food, category: '13065', limit, extraFields }),
      getPlaces({ location, place: nightlife, category: '10032', limit, extraFields })
    ])

    res.json({ hotels, activities, restaurants, clubs })
  } catch (error) {
    res.status(500).json({ error: `There was an error fsq/places: ${error}` })
  }
})