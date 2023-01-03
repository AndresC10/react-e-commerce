import React from 'react'
import './home/styles/error.css'

const Error = () => {
  return (
    <div className='Error__container'>
        <h1 className='Error__title'>Error</h1>
        <p className='Error__text'>
        You must enter a valid user
        </p>
    </div>
  )
}

export default Error