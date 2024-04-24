const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')

async function registerUser(email, firstName, lastName, password) {
    const hash = bcrypt.hashSync(password, 12);

    const res = await prisma.user.create({
        data: {
            username : email,
            password: hash,
            firstName,
            lastName
        }
    })
    console.log(res);
    console.log("Success")
}


const registerUserApi = router.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        const res = await registerUser(
            userData.email,
            userData.firstName,
            userData.lastName,
            userData.password

        )
        // console.log(JSON.parse(res));
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

module.exports = {registerUserApi}


