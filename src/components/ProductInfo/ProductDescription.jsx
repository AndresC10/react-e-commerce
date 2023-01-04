import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'

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
        <article>
            <h2>{product?.title}</h2>
            <p>{product?.description}</p>
            <section>
                <span>Price</span>
                <h3>{product?.price}</h3>
            </section>
            <section>
                <h3>Quantity</h3>
                <div>
                    <button onClick={handleMinus}>-</button>
                    <div>{counter}</div>
                    <button onClick={handlePlus}>+</button>
                </div>
            </section>
            <button onClick={handleAddToCart}>Add to cart <i className="fa-solid fa-cart-plus"></i></button>
        </article>
    )
}

export default ProductDescription