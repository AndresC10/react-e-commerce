import React from 'react'
import { Link } from 'react-router-dom'
import './styles/navbar.css'

const Navbar = ({ cartModal, setCartModal }) => {
    return (
        <header className='navbar-container'>
            <nav className='navbar__nav'>
                <div className='navbar__title'>
                   <Link style={{color: '#f85555'}} to={'./'}><strong>E-commerce</strong></Link> 
                </div>
                <button className={`navbar__icon`}>
                    <Link  to={'/login'}>
                    <i className="fa-regular fa-user"></i>
                    </Link>
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