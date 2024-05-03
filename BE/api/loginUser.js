const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {handleJwtToken} = require('../controllers/handleJwt');

async function authenticateUser(password, hash) {
  return bcrypt.compareSync(password, hash); // true

}
 
const loginUser = router.post('/login', async (req, res) => {
  const userData = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: userData.email
      }
    })
    if (user) {
      const isValid = await authenticateUser(userData.password, user.password)
      if (isValid) {
        const token = handleJwtToken().setJwtToken(user.username,user.firstName);
        console.log("AUTH SUCCESS")
        res.json(token);
      }
      else {
        console.log("AUTH FAIL")
      }
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = { loginUser };