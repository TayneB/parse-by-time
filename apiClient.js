const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const tokenUrl = 'https://www.warcraftlogs.com/oauth/token'
const apiUrl = ``

const getAccessToken = async () => {
  return await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: `grant_type=client_credentials`,
  })
    .then((res) => res.json())
    .then((data) => data.access_token)
}

getAccessToken().then((token) => console.log(token))
