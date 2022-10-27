# Chat app
a demo for minibase project
uses database and functions features of Minibase. 

Backend is completely written with Minibase and frontend is hosted in Github Pages https://thehadiahmadi.github.io/chat

# api
these are api functions which is used by frontend

|name|description|parameters|needs token?|returns|
|---|---|---|---|---|
|login|Login to chat app|{username, password}|No|{token, user}|
|register|Registers a new user|{name, username, password, email, bio?}|No|{token, user}|
|getUsers|returns list of all Users|{}|Yes|[User]|
|getMessages|returns all Messages between two users|{with}|Yes|[Message]|
|sendMessage|Send message to user|{to, message, replyTo}|Yes|Message|

# function usage
You should use POST method to run functions

```js
const token = 'the token which returned from login or register functions'

const message = {
  to: '1234-1234-1234567-123456-1234', // id of the user who will receive the message
  message: 'The content of Message',
  replyTo: null // id of message which you want to reply to
}

const result = await fetch('https://chat.theminibase.com/sendMessage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify(message)
}).then(res => res.json())

console.log(result.data) 
// {
//   id: 'abcd-1234-123124-123124-2356', 
//   message: 'The content of Message', 
//   to: '1234-1234-1234567-123456-1234', 
//   replyTo: null
// }
```

Also you can run functions using Minibase.js file (You can get for your project from Minibase dashboard)
```js
import minibase from './minibase.js'

// set token using setToken method
minibase.setToken('the token....')

const message = {
  to: '1234-1234-1234567-123456-1234', // id of the user who will receive the message
  message: 'The content of Message',
  replyTo: null // id of message which you want to reply to
}

const result = await minibase.sendMessage(message)

console.log(result)
// same as above
```


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
