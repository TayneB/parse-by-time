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
3. [Register](https://www.warcraftlogs.com/register) a Warcraft Logs Account or [Login](https://www.warcraftlogs.com/login) 
4. Retrieve a `CLIENT_ID` and `CLIENT_SECRET` from [Warcraft Logs Client Management Page](https://www.warcraftlogs.com/api/clients/)
5. Create and update a .env file according to the .env.sample
6. Use `node apiClient` to run app

Note: a `token.txt` file will be generated to store your current token and track its expiration