import { useState , useEffect} from 'react';
import axios from 'axios';
import StockQoute from "./StockQoute";

export default function SearchStockAndDisplay(){
    const [stockQoute , setStockQoute] = useState('');
    const [searchQoute , setSearchQoute] = useState(0);
    const [stockName , setStockName] = useState('');

    useEffect(()=>{
         async function fetchQouteData() {
          try {
            const stockQouteData = await axios.get(`http://localhost:3000/getqoute/${stockName}`)
            setStockQoute(stockQouteData.data);
          } catch (error) {
            console.log('Error fetching quote:', error);
          }
         }
         fetchQouteData();
    },[searchQoute])
    

    return(
        <>
          <form>
              <input type="text" value={stockName} onChange={(e) => setStockName(e.target.value)}/>
              <br />
              <button type='button' onClick={() => setSearchQoute(searchQoute + 1)}>
                Get Stock Price
              </button>
          </form>
          < StockQoute stockQoute = {stockQoute}/>
        </>
    )
}

