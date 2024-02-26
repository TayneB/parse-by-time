import 'dotenv/config'

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const clientCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64'
)
const tokenUrl = 'https://www.warcraftlogs.com/oauth/token'
const apiUrl = 'https://www.warcraftlogs.com/api/v2/client'

const getAccessToken = async () => {
  const response = await fetch(tokenUrl, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${clientCredentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const data = await response.json()
  return data.access_token
}

const bearerToken = await getAccessToken()

const query = `
    query {
      characterData {
        character(name: "Marbin", serverSlug: "frostmourne", serverRegion: "us") {
          id
          name
          level
        }
      }
    }
  `

const getData = async () => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({ query }),
  })

  return response.json()
}

getData().then((response) => {
  const characterData = response.data.characterData.character
  console.log(characterData)
})
