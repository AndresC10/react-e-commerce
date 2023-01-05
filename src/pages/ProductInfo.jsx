import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import CardProduct from '../components/home/CardProduct'
import ProductDescription from '../components/ProductInfo/ProductDescription'
import '../components/ProductInfo/styles/productInfo.css'

const ProductInfo = () => {

    const { id } = useParams()

    const [product, setProduct] = useState()
    const [slider, setSlider] = useState(0)
    const [selectedImg, setSelectedImg] = useState(1)
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

    const handleMinus = () => {
        const handleTransform = 100 / product?.productImgs.length
        if (slider - handleTransform >= 0) {
            setSlider(slider - handleTransform)
            setSelectedImg(selectedImg - 1)
        }
    }

    const handlePlus = () => {
        const handleTransform = 100 / product?.productImgs.length
        if (slider + handleTransform < 100) {
            setSlider(slider + handleTransform)
            setSelectedImg(selectedImg + 1)
        }
    }

    return (
        <div className='page-product-description-container'>
            <div className='site'>
                <Link className='site__link' to={'/'}>Home</Link>
                <div className='circle'></div>
                <b>{product?.title}</b>
            </div>
            <div className='product-container'>
                <div className='slider-container'>
                    <div className='img-container'>
                        <div className='slider__left-btn'><button onClick={handleMinus}>&lt;</button></div>
                        <div className='slider__right-btn'><button onClick={handlePlus}>&gt;</button></div>
                        <ul className='slider__img-list' style={{ width: `${product?.productImgs.length * 100}%`, transform: `translate(-${slider}%)` }}>
                            {
                                product?.productImgs.map(e => (
                                    <li key={e} className='slider__img-item'>
                                        <img className='slider__img--img' src={e} alt="" />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <ul className='slider__img-preview'>
                        {
                            product?.productImgs.map((e, i) => (
                                <li key={e} className={`slider__img-item-preview ${selectedImg == 1 + i && 'selected-img'}`}>
                                    <img className='slider__img--img-preview' src={e} alt="" />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <ProductDescription
                    product={product}
                />
            </div>
            <section className='suggestions-container'>
                <h2 className='suggestions__h2'>Discover similar items</h2>
                <ul className='similar-products-container'>
                    {
                        similarProducts?.map(e => {
                            if (e.title !== product.title) {
                                return (
                                    <li className='similar-products'>
                                        <CardProduct
                                            key={e.id}
                                            product={e}
                                        />
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </section>
        </div>
    )
}

export default ProductInfo