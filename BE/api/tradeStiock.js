const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { handleJwtToken } = require('../controllers/handleJwt');
const { getSymbol } = require('../controllers/getStockSymbol');
const prisma = new PrismaClient();
const axios = require('axios')
const buyStock = router.post('/buy', async (req, res) => {
    // find user 
    try {
        const userData = handleJwtToken().verifyJwtToken(req.headers.authorization);
        const user = await prisma.user.findUnique({
            where: {
                username: userData.email
            },
            select: {
                id: true
            }
        })
        const reqData = req.body;
        const stockName = getSymbol(reqData.stockName.toLowerCase());
        const data = await axios.get(`https://api.iex.cloud/v1/data/core/quote/${stockName}?token=${process.env.IEX_TOKEN}`);
        const stockLatestPrice = data.data[0].latestPrice;

        const userAccBalance = await prisma.userAccount.findUnique({
            where: {
                userId: user.id
            },
            select: {
                balance: true
            }
        })

        if (stockLatestPrice * reqData.quantity < userAccBalance.balance) {
            const totalAmount = parseFloat(stockLatestPrice * reqData.quantity);
            await prisma.userAccount.update({
                where: {
                    userId: user.id
                },
                data: {
                    balance: userAccBalance.balance - totalAmount
                }
            })
        }
        const resObj = {
            messege: 'Success',
            totalPurchaceAmout: stockLatestPrice * reqData.quantity,
            stock: stockName,
            quantity: reqData.quantity
        }
        res.json(resObj)
    } catch (error) {
        res.json({
            messege: "fail",
        })
    }
})

module.exports = { buyStock }