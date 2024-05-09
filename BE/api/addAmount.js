const express = require('express');
const { handleJwtToken } = require('../controllers/handleJwt');
const router  = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addAmount = router.post('/add-amount' , async(req, res) =>{
        try{
            const userData = handleJwtToken().verifyJwtToken(req.headers.authorization);
            const reqData = req.body;
            if(userData){
                const user = await prisma.user.findUnique({
                    where :{
                        username : userData.email
                    },
                    select : {
                        id : true
                    }
                })
                const userAccount = await prisma.userAccount.findUnique({
                      where :{
                        userId : user.id
                      }
                });
                const newBalance = userAccount.balance + Number(reqData.amount);
                await prisma.userAccount.update({
                    where :{
                        userId : user.id
                    },
                    data :{
                        balance : newBalance
                    }
                });
                
                resObj = {
                    messege : "success",
                    amountAdded : reqData.amount,
                    currentBalance : Number(userAccount.balance + reqData.amount)
                }
            res.json(resObj);
            }
        }catch(error){
            console.log(error);
            res.json({
                messege : "fail"
            })
        }
})

module.exports = {addAmount};