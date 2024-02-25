import fetch from 'node-fetch'
import querystring from 'querystring'

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const tokenUrl = 'https://www.warcraftlogs.com/oauth/token'
const apiUrl = 'https://your-api-url/graphql' // Replace with your actual API URL

// Step 1: Request Access Token using Client Credentials Flow
const requestAccessToken = async () => {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64'
  )
  const body = querystring.stringify({ grant_type: 'client_credentials' })

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body,
    })

    if (!response.ok) {
      throw new Error(`Failed to obtain access token: ${response.statusText}`)
    }

    const data = await response.json()
    const accessToken = data.access_token

    // Step 2: Use Access Token to make API request
    await makeApiRequest(accessToken)
  } catch (error) {
    console.error(error.message)
  }
}

// Step 2: Make API Request using obtained Access Token
const makeApiRequest = async (accessToken) => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const responseData = await response.json()
    console.log('API Response:', responseData)
  } catch (error) {
    console.error(error.message)
  }
}

// Trigger the process
requestAccessToken()
