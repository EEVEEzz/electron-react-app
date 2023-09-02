### Vite - Electron - React - MongoDB

**The following is my example of building out an ELectron App with React as the frontend and serving data from MongoDB.
I am not formally a developer and followed the Vite, Electron and MongoDB documentation, however I may not follow best practice.**

On that note, this will get you started with Electron React and MongoDB, with a few extras I threw in such as `TailWindCSS` and `DaisyUI`.


Versions at time of writing.

- `Electron v25.8.0`
- `Chromium v114.0.5735.289`
- `Node v18.15.0`
- `V8 v11.4.183.29-electron.0`

- bootstrapped with:
  `npm create @quick-start/electron my-app --template react`

This is a 'quick and simple' demonstration of getting a functioning React and Electron App with MongoDB.

# First, bootstrap an Electron-React App using Vite

`npm create @quick-start/electron my-app --template react`

`cd mp-app`

`npm i`

- install other dependencies
  `npm i react-router-dom react-icons mongoose mongodb dotenv`

- install `TailWindCSS` for Vite
  https://tailwindcss.com/docs/guides/vite

- install `DaisyUI` plugin for `TailWindCSS`

- install dependency
  `npm i daisyui`

- add daisyui plugin to `tailwind.config.js`

```javascript
// tailwind.config.js

plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ]
  }
```

By Default, DaisyUI will use the `dark` theme. You can manually set the overall theme in `index.html` with the `data-theme` property.

```html
<!doctype html>
<html data-theme="luxury">
  <head>
    <!-- some html -->
  </head>
</html>
```

You can also set individual themes to elements

```html
<div>
  <section data-theme="cyberpunk">
    <!-- some html -->
  </section>
  <p data-theme="dracula">
    <!-- some more html -->
  </p>
</div>
```

# HashRouter, Routes and Route

**Using `BrowserRouter` in developement will work, but not in production!**.

_We need to use `HashRouter` for production_

- `App.jsx`

```jsx
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom'
import icons from './assets/icons.svg'
import Home from './pages/Home'
import MongoData from './pages/MongoData'
import About from './pages/About'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/mongo-data" element={<MongoData />} />
      </Routes>
    </Router>
  )
}

export default App
```

# MongoDB

create a new folder in the root of the project.
create a new file named `db.js` in that folder.

```javascript
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://...')
    console.log(`Connected to MONGO_URI`, `${conn.connection.host}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

export default connectDB
```

# main and preload

### main/index.js

in `main/index.js` we use the electron API to create the main window and provide the tools needed to interact with the DOM.

- let's first bring in a few things.

```javascript
import { app, shell, BrowserWindow, ipcMain, ipcRenderer } from 'electron'
import connectDB from '../../config/db.js'
import MongoData from '../../models/MongoModel.js'
```

Find the line
`app.whenReady().then(() => {})`

and call the `connectDB()` function to connect to mongo

```javascript
app.whenReady().then(() => {
  connectDB()
})
```

We need to handle requests to mongo and use the ipcMain and IpcRenderer to interact with the the DOM.

```javascript
// add these at the end of `main/index.js`

ipcMain.handle('mongo-data', async () => await MongoData.find({}))
ipcMain.handle('ipcRenderer', () => ipcRenderer)
```

### preload/index.js

- import `ipcRenderer`

We need to use the `contextBridge.exposeInMainWorld` api and ipcRender to have allow the dom to interact with electron.

find the lines where `electron` and `api` are being exposed.
add the following `contextBridge.exposeInMainWorld`.

> **_NOTE, `'data'` here is the key which is used to access this function in the DOM._**

```javascript
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('data', {
  mongoData: () => ipcRenderer.invoke('mongo-data'),
  ipcRenderer: () => ipcRenderer
})
```

Once we have this setup, we can access the function `mongoData()` in the DOM.

# Component.jsx

```javascript
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Data = () => {
  const { dataId } = useParams()
  const [data, setData] = useState({})

  useEffect(() => {
    func()
  }, [])

  const func = async () => {
    const response = await window.data.ipcRenderer()

    await response.invoke('mongo-data').then((res) => {
      res.map((item) => setData(item._doc))
    })
  }

  return <></>
}

export default Data
```

**IMPORTANT**

- _If you are using a module such as `react-icons`, you will need to make the path relative_

  - use
    `import { FaIcon } from 'react-icons/fa/index.js'`

  - not
    `import { FaIcon } from 'react-icons/fa'`

  else you will get errors.

### A extra note

if you have images coming from external sources, or are using CDNs that are external, you will need to specify them i nthe CSP (Content-Security-Policy) in `index.html`

E.G `img-src 'self' https://url.to.image.com https://url.number2.net;`

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src 'self' 
  https://s3.us-west-004.backblazeb2.com https://cbdmesh.b-cdn.net; 
  script-src 'self'; style-src 'self' 'unsafe-inline'"
/>
```

You may need to specify additional params and fields in `electron.vite.config.js`

```javascript
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        external: ['react-icons/fa']
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        external: ['react-icons/fa']
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        external: ['react-icons/fa']
      }
    }
  }
})
```

### Conclusion

With this you should have a running Electron-React App.
You can continue to use React to build an app as you would normally. Once you are ready for production, you can refer to the `package.json` for CLI.
