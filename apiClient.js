import 'dotenv/config'
import fs, { write } from 'fs'

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
  fs.writeFileSync('token.txt', JSON.stringify(data))
  return data.access_token
}

const token = async () => {
  try {
    const access_token = JSON.parse(fs.readFileSync('token.txt', 'utf8'))
    return access_token
  } catch (error) {
    getAccessToken()
    console.log('Error:', error)
  }
}

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
  const access_token = await token()
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({ query }),
  })

  return response.json()
}

getData().then((response) => {
  const characterData = response.data
  console.log(characterData)
})
