import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '../.env' })

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const clientCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64'
)

const tokenUrl = 'https://www.warcraftlogs.com/oauth/token'
const tokenPath = '../token.txt'

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
  fs.writeFileSync(tokenPath, JSON.stringify(data))
  return data.access_token
}

export { getAccessToken }
