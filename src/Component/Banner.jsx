import React from 'react'
import '../CssFile/Banner.css'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <>
      <div className='main-container'>
        <div className='banner'>
          <div className='tag-line'>
            <h1 className='titles'>Crypto Insights</h1>
            <p className='para'>Get all the Info regarding your favorite Crypto Currency</p>
          </div>
          <Carousel/>

        </div>
      </div>
    </>
  )
}

export default Banner
