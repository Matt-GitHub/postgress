const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secret");

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = generateToken;
