import React, { useState } from 'react'

const ProductDescription = ({ product }) => {

    const [counter, setCounter] = useState(1)

    const handlePlus = () => {
        setCounter(counter + 1)
    }

    const handleMinus = () => {
        if (counter - 1 > 0) {
            setCounter(counter - 1)
        }
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
                    <div onClick={handlePlus}>-</div>
                    <div>{counter}</div>
                    <div onClick={handleMinus}>+</div>
                </div>
            </section>
            <button>Add to cart <i className="fa-solid fa-cart-plus"></i></button>
        </article>
    )
}

export default ProductDescription