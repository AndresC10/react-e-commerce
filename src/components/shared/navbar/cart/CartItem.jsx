import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart } from '../../../../store/slices/cart.slice'
import getConfig from '../../../../utils/getConfig'
import './styles/cartItem.css'

const CartItem = ({ item }) => {

    const products = useSelector(state => state.products)

    const dispatch = useDispatch()

    const handlePlus = () => {
        setCounter(counter + 1)
    }

    const handleMinus = () => {
        if (counter - 1 > 0) {
            setCounter(counter - 1)
        }
    }

    const handleImg = e => {
        const img = products?.find(p => {
            if (p.id == e.id) {
                return p.productImgs[0]
            }
        })
        return img.productImgs[0]
    }

    const handleDelete = () => {
        const URL = `https://e-commerce-api.academlo.tech/api/v1/cart/${item.id}`
        axios.delete(URL, getConfig())
            .then(() => dispatch(getUserCart()))
            .catch(err => console.log(err))
    }

    const url = (handleImg(item))

    return (
        <li>
            <article className='cart__card'>
                <div className='cart__box'>
                    <img src={url} className='cart__img' />
                </div>
                <div className='cart__details'>
                    <h3 className='cart__title'>
                        {item.title}
                        <span className='cart__price'>{item.price}</span>
                    </h3>
                    <div className='cart__amount'>
                        <div className='cart__amount__box'>
                            <span className='cart__quantity' >{item.productsInCart.quantity}</span>
                        </div>
                        <i onClick={handleDelete} className="cart__delete-item fa-regular fa-trash-can"></i>
                    </div>
                    <span className='cart__subtotal'>
                        <span className='cart__subtotal-price'>{item.price * item.productsInCart.quantity}</span>
                    </span>
                </div>
            </article>
        </li>)
}

export default CartItem