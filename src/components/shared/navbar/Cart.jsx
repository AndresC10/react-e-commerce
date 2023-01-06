import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart } from '../../../store/slices/cart.slice'
import getConfig from '../../../utils/getConfig'
import CartItem from './cart/CartItem'
import './styles/cart.css'

const Cart = ({ cartModal, setCartModal }) => {

    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()

    const handleReduce = (acc, item) => acc + (item.price * item.productsInCart.quantity)

    const [response, setResponse] = useState(false)

    const [error, setError] = useState(false)

    const handleCheckOut = () => {
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/purchases'
        const data = {
            "street": "Green St. 1456",
            "colony": "Southwest",
            "zipCode": 12345,
            "city": "USA",
            "references": "Some references"
        }

        if (cart?.length !== 0) {
            axios.post(URL, data, getConfig())
                .then(() => dispatch(getUserCart()))
                .catch(err => {
                    dispatch(getUserCart())
                    console.log(err)
                })
        } else {
            setError(true)
        }
        setCartModal(false)
        setResponse(true)
    }

    const handleAlert = () => {
        setResponse(false)
        setError(false)
    }

    return (
        <div className={`cart-modal ${cartModal && 'opened'}`}>
            <div className='cart-container'>
                <div className='cart-products-container'>
                    <h4 className='cart-products__h4'>Cart</h4>
                    <ul className='cart-products__ul'>
                        {
                            cart?.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                />
                            ))
                        }
                    </ul>
                </div>
                <div className='checkout-container'>
                    <div className='checkout-total-price'>
                        <span className='chekout-total-price__span'>Total:</span>
                        <b className='chekout-total-price__b'>{cart?.reduce(handleReduce, 0)}</b>
                    </div>
                    <button onClick={handleCheckOut} className='checkout__btn'>Checkout</button>
                </div>
                {
                    response &&
                    <div className='message-container'>
                        {
                            error ?
                                <div className={`alert ${error && 'error'}`}>
                                    <span className='response__span' onClick={() => handleAlert()}>x</span>
                                    <p className='alert__p'><span className='alert__span'><i className="fa-sharp fa-solid fa-xmark"></i></span>You need to have at least one item in your cart to make a purchase.</p>
                                </div> :
                                <div className='alert'>
                                    <span className='response__span' onClick={() => handleAlert()}>x</span>
                                    <p className='alert__p'><span className='alert__span'><i className="fa-solid fa-check"></i></span>Checkout successfull.</p>
                                </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart