import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'
import CartItem from '../cart/CartItem'
import './styles/cart.css'

const Cart = ({ cartModal }) => {

    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()

    const handleReduce = (acc, item) => acc + (item.price * item.productsInCart.quantity)

    const handleCheckOut = () => {
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/purchases'
        const data = {
            "street": "Green St. 1456",
            "colony": "Southwest",
            "zipCode": 12345,
            "city": "USA",
            "references": "Some references"
        }
        axios.post(URL, data, getConfig())
            .then(() => dispatch(getUserCart()))
            .catch(err => {
                dispatch(getUserCart())
                console.log(err)
            }
            )
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
            </div>
        </div>
    )
}

export default Cart