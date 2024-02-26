import requests
import os
from dotenv import load_dotenv

load_dotenv()

tokenUrl = 'https://www.warcraftlogs.com/oauth/v2/token'

def get_token():
  data = {"grant_type": "client_credentials"}
  auth = (os.getenv('CLIENT_ID'), os.getenv('CLIENT_SECRET'))
  with requests.Session() as session:
    response = session.post(tokenUrl, data=data, auth=auth)
  return response

def main():
  response = get_token()
  print(response.json())