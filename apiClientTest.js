const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const clientCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64'
)
const tokenUrl = 'https://www.warcraftlogs.com/oauth/token'
const apiUrl = ``

const getAccessToken = async () => {
  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${clientCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    if (!response.ok) {
      console.error('HTTP error:', response.status, response.statusText)
      console.error('Response body:', await response.text())
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const json = await response.json()
    console.log('Access Token Response:', json)
    return json
  } catch (error) {
    console.error('Error during fetch:', error)
    throw error
  }
}

getAccessToken().then((response) => console.log(response))
