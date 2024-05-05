import { useState, useEffect } from 'react';
import axios from 'axios';
import Stock from "./Stock";


export default function SearchStockAndDisplay({isLoggedIn}) {
  const [stock, setStock] = useState('');
  const [searchQoute, setSearchQoute] = useState(0);
  const [stockName, setStockName] = useState('');

  useEffect(() => {
    async function fetchQouteData() {
      try {
        const StockData = await axios.get(`http://localhost:3000/getqoute/${stockName}`);
        setStock(StockData.data);
      } catch (error) {
        console.log('Error fetching quote:', error);
      }
    }
    fetchQouteData();
  }, [searchQoute])


  return (
    <>
      <div style={{ border: "2px solid red", padding: "2em" }}>
      <div>
      <form>
          <input type="text" value={stockName} onChange={(e) => setStockName(e.target.value)} />
          <br />
          <button type='button' onClick={() => setSearchQoute(searchQoute + 1)}>
            Get Stock Price
          </button>
        </form>
      </div>
        < Stock Stock={stock} isLoggedIn={isLoggedIn} />
      </div>
    </>
  )
}

