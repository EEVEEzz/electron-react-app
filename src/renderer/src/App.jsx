import Versions from './components/Versions'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function App() {
  const [theme, setTheme] = useState('dracula')
  return (
    <div className="">
      <div id="submain" data-theme={theme} className="">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
