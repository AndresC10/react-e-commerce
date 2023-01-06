import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import './styles/filters.css'

const Filters = ({ setFilter, setFilteredProducts, setPriceA, setPriceB }) => {

    const { register, handleSubmit } = useForm()

    const products = useSelector(state => state.products)

    const [categories, setCategories] = useState()
    const [closed, setClosed] = useState(false)
    const [closed1, setClosed1] = useState(false)

    useEffect(() => {
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/products/categories'
        axios.get(URL)
            .then(res => setCategories(res.data.data.categories))
            .catch(err => console.log(err))
    }, [])

    const handleClick = e => {
        setFilter(e.target.value)
    }

    const handleClosed = () => {
        setClosed(!closed)
    }

    const handleClosed1 = () => {
        setClosed1(!closed1)
    }

    const restartProducts = () => {
        setFilteredProducts(products)
        setFilter()
    }

    const submit = data => {
        setPriceA(+data.priceA)
        setPriceB(+data.priceB)
    }

    return (
        <div className='filters-container'>
            <div className={`filter__drop__down ${closed && 'closed'}`}>
                <div className='filter__header' onClick={handleClosed}>
                    <span className='filter__span'>Price</span>
                    <i className="filter__icon fa-solid fa-chevron-down"></i>
                </div>
                <form className='filter__price__form' onSubmit={handleSubmit(submit)}>
                    <div htmlFor="priceA">
                        <label htmlFor="priceA">From</label>
                        <input type="number" id='priceA'  {...register('priceA')} />
                    </div>
                    <div htmlFor="priceB">
                        <label htmlFor="priceB">To</label>
                        <input type="number" id='priceB'  {...register('priceB')} />
                    </div>
                    <button>Filter price</button>
                </form>
            </div>
            <div className={`filter__drop__down  ${closed1 && 'closed'}`}>
                <div className='filter__header' onClick={handleClosed1}>
                    <span className='filter__span'>Category</span>
                    <i className="filter__icon fa-solid fa-chevron-down"></i>
                </div>
                <ul className='category-filter'>
                    <li className='category__filter__li'>
                        <button onClick={restartProducts} className='category__filter__btn'>All categories</button>
                    </li>
                    {
                        categories?.map(e => (
                            <li key={e.id} className='category__filter__li'>
                                <button onClick={handleClick} value={e.name} className='category__filter__btn'>{e.name}</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Filters