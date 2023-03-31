import React from 'react'

import { Routes, Route } from 'react-router-dom'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import ProductSinglePage from './pages/ProductSinglePage'
import ProductsPage from './pages/ProductsPage'
import ProfilePage from './pages/ProfilePage'
function App() {
  return (
    <Routes>
      {/* list products  */}
      <Route path='/' element={<ProductsPage />} />
      <Route path='/category/' element={<ProductsPage />}>
        <Route index path=':categoryName' element={<ProductsPage />} />
      </Route>
      {/* single product  */}
      <Route path='/products/:id' element={<ProductSinglePage />} />
      {/* auth  */}
      <Route path='/login' element={<Login />} />
      {/* profile  */}
      <Route path='/user/*' element={<ProfilePage />} />
      {/* cart */}
      <Route path='/cart' element={<CartPage />} />
    </Routes>
  )
}

export default React.memo(App)
