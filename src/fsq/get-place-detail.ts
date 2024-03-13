/* eslint-disable @typescript-eslint/no-floating-promises */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
import dotenv from 'dotenv'
dotenv.config()
const FSQ_API_KEY = process.env.FSQ_API_KEY ?? ''

interface IProps {
  fsqId: string
  extraFields?: string[]
  limit:string
}
export async function getPlaceDetail ({
  fsqId,
  extraFields = [] as string[],
  limit
}: IProps): Promise<{ success: boolean; data?: any; error?: string }> {

  try {

    const coreFields = ['fsq_id', 'name', 'location', 'website', 'rating', 'description', 'photos']
    const mergedFields = [...coreFields, ...extraFields]
    const fields = mergedFields.join(',')

    const searchParams = new URLSearchParams({
      fields
    })
    const resp = await fetch(`https://api.foursquare.com/v3/places/${fsqId}?${searchParams}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: FSQ_API_KEY
        }
      })
    if (!resp.ok) {
      const errorBody = await resp.json(); 
      return {success:false, error: errorBody.message ?? 'Error retrieving place detail'}
    }

    return { success:true, data: await resp.json() }
  } catch (error) {
    console.log("something retrieving the detail of the place.", error.message)
    return {success:false, error:error.message ?? 'Unexpected error trying to the the place detail info.'}
  }
}
