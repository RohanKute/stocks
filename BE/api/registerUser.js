const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const {handleJwtToken} = require('../controllers/handleJwt');

async function registerUser(email, firstName, lastName, password) {
    const hash = bcrypt.hashSync(password, 12);

    const user = await prisma.user.create({
        data: {
            username : email,
            password: hash,
            firstName,
            lastName
        }
    })
    await prisma.userAccount.create({
        data :{
            balance : 0.0,
            tradingStatement : 0.0,
            moneyWithdrawn : 0.0,
            userId : user.id
        }
   })
   console.log("Register Success")
   return  user;
}


const registerUserApi = router.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        const user = await registerUser(
            userData.email,
            userData.firstName,
            userData.lastName,
            userData.password

        )
        const token = handleJwtToken().setJwtToken(user.email);
        res.json(token);
        // console.log(JSON.parse(res));
    } catch (err) {
        console.log(err);
        res.json("err")
    }
})

module.exports = {registerUserApi}


