import React from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/product/:barcode' element={<ProductDetail />}/>
    </Routes>
    </>
  )
}

export default App