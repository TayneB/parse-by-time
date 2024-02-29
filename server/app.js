import fs from 'fs'
import { getAccessToken } from './tokenAcquisition.js'
import { characterData as Query } from './queries/character.js'

const apiUrl = 'https://www.warcraftlogs.com/api/v2/client'

const tokenPath = '../token.txt'

// cant do || or && operator because fs causes errors rather than returning false

const getData = async () => {
  if (!fs.existsSync(tokenPath)) {
    await getAccessToken()
  } else if (
    JSON.parse(fs.readFileSync(tokenPath, 'utf8')).expiration_date <
    new Date().getTime()
  ) {
    await getAccessToken()
  }
  const { access_token } = await JSON.parse(fs.readFileSync(tokenPath, 'utf8'))
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({ Query }),
  })

  return response.json()
}

getData().then((response) => {
  const characterData = response.data.characterData.character
  console.log(characterData)
})
