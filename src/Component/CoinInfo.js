import axios from "axios";
import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../Config/Config";

import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import '../CssFile/CoinInfo.css';
import { chartDays } from "../ButtonData";
import SelectButtons from "./SelectButtons";





const CoinInfo = ({ coin }) => {
  Chart.register(CategoryScale);
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  // const [flag,setflag] = useState(false);

  


  const fetchHistoricData = async () => {
    try {
      if (!coin.id) {
        throw new Error('Coin ID is not defined');
      }
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(historicData);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[coin.id]);

  console.log(historicData);
  console.log(setDays)

  

  return (
    
          <div>
          <div className='chart'>
         <Line
              data={{
                labels: historicData?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData?.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            /> 
            </div>

            <div className='coininfo__buttons'>
            {chartDays.map((day) =>(
              <SelectButtons
              key={day.value}
              onclick={()=>{setDays(day.value)}}
              selected={day.value === days}
              >{day.label}</SelectButtons>
            ))}


            </div>
        
            
          </div>
        
  );
};

export default CoinInfo;