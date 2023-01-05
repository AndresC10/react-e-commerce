import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cart from './navbar/Cart'
import './styles/navbar.css'

const Navbar = () => {

    const navigate = useNavigate()

    const [cartModal, setCartModal] = useState(false)
    const [red, setRed] = useState(false)

    const handleNavigate = (route) => {
        navigate((`${route}`))
        setRed(route)
    }

    const handleHome = () => {
        setRed(null)
        setCartModal(false)
    }

    const handleCart = () => {
        const token = localStorage.getItem("token")
        if (token) {
            setCartModal(!cartModal)
        } else {
            navigate('/login')
        }
    }

    return (
        <>
            <header className='navbar-container'>
                <nav className='navbar__nav'>
                    <div className='navbar__title'>
                        <Link style={{ color: '#f85555' }} to={'./'}><strong onClick={handleHome}>E-commerce</strong></Link>
                    </div>
                    <button onClick={() => handleNavigate('/login')} className={`navbar__icon ${red == '/login' && 'red'}`}>
                        <i className="fa-regular fa-user"></i>
                    </button>
                    <button onClick={() => handleNavigate('/purchase')} className={`navbar__icon ${red == '/purchase' && 'red'}`}>
                        <i className="fa-solid fa-box-archive"></i>
                    </button>
                    <button onClick={handleCart} className={`navbar__icon ${cartModal && 'red'}`}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </nav>
            </header>
            <Cart
                cartModal={cartModal}
            />
        </>
    )
}

export default Navbar