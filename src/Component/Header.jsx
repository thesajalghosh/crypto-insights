import React from 'react'
import '../CssFile/Header.css'
import {useNavigate} from 'react-router-dom'
import { CryptoState } from '../CryptoContext';

const Header = () => {

    const navigate = useNavigate();

    const {currency, setCurrency} = CryptoState();
    console.log(currency);


    return (
        <>
            <div className="navbar">
                <div className='title' onClick={() =>{navigate('/') } }>
                    Crypto Insights
                </div>
                <div className='select-login'>
                {/*  */}
               
                    <select className='option' value={currency} onChange={ (e)=>{setCurrency(e.target.value)}} >
                        <option value={"USD"}>USD</option>
                        <option  value={"INR"}>INR</option>
                    </select>
                    <button className='btn'>Login</button>
                </div>
            </div>

        </>
    )
}

export default Header
