import React from 'react'
import './styles/navbar.css'

const Navbar = ({ cartModal, setCartModal }) => {
    return (
        <header className='navbar-container'>
            <nav className='navbar__nav'>
                <div className='navbar__title'>
                    <strong>e-commerce</strong>
                </div>
                <button className='navbar__icon'>
                    <i className="fa-regular fa-user"></i>
                </button>
                <button className='navbar__icon'>
                    <i className="fa-solid fa-box-archive"></i>
                </button>
                <button onClick={() => setCartModal(!cartModal)} className={`navbar__icon ${cartModal && 'red'}`}>
                    <i className="fa-solid fa-cart-shopping"></i>
                </button>
            </nav>
        </header>
    )
}

export default Navbar