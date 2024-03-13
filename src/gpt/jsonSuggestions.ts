import OpenAI from 'openai'

const apiKey = process.env.GPT_API_KEY ?? ''
const openai = new OpenAI({
  apiKey
})

async function createJsonSuggestions(userPrompt:string):Promise<any> {
    const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Your name is Babelon, you are an expert travel agent.
            Your task is to give 4 specific place recommendations for each category (hotels, activities, restaurants, clubs).
            Responds in Json format which the key would be the name of the category and it's value will be an array with the name of the place for each suggestion,
            except for location, it's  value will be the place where the user wants to go.
            To answer in the category of clubs consider places such as clubs, bars, breweries, etc., can fall into this category.`
          },
          {
            role: 'assistant',
            content: `
            {
              "location": "location: Seattle, WA",
              "hotels": [The Edgewater, Four Seasons Hotel, Inn at the market, Thompson Seattle],
              "activities": [Space Needle, Pike Place Market, ferry bainbridge island, Discovery Park],
              "restaurants": [Shiro's Sushi, Thai Tom, Momiji, Dukes Seafood],
              "clubs": [Cloudburst Brewing, Fremont Brewing Company, Holy Mountain Brewing Company, Rhino Room]
            }`
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        model: 'gpt-3.5-turbo-1106',
        response_format: { type: "json_object" },
      })
    const jsonSuggestions = completion.choices[0].message.content
    if (jsonSuggestions !== null) { return jsonSuggestions }
    return ''
    
}

export default createJsonSuggestions