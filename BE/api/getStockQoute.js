const express = require('express');
const router = express.Router();
const axios = require('axios');
const {stockArray} = require('../json/array')

const stockQouteApi = router.get('/getqoute/:stockname' , async (req , res)=>{
     try {
        const stockStr = req.params.stockname.toLowerCase();
        const stockNameBefore = stockArray.find((stock , i) =>{
               return stock.title.toLowerCase().includes(stockStr)
        })
        const stockName = stockNameBefore.ticker.replace(/-/ , '.');
        const data = await axios.get(`https://api.iex.cloud/v1/data/core/quote/${stockName}?token=${process.env.IEX_TOKEN}`);
        return res.json(data.data[0]);
     } catch (error) {
        return res.json('Not Found');
     }
})

module.exports ={ stockQouteApi };