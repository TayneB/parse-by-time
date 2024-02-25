const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const clientCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64'
)
const tokenUrl = 'https://www.warcraftlogs.com/oauth/token'
const apiUrl = ``

const getAccessToken = async () => {
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${clientCredentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  return response.json()
}

getAccessToken().then((response) => console.log(response))
