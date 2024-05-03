const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function handleJwtToken() {
    function setJwtToken(email ,  firstName) {
      return jwt.sign({ email , firstName }, jwtSecret, { expiresIn: '24h' });
    }
    function verifyJwtToken(token) {
      try {
        const decoded =  jwt.verify(token, jwtSecret);
        return decoded
      } catch (error) {
          return;
      }
    }
    return {
      setJwtToken,
      verifyJwtToken
    };
  }

module.exports = {handleJwtToken};