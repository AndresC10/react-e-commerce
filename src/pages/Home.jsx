import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Navbar from '../components/shared/Navbar'
import CardProduct from '../components/home/CardProduct'
import Filters from '../components/home/Filters'
import '../components/home/styles/home.css'
import Cart from '../components/home/Cart'

const Home = () => {

    const { register, handleSubmit } = useForm()

    const products = useSelector(state => state.products)
    const cart = useSelector(state => state.cart)
    console.log(cart)
    console.log(products)

    const [filterModal, setFilterModal] = useState(false)
    const [filter, setFilter] = useState()
    const [filteredProducts, setFilteredProducts] = useState()
    const [priceA, setPriceA] = useState(0)
    const [priceB, setPriceB] = useState(0)
    const [searchCriteria, setSearchCriteria] = useState()

    const [cartModal, setCartModal] = useState(false)

    useEffect(() => {
        if (products) {
            setFilteredProducts(products)
        }
    }, [products])

    useEffect(() => {
        if (filter) {
            const pivot = products.filter(prod => prod.category.name === filter)
            setFilteredProducts(pivot)
        }
    }, [filter])

    const filteringByPrice = (e) => {
        if (priceB !== 0) {
            return priceA <= e.price && e.price <= priceB
        } else {
            return priceB <= e.price
        }
    }

    const searchData = data => {
        setSearchCriteria(data.searchCriteria)
    }

    const filteringByName = e => {
        if (searchCriteria) {
            return e.title.toLowerCase().includes(searchCriteria.toLowerCase())
        } else {
            return true
        }
    }

    return (
        <>
            <Navbar
                cartModal={cartModal}
                setCartModal={setCartModal}
            />
            <Cart
                cartModal={cartModal}
            />
            <div className='home'>
                <aside className='home-aside'>
                    <Filters
                        setFilter={setFilter}
                        setFilteredProducts={setFilteredProducts}
                        setPriceA={setPriceA}
                        setPriceB={setPriceB}
                    />
                </aside>
                <section className='main-container'>
                    <div className='search-box'>
                        <form className='search-box__form' onSubmit={handleSubmit(searchData)}>
                            <input className='search-box__form__input' type="text" placeholder='What are you looking for?' {...register('searchCriteria')} />
                            <button className='search-box__form__btn'><i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                        <button className='filter-button' onClick={() => setFilterModal(true)}><i className="filter-button__i fa-solid fa-filter"></i>Filters</button>
                        <div className={`filters-modal-container ${filterModal && 'open'}`}>
                            <button className='filter-modal__btn' onClick={() => setFilterModal(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <h5 className='filters-modal__h5'>Filters</h5>
                            <Filters
                                setFilter={setFilter}
                                setFilteredProducts={setFilteredProducts}
                                setPriceA={setPriceA}
                                setPriceB={setPriceB}
                            />
                        </div>
                    </div>
                    <ul className='products-container'>
                        {
                            filteredProducts?.filter(filteringByName).filter(filteringByPrice).map(product => (
                                <li key={product.id} className='products__li'>
                                    <CardProduct
                                        key={product.id}
                                        product={product}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </div>
        </>
    )
}

export default Home