#  Typequotes - [**Tq**](https://typequotes.herokuapp.com/)
![screenshot-20211223-00:39:53](https://user-images.githubusercontent.com/47217195/147163045-061c8e94-912b-4520-b298-fa0f52170142.png)

Simple game for practicing your typing skills, Currently it featured an account system to save your score and compete with other players over the leaderboard. 

## Features

- Theme switcher
- Quotes

# Developers

## Setup

- Clone repo
- Create a `.env` file in the root of your project and insert
your key/value pairs in the following format of `KEY=VALUE`:
```SH
# Google auth requirements
GOOGLE_CLIENT_ID = CLIENT_ID
GOOGLE_CLIENT_SECRET = CLIENT_SECRET
CALLBACK_URL= PROVIDE_CALLBACK_URL
SESSTION_KEY = "EXAMPLE_332"

# Mongodb 
MONGODB_DB_URL= MONGODB_CONNECTION_URL

# SERVER PORT
PORT= 3001
NODE_ENV = production
dev: absoluteURI: localhost:3001
```
- Install dependencies using: `npm install`
- Start the app using: `npm run start`
