/* eslint-disable @typescript-eslint/no-floating-promises */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
import dotenv from 'dotenv'
dotenv.config()
const FSQ_API_KEY = process.env.FSQ_API_KEY ?? ''

interface IProps {
  location: string
  place:string
  category:string
  limit:string
  extraFields?: string[]
}
export async function searchForAPlace ({
  location,
  place,
  category,
  limit,
  extraFields = [] as string[]
}: IProps): Promise<any> {

  try {
    const baseFields = ['fsq_id', 'name', 'location', 'website', 'rating', 'description', 'photos', 'geocodes']
    const fields = baseFields.concat(extraFields).join(',')
  
    const searchParams = new URLSearchParams({
      query: place,
      near: location,
      categories: category,
      fields,
      limit
    })
    const resp = await fetch(`https://api.foursquare.com/v3/places/search?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: FSQ_API_KEY
        }
      })
    if (!resp.ok) {
      throw new Error('Error getting fsq places info.')
    }
    const json = await resp.json()
    const { results } = json
    return results[0]
  } catch (error) {
    console.log("something went wrong", error)
    return error
  }
}
