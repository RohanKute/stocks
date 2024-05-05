
const express = require('express');
const { handleJwtToken } = require('../controllers/handleJwt');
const router = express.Router();

const authUser = router.get('/', async (req, res) => {
        res.json(handleJwtToken().verifyJwtToken(req.headers.authorization));
})
module.exports = { authUser };