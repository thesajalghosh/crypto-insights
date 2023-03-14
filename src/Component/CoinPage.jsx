import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/Config';
import { CryptoState } from '../CryptoContext';
import CoinInfo from '../Component/CoinInfo';
import '../CssFile/CoinPage.css'

const CoinPage = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState([])

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))

    setCoin(data)
  }
  console.log(coin);
  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  useEffect(() => {

    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="coinpage__container">
      <div className='coinpage__sidebar'>
        <img className='sidebar__image' src={coin?.image?.large} alt={coin?.id} />
        <h3 className='sidebar__heading' >{coin?.name}</h3>
        <p className='sidebar__description'>{coin?.description?.en.split(". ")[0]}</p>
        <div className='market__data'>
         <div className='rank'> Rank : {coin?.coingecko_rank}</div>
         <div className='current__price'> Current Price : {numberWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])}</div>
         <div className='matket__cap'> Market Cap : &nbsp;  
         {symbol} {" "} {numberWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()])}</div>
        </div>

      </div>
      <CoinInfo/>



    </div>
  )
}

export default CoinPage
