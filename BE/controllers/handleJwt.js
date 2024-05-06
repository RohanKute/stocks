const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function handleJwtToken() {
  function setJwtToken(email) {
    return jwt.sign({ email }, jwtSecret, { expiresIn: '24h' });
  }
  function verifyJwtToken(token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      return decoded
    } catch (error) {
      return;
    }
  }
  return {
    setJwtToken,
    verifyJwtToken
  };s
}

module.exports = { handleJwtToken };