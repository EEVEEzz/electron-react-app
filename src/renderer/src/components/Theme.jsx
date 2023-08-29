import React, { useEffect, useState } from 'react'
import $ from 'jquery'

const Theme = () => {
  const [theme, setTheme] = useState('lofi')

  const toggleTheme = () => {
    if (theme === 'lofi') {
      setTheme('dracula')
      $('#submain').attr('data-theme', 'dracula')
      localStorage.setItem('theme', 'dracula')
    } else {
      setTheme('lofi')
      $('#submain').attr('data-theme', 'lofi')
      localStorage.setItem('theme', 'lofi')
    }
  }

  useEffect(() => {
    localStorage.getItem('theme')
      ? setTheme(localStorage.getItem('theme'))
      : localStorage.setItem('theme', 'dracula')
  }, [setTheme])

  return (
    <div className="">
      <div className="">
        <button className="btn btn-primary btn-xs w-fit" onClick={toggleTheme}>
          {theme === 'lofi' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </div>
  )
}

export default Theme
