const express = require('express');
const app = express();
const { config } = require('dotenv');
const { stockQouteApi } = require('./api/getStockQoute');
const cors = require('cors');
app.use(cors());
config();

app.listen(3000, ()=>{
     console.log('listening on port 3000');
})

app.use('/', stockQouteApi)
