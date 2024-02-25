const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const clientCredentials = btoa(`${clientId}:${clientSecret}`)
const tokenUrl = 'https://www.warcraftlogs.com/oauth/token'
const apiUrl = ``

console.log(clientCredentials)
const getAccessToken = async () => {
  const response = await fetch(tokenUrl, {
    method: 'POST',
  })
}

getAccessToken()
