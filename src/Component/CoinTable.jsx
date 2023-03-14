import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/Config';
import '../CssFile/CoinTable.css'
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';




const CoinTable = () => {

  const [coins, setCoins] = useState([]);
  // const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("")

  const { currency } = CryptoState();

  const fetchCoins = async () => {

    // setloading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data);
    // setloading(false);
  }

  console.log(coins)

  useEffect(() => {
    fetchCoins();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const nevigate = useNavigate();

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  
  




  return (
    <div className='whole-body'>
      <div className='table-container'>
        <div className='title-search'>
          <h1>Cryptocurrency Prices by Market Cap</h1>
          <input className='place' placeholder='Search for Crypto Currency' type='text' onChange={(e) =>{setsearch(e.target.value)}} /> 
        
        </div>


        <table>
          <thead>

            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {
             
              handleSearch().map((singleCoin, id) =>{
                const profit = singleCoin.price_change_percentage_24h >= 0;
                console.log(profit)

                return(
                <tr key={singleCoin.id} onClick={() => {
                  nevigate(`/coins/${singleCoin.id}`)
                }}>

                  <td className='table-data'>
                    <div className='first-coloum'>
                      <img src={singleCoin.image} alt={singleCoin.name} width='60px' height='60px' />
                      <div className='total-title'>
                        <div className='symbol-style'>{singleCoin.symbol}</div>
                        {singleCoin.name}

                      </div>
                    </div>

                  </td>


                  <td className='table-data another-style'>{singleCoin.current_price}</td>
                  <td className='table-data another-style' style={{color:profit>0 ? "green" : "red"}}>{profit && "+"}{singleCoin.price_change_percentage_24h.toFixed(2)}{"%"}</td>
                  <td className='table-data another-style'>{(currency === 'INR' ? '₹' : '$')} {" "}{singleCoin.market_cap}</td>
                </tr>
              )
              
              })
            }
          </tbody>




        </table>
      </div>
    </div>
  )
}

export default CoinTable
