import React from 'react'
import { useSelector } from 'react-redux'
import './styles/cart.css'

const Cart = ({ cartModal }) => {

    const products = useSelector(state => state.products)
    const cart = useSelector(state => state.cart)

    const handleImg = e => {
        const img = products?.find(p => {
            if (p.id == e.id) {
                return p.productImgs[0]
            }
        })
        return img.productImgs[0]
    }

    return (
        <div className={`cart-modal ${cartModal && 'opened'}`}>
            <div className='cart-container'>
                <div className='cart-products-container'>
                    <h4 className='cart-products__h4'>Cart</h4>
                    <ul className='cart-products__ul'>
                        {
                            cart?.map(e => {
                                const url = (handleImg(e))
                                return (
                                    <li>
                                        <article className='cart__card'>
                                            <div className='cart__box'>
                                                <img src={url} className='cart__img' />
                                            </div>
                                            <div className='cart__details'>
                                                <h3 className='cart__title'>
                                                    {e.title}
                                                    <span className='cart__price'>{e.price}</span>
                                                </h3>
                                                <div className='cart__amount'>
                                                    <div className='cart__amount-content'>
                                                        <span className='cart__remove-item'>-</span>
                                                        <span className='cart__quantity'>{e.productsInCart.quantity}</span>
                                                        <span className='cart__add-item'>+</span>
                                                    </div>
                                                    <i className="cart__delete-item fa-regular fa-trash-can"></i>
                                                </div>
                                                <span className='cart__subtotal'>
                                                    <span className='cart__stock'>{e.quantity}</span>
                                                    <span className='cart__subtotal-price'>{e.price * e.productsInCart.quantity}</span>
                                                </span>
                                            </div>
                                        </article>
                                    </li>)
                            })
                        }
                    </ul>
                </div>
                <div className='checkout-container'>
                    <div className='checkout-total-price'>
                        <span className='chekout-total-price__span'>Total:</span>
                        <b className='chekout-total-price__b'>price</b>
                    </div>
                    <button className='checkout__btn'>Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Cart