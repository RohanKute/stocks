const express = require('express');
const app = express();
const { config } = require('dotenv');
const { stockQouteApi } = require('./api/getStockQoute');
const cors = require('cors');
const { registerUserApi } = require('./api/registerUser');
const { loginUser } = require('./api/loginUser');
const { protectedRoute } = require('./api/protectedRoute');
const { authUser } = require('./api/authUser');
const bodyParser = require('body-parser');
const { buyStock, sellStock } = require('./api/tradeStock');
const { getUserDetails } = require('./api/userDetails');
const { viewStock } = require('./api/viewStocks');
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
config();
app.use(express.json())
app.listen(3000, () => {
     console.log('listening on port 3000');
})

app.use('/', stockQouteApi);
app.use('/user', registerUserApi);
app.use('/user', loginUser);
app.use('/', protectedRoute);
app.use('/auth', authUser);
app.use('/trade' , buyStock , sellStock);
app.use('/user', getUserDetails , viewStock);