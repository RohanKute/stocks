const express = require('express');
const router = express.Router();
const { handleJwtToken } = require("../controllers/handleJwt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const viewStock = router.get('/view-stocks', async (req, res) => {
    try {
        const userAuth = handleJwtToken().verifyJwtToken(req.headers.authorization);
        const stocks = prisma.user.findUnique({
            where: {
                username: userAuth.email
            },
            select: {
                userAccount: {
                    select: {
                        stocks: true
                    }
                }
            }
        })
        res.json(stocks);
    } catch (error) {
        console.log(error)
    }
})

module.exports = {viewStock};