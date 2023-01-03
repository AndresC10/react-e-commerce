import { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { useDispatch } from 'react-redux'
import { getAllProducts } from './store/slices/products.slice'
import ProductInfo from './pages/ProductInfo'
import Login from './pages/Login'
import { getUserCart } from './store/slices/cart.slice'
import Navbar from './components/shared/Navbar'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getUserCart())
  }, [])

  /* const data = {
     firstName: 'Mike',
     lastName: 'Morales',
     email: 'mike.morales@mail.com',
     password: 'pass1234',
     phone: '1234567891',
     role: 'admin'
   } */

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<ProductInfo />} />
      </Routes>
    </div>
  )
}


export default App
