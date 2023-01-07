import React from 'react'
import './styles/footer.css'

const Footer = () => {
    return (
        <footer className='footer-container'>
            <div className='copyright__title'>&#169; Developed by Andrés Clemente and Onil Blanco.</div>
            <div className='social-container'>
                <div className='social__column'>
                    <h3 className='social__title'>Andrés Clemente</h3>
                    <ul className='social__list'>
                        <a href='https://github.com/AndresC10' target='_blank'><i className="social__icon fa-brands fa-github"></i></a>
                        <a href='https://www.linkedin.com/in/andrés-clemente-35a1b8256/' target='_blank'><i className="social__icon fa-brands fa-linkedin"></i></a>
                        <a href='https://clever-malabi-b0852e.netlify.app' target='_blank'><i className="social__icon fa-solid fa-folder"></i></a>
                    </ul>
                </div>
                <div className='social__column'>
                    <h3 className='social__title'>Onil Blanco</h3>
                    <ul className='social__list'>
                        <a href='https://github.com/OnilBlanco26' target='_blank'><i className="social__icon fa-brands fa-github"></i></a>
                        <a href='https://www.linkedin.com/in/onil-blanco-b69215259/' target='_blank'><i className="social__icon fa-brands fa-linkedin"></i></a>
                        <a href='' target='_blank'><i className="social__icon fa-solid fa-folder"></i></a>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer