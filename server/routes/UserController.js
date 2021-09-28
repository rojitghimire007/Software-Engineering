const { client } = require('../utils/databaseConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SaltRounds, JWTConfig, JWTExpiresIn: expiresIn } = require('../config');
const validateToken = require('../utils/TokenValidator');

const login = async (req, res, next) => {
  try {
    let { password, email } = req.body;

    email = email.trim();

    // Check if the user  exists

    let user = await client.query({
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    });

    if (user.rows.length == 0)
      return next({
        status: 401,
        message: 'The email or password you entered is incorrect!',
      });
    else user = user.rows[0];

    //password checking
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err)
        return next({
          status: 500,
          message: 'Something went wrong! Please try again later!',
          error: err,
        });
      if (!result)
        return next({
          status: 401,
          message: 'The email or password you entered is incorrect!',
        });

      let token = await jwt.sign({ email: user.email }, JWTConfig, {
        expiresIn,
      });

      return res.status(200).send({
        success: true,
        message: 'User Logged In!',
        token: token,
      });
    });
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  try {
    let { password, email } = req.body;

    email = email.trim();

    // Check if the user already exists
    try {
      let existingUsers = await client.query({
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email],
      });

      if (existingUsers.rows.length !== 0)
        throw { status: 405, message: 'User already exists!' };
    } catch (error) {}

    // Hash the password and do the rest in the callback function
    await bcrypt.hash(password, SaltRounds, async (err, hash) => {
      try {
        if (err)
          next({
            status: 500,
            message: 'Something went wrong! Please try again.',
            error: err,
          }); // Error hashing the pswd

        password = hash; //Replace with the hashed password

        // Save new user
        let user = await client.query({
          text: 'INSERT INTO users(email, password) VALUES($1, $2)',
          values: [email, password],
        });

        let token = await jwt.sign({ email }, JWTConfig, { expiresIn });

        return res.status(201).send({
          success: true,
          message: 'User Created!',
          token: token,
        });
      } catch (er) {
        next(er);
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Authenticate user session (if logged in) after closing tab/browser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {function} next - Pass control to next middleware
 * @returns {Object} Modified response object with user info
 */
const auth = async (req, res, next) => {
  try {
    let tokenAnalysis = await validateToken(req.headers);

    // Throw error if invalid token
    if (!tokenAnalysis.success)
      throw { message: tokenAnalysis.message, status: 401 };

    let { email } = tokenAnalysis.decoded;
    let existingUsers = null;

    // Retrive corresponding user from db
    try {
      existingUsers = await client.query({
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email],
      });

      if (existingUsers.rows.length == 0)
        throw { status: 401, message: 'User not authorized!' };
    } catch (error) {}

    return res
      .status(200)
      .send({ success: true, user: existingUsers.rows[0].email });
  } catch (err) {
    next(err);
  }
};
module.exports = { login, signup, auth };
