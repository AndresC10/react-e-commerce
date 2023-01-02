import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CardProduct from '../components/home/CardProduct'
import ProductDescription from '../components/ProductInfo/ProductDescription'

const ProductInfo = () => {

    const { id } = useParams()

    const [product, setProduct] = useState()
    const [similarProducts, setSimilarProducts] = useState()

    const products = useSelector(state => state.products)

    useEffect(() => {
        const URL = `https://e-commerce-api.academlo.tech/api/v1/products/${id}`
        axios.get(URL)
            .then(res => setProduct(res.data.data.product))
            .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        if (products && product) {
            const pivot = products.filter(prod => prod.category.name === product.category)
            setSimilarProducts(pivot)
        }
    }, [products, product])

    return (
        <div>
            <ProductDescription
                product={product}
            />
            <section>
                <h2>Discover similar items</h2>
                <div className='similar-products-container'>
                    {
                        similarProducts?.map(e => {
                            if (e.title !== product.title) {
                                return (
                                    <CardProduct
                                        key={e.id}
                                        product={e}
                                    />
                                )
                            }
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default ProductInfo