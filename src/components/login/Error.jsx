import React from 'react'
import './styles/error.css'

const Error = ({ children }) => {
  return (
    <div className='Error__container'>
      <h1 className='Error__title'>Error</h1>
      <p className='Error__text'>
        {children}
      </p>
    </div>
  )
}

export default Error