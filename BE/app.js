const express = require('express');
const app = express();
const axios = require('axios');
const { config } = require('dotenv');
config();

const { stockArray } = require('./json/array')
app.listen(3000, ()=>{
     console.log('listening on port 3000');
})


// create an API that sends Stock market object array /stockInfo/STOCK_NAME
// const axios = require('axios');

async function getStockQoute(){
     const stockStr = 'netflix';
     const stockName = stockArray.find((stock , i) =>{
            return stock.title.toLowerCase().includes(stockStr)
     })
     const data = await axios.get(`https://api.iex.cloud/v1/data/core/quote/${stockName.ticker}?token=${process.env.IEX_TOKEN}`);
     console.log(data.data[0].latestPrice);
}
getStockQoute();
