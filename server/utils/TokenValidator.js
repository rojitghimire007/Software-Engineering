const jwt = require('jsonwebtoken');
const { JWTConfig } = require('../config');

/**
 * Checks if there is a jwt token provided. Checks if the token provided is valid
 * @param {Object} headers header object
 * @returns return decoded token info
 */
const validateToken = async (headers) => {
  if (headers.token) {
    return jwt.verify(headers.token, JWTConfig, async (err, decoded) => {
      if (err) {
        return {
          success: false,
          message: 'Token is not valid',
          decoded: { email: '' },
        };
      } else {
        return { success: true, decoded: decoded };
      }
    });
  } else {
    return {
      success: false,
      message: 'Auth token is not supplied',
      decoded: { email: '' },
    };
  }
};
//Decoder
module.exports = validateToken;
