const validateToken = require('../utils/TokenValidator');

/**
 * Extract email from the jwt token and put it in body
 * @param {*} app -Express App
 */
const TokenMiddleWare = (app) => {
  app.use(async (req, res, next) => {
    var { token } = req.headers;

    if (!token || token == 'null') req.userEmail = null;
    else {
      let verification = await validateToken({ token });
      if (verification.success) {
        req.userEmail = verification.decoded.email;
        if(verification.decoded.dbname){
          req.dbname = verification.decoded.dbname;
        }
      } else {
        req.userEmail = null;
        next('Token not verified');
      }
    }

    next();
  });
};

module.exports = TokenMiddleWare;
