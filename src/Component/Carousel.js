import React, { useEffect, useState } from 'react'
import axios from "axios"
import { TrendingCoins } from '../Config/Config'
import { CryptoState } from '../CryptoContext';
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import '../CssFile/Carousel.css'


const Carousel = () => {

  const [trending, setTrending] = useState([]);

  const { currency, symbol } = CryptoState();


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fatchTrandingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data);
  }



  useEffect(() => {
    fatchTrandingCoins()
  }, [currency])

  console.log(trending)

  const items = trending.map((coin) => {

    const profit = coin.price_change_percentage_24h >= 0


    return (<Link to={`/coin/${coin.id}`}>
    <div  className='item-style'>
      <img src={coin?.image} className='carousel-image' alt={coin.name} />
      <span>{coin.symbol}


        <span style={{color:profit>0 ? "green" : "red"}}>{profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}%</span>

      </span>

      <span>
        {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
      </span>
      </div>
    </Link>)
  })

  const responsive = {
    0: { items: 2, },
    1024: { items: 4, },


  };

  return (
    <div className='carousel-container'>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}

      />
    </div>
  )
}

export default Carousel
