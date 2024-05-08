const express = require("express");
const { handleJwtToken } = require("../controllers/handleJwt");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getUserDetails = router.get('/user-details', async (req, res) => {
    try {
        const userAuth = handleJwtToken().verifyJwtToken(req.headers.authorization);

        const userWithAccountAndStocks = await prisma.user.findUnique({
            where: {
              username: userAuth.email
            },
            select: {
              id: true,
              username: true,
              userAccount: {
                include: {
                  stocks: true
                }
              }
            }
          })
        res.json(userWithAccountAndStocks);
        } catch (error) {
        console.log(error);
    }
})

module.exports = { getUserDetails };