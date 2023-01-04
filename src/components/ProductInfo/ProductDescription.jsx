import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'
import './styles/productDescription.css'

const ProductDescription = ({ product }) => {

    const [counter, setCounter] = useState(1)
    const dispatch = useDispatch()

    const handlePlus = () => {
        setCounter(counter + 1)
    }

    const handleMinus = () => {
        if (counter - 1 > 0) {
            setCounter(counter - 1)
        }
    }

    const handleAddToCart = () => {
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'
        const data = {
            id: product.id,
            quantity: counter
        }
        axios.post(URL, data, getConfig())
            .then(() => dispatch(getUserCart()))
            .catch(err => console.log(err))
    }

    return (
        <section className='product-description-container'>
            <h2 className='product__title'>{product?.title}</h2>
            <div className='product-data'>
                <div className='product-options'>
                    <div className='product-price-and-quantity'>
                        <div className='product-price'>
                            <span className='product-price__label'>Price</span>
                            <span className='product-price__amount'>{product?.price}</span>
                        </div>
                        <div className='product-quantity'>
                            <div className='product-quantity__label'>Quantity</div>
                            <div className='product-quantity__counter'>
                                <button className='product-quantity__counter__minus' onClick={handleMinus}>-</button>
                                <div className='product-quantity__counter__number'>{counter}</div>
                                <button className='product-quantity__counter__plus' onClick={handlePlus}>+</button>
                            </div>
                        </div>
                    </div>
                    <button className='add-to-cart-btn' onClick={handleAddToCart}>Add to cart <i className="fa-solid fa-cart-plus"></i></button>
                </div>
                <p className='product-description'>{product?.description}</p>
            </div>
        </section>
    )
}

export default ProductDescription