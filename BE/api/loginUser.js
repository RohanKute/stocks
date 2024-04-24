const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function authenticateUser(password , hash){
    return bcrypt.compareSync(password, hash); // true

}

const loginUser = router.post('/login' , async(req ,res)=>{
    const userData = req.body;
    const user = await prisma.user.findUnique({
        where: {
          username: userData.email
        }
      })
    const isValid = await authenticateUser(userData.password , user.password)
    if(isValid) console.log("AUTH SUCCESS")
    else console.log("AUTH FAIL")
})
//rohafsdfdsfdfsdfsdfsfg@gmail.com

module.exports = {loginUser};