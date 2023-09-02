import React from 'react'

const Spinner = () => {
  return (
    <div className="flex justify-center">
      <span
        style={{ width: '100px', height: '100px' }}
        className="stat-value items-center mt-10 text-primary"
      >
        LOADING...
      </span>
    </div>
  )
}

export default Spinner
