const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { handleJwtToken } = require('../controllers/handleJwt');
const { getSymbol } = require('../controllers/getStockSymbol');
const prisma = new PrismaClient();
const axios = require('axios')


const buyStock = router.post('/buy', async (req, res) => {
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
                balance: true,
                id: true
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

             await prisma.stocks.create({
                data: {
                    name: data.data[0].companyName,
                    buyDate: `${Date.now()}`,
                    symbol: stockName,
                    buyPrice: stockLatestPrice,
                    sellPrice: 0,
                    quantity: Number(reqData.quantity),
                    totalPurchase: Number(stockLatestPrice * reqData.quantity),
                    owner: {
                        connect: {
                            id: userAccBalance.id
                        },
                    },
                }
            })
            const resObj = {
                messege: 'success',
                totalPurchaceAmout: stockLatestPrice * reqData.quantity,
                stock: stockName,
                quantity: reqData.quantity
            }
            res.json(resObj)    
        }

    } catch (error) {
        console.log(error);
        res.json({
            messege: "fail",
        })
    }
})


const sellStock = router.post('/sell', async (req, res) => {
    try {
        const userData = handleJwtToken().verifyJwtToken(req.headers.authorization);
        const stockData = req.body;
        const stockName = getSymbol(stockData.stockName.toLowerCase());
        const data = await axios.get(`https://api.iex.cloud/v1/data/core/quote/${stockName}?token=${process.env.IEX_TOKEN}`);
        const stockLatestPrice = data.data[0].latestPrice;
        
        const user = await prisma.user.findUnique({
            where: {
                username: userData.email
            },
            select: {
                id: true
            }
        })

        const userAccount = await prisma.userAccount.findUnique({
            where: {
                userId: user.id
            }
        })

        const newBalance = userAccount.balance + (stockLatestPrice * stockData.quantity);
        const newTradingStatement = userAccount.tradingStatement + ((stockData.buyPrice - stockLatestPrice) * stockData.quantity)
        
        await prisma.userAccount.update({
            where: {
                userId: user.id
            },
            data: {
                balance: newBalance,
                tradingStatement: newTradingStatement
            }
        });
       
        await prisma.stocks.update({
            where: {
              id: Number(stockData.id),
            },
            data: {
              sellPrice: stockLatestPrice,
              quantity: 0
            }
          })
         const resObj = {
            messege : "sell-success",
            sellPrice : stockLatestPrice,
            totalSell : stockLatestPrice * stockData.quantity,
            balance : newBalance
         }
        res.json(resObj);
    } catch (error) {
        console.log(error);
    }
})
module.exports = { buyStock, sellStock }