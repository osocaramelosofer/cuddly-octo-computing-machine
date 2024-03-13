import { Router, type Request, type Response } from 'express'
import createJsonSuggestions from '../gpt/jsonSuggestions'
import OpenAI from 'openai'
import { searchForAPlace } from '../fsq/search-for-a-place'
import { answerWithContext } from '../gpt/answerWithContext'

const apiKey = process.env.GPT_API_KEY ?? ''
const openai = new OpenAI({
  apiKey
})

export const chatRouter = Router()


chatRouter.post('/get-json-suggestions', async(req: Request, res:Response) => { 
  try {
    console.log("hola")
    const { userPrompt, messages } = req.body
    const jsonSuggestionsResponse = await answerWithContext({inputMessages: messages,userPrompt})
    const parsedJson = JSON.parse(jsonSuggestionsResponse);
    console.log('===  parsed json ===', parsedJson)
    const {location, activities= [], hotels= [], restaurants= [], clubs = []}:{
      location:string,
      activities: string[],
      hotels: string[],
      restaurants: string[]
      clubs: string[]
    } = parsedJson

    let fsqHotelPromises: Promise<any>[] = []
    let fsqActivityPromises: Promise<any>[] = []
    let fsqRestaurantPromises: Promise<any>[] = []
    let fsqClubPromises: Promise<any>[] = []
    
    if(location === null || location === undefined) throw new Error("no location")

    if(hotels.length > 0){
      hotels.forEach(hotel => {
        fsqHotelPromises.push(searchForAPlace({ location, place: hotel, category: '19014', limit: '1' }));
      })

    }
    if(activities.length > 0 ){
      activities.forEach(activity =>{
        fsqActivityPromises.push(searchForAPlace({ location, place: activity, category: '19028', limit:'1' }))
      })
    }
    if(restaurants.length > 0){
      restaurants.forEach(restaurant => {
       fsqRestaurantPromises.push(searchForAPlace({ location, place: restaurant, category: '13065', limit:'1' }))
      });
    }
    if(clubs.length > 0){
      clubs.forEach(club => {
        fsqClubPromises.push(
          searchForAPlace({ location, place: club, category: '10032', limit:'1' })
        )
      });
    }
    const fsqHotels = await Promise.all(fsqHotelPromises);
    const fsqActivities = await Promise.all(fsqActivityPromises);
    const fsqRestaurants = await Promise.all(fsqRestaurantPromises)
    const fsqClubs = await Promise.all(fsqClubPromises)

    const fsqPlaces = {
      hotels: fsqHotels,
      restaurants: fsqRestaurants,
      activities: fsqActivities,
      clubs: fsqClubs
    }

    res.json({fsqPlaces, originalChatSuggestions: parsedJson})

  } catch(error){
    console.error(error);
    const errorResponse = {
      message: `Error in the request ${error.message}`,
      detail: error.message, 
    };
    res.status(500).json(errorResponse);
  }
})
