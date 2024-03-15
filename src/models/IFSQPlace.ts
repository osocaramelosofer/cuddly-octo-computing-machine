interface Geocode {
    latitude: number
    longitude: number
  }
  
export interface Geocodes {
roof: Geocode
main: Geocode
}

export interface IFSQPlace {
    fsq_id: string
    description?: string | null
    location?: {
      address?: string | null
      country?: string | null
      cross_street?: string | null
      formatted_address?: string | null
      locality?: string | null
      postcode?: string | null
      region?: string | null
    } | null | undefined
    name: string | null
    photos: any[]
    rating?: number | null
    website?: string | null
    geocodes?: Geocodes
    categoryType: number
  }