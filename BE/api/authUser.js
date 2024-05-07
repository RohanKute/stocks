
const express = require('express');
const { handleJwtToken } = require('../controllers/handleJwt');
const router = express.Router();

const authUser = router.get('/', async (req, res) => {
        if (handleJwtToken().verifyJwtToken(req.headers.authorization)){
                res.json(true);
        }
        else {
                res.json(false);
        }
})
module.exports = { authUser };