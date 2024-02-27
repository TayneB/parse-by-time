import 'dotenv/config'
import fs, { write } from 'fs'
import { get } from 'http'

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
  let data = await response.json()
  data = {
    ...data,
    expiration_date: new Date().getTime() + data.expires_in * 1000,
  }
  console.log('Grabbing new token')
  fs.writeFileSync('token.txt', JSON.stringify(data))
  return data.access_token
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
  if (!fs.existsSync('token.txt')) {
    await getAccessToken()
  } else if (
    JSON.parse(fs.readFileSync('token.txt', 'utf8')).expiration_date <
    new Date().getTime()
  ) {
    await getAccessToken()
  }
  const { access_token } = await JSON.parse(
    fs.readFileSync('token.txt', 'utf8')
  )
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
  const characterData = response.data.characterData.character
  console.log(characterData)
})
