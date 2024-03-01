This was built from the ground up using no template. Which was a great learning experience (mistake, haha), currently creating new version that will use similar logic but be based off of a vite react-ts template and be using typescript and react immediately instead of trying to glue typescript into node and then deprecating it once I include a server.

## Intended Functions:
- parse player data by time
- find high parses based on entered characters parse time (per boss)

## Current Functionality
- gets oauth 2 token from warcraft logs
- token only retrieved when expired or nonexistent
- returns data associated with an character

## Installation
1. `git clone` repo
2. `npm install`
3. [Register](https://www.warcraftlogs.com/register) or [Login](https://www.warcraftlogs.com/login) a Warcraft Logs Account 
4. Navigate to [Warcraft Logs Client Management Page](https://www.warcraftlogs.com/api/clients/), make a client and get your `CLIENT_ID` and `CLIENT_SECRET`
5. Create a .env file according to the .env.sample
6. Use `node apiClient` to run app

Note: a `token.txt` file will be generated to store your current token and track its expiration
