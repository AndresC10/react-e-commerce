import React from 'react'
import './styles/navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='fixed'>
                <nav>
                    <div className='title'>
                        <strong>e-commerce</strong>
                    </div>
                    <button className='icon'>
                        <i className="fa-regular fa-user"></i>
                    </button>
                    <button className='icon'>
                        <i className="fa-solid fa-box-archive"></i>
                    </button>
                    <button className='icon'>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </nav>
            </div>
        </div>
    )
}

export default Navbar