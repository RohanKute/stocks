const express = require('express');
const router = express.Router();


 
const protectedRoute = router.post('/protectedRoute', async (req, res) => {
        console.log('you are in a protected route');
})
module.exports = { protectedRoute };