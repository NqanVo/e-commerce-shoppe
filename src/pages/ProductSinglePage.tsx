import React, { memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Layout/Footer/Footer'
import Header from '../components/Layout/Header/Header'
import ProductDetail from '../components/ProductDetail/ProductDetail'

import { ProductDetailProps } from '../components/ProductDetail/ProductDetail'
import Loading from '../components/UI/Loading/Loading'

const ProductSinglePage = memo(() => {
  const idProduct = useLocation().pathname.split('/')[2]
  const [productDetail, setProductDetail] = useState<ProductDetailProps>()

  useEffect(() => {
    const getData = () => {
      fetch(`https://dummyjson.com/products/${idProduct}`)
        .then((res) => res.json())
        .then((data) => setProductDetail(data))
    }
    getData()
  }, [])

  return (
    <div className='wrapper'>
      <Header></Header>
      <div className='container container__productDetail'>
        {!productDetail ? (
          <Loading />
        ) : (
          <ProductDetail
            id={productDetail.id}
            brand={productDetail.brand}
            category={productDetail.category}
            description={productDetail.description}
            discountPercentage={productDetail.discountPercentage}
            images={productDetail.images}
            price={productDetail.price}
            rating={productDetail.rating}
            stock={productDetail.stock}
            thumbnail={productDetail.thumbnail}
            title={productDetail.title}
          ></ProductDetail>
        )}
      </div>
      <Footer></Footer>
    </div>
  )
})

export default ProductSinglePage
