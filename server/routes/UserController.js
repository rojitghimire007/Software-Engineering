const { default_pool, query_resolver } = require('../utils/dbHandler');
const { getRandomString } = require('../utils/randomGenerator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SaltRounds, JWTConfig, JWTExpiresIn: expiresIn } = require('../config');
const validateToken = require('../utils/TokenValidator');

const login = async (req, res, next) => {
  try {
    let { password, email } = req.body;

    email = email.trim();

    let user = await default_pool.query({
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    });
    console.log('users');

    if (user.rows.length == 0)
      return next({
        status: 401,
        message: 'The email or password you entered is incorrect!',
      });
    else user = user.rows[0];

    //password checking
    bcrypt.compare(password, user.pass, async (err, result) => {
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

      let token = await jwt.sign(
        { email: user.email, uname: user.uname },
        JWTConfig,
        {
          expiresIn,
        }
      );

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
    let { fname, password, email, phone } = req.body;

    email = email.trim();

    // Check if the user already exists
    try {
      let existingUsers = await default_pool.query({
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email],
      });

      if (existingUsers.rows.length !== 0)
        throw { status: 405, message: 'User already exists!' };
    } catch (error) {}

    let randomNumber = getRandomString(5, '0123456789');
    let uname = fname.toLowerCase().trim().replace(' ', '') + randomNumber;

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
        let _user = await default_pool.query({
          text: 'INSERT INTO users(uname, email, pass, fname, phone) VALUES($1, $2, $3, $4, $5)',
          values: [uname, email, password, fname, phone],
        });

        return res.status(201).send({
          success: true,
          message: 'User Created!',
        });
      } catch (er) {
        next(er);
      }
    });
  } catch (err) {
    next(err);
  }
};

const getAssociatedProjects = async (req, res, next) => {
  try {
    let query = {
      text: `SELECT pname, project_number FROM user_project INNER JOIN projects USING (project_number) WHERE user_project.uname=$1`,
      values: [req.uname],
    };

    //TODO: check for admin, if admin show all project
    // if(isAdmin){
    //   query = `SELECT * FROM projects`;
    // }

    const projects = await query_resolver(default_pool, query);

    return res.status(200).json({
      success: true,
      data: [...projects],
    });
  } catch (error) {
    next(error);
  }
};

//use when adding users to a project
const usersInProject = async (req, res, next) => {
  try {
    const query = {
      text: `SELECT * FROM projects INNER JOIN user_project USING(project_number) INNER JOIN users USING(uname) WHERE dbname=$1`,
      values: [req.dbname],
    };

    const result = await query_resolver(default_pool, query);

    return res.status(200).json({
      success: true,
      data: [...result],
    });
  } catch (error) {
    next(error);
  }
};

const selectProject = async (req, res, next) => {
  try {
    if (!req.userEmail)
      throw { status: 401, message: 'Unauthorized user! Please login first.' };

    const { project_number } = req.body;

    const query = {
      text: `SELECT dbname FROM projects WHERE project_number=$1`,
      values: [project_number],
    };

    const result = await query_resolver(default_pool, query);
    const dbname = result[0].dbname;
    let token = await jwt.sign(
      { email: req.userEmail, uname: req.uname, dbname },
      JWTConfig,
      {
        expiresIn,
      }
    );

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
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

    let { email, dbname } = tokenAnalysis.decoded;
    let existingUsers = null;

    // Retrive corresponding user from db

    existingUsers = await default_pool.query({
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    });

    if (existingUsers.rows.length == 0)
      throw { status: 401, message: 'User not authorized!' };

    let project = await default_pool.query(
      'SELECT * FROM projects WHERE dbname = $1',
      [dbname]
    );

    if (project.rows.length == 0)
      throw { status: 401, message: 'Project Selection Required!' };

    return res
      .status(200)
      .send({ success: true, user: existingUsers.rows[0].email });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  login,
  signup,
  auth,
  selectProject,
  getAssociatedProjects,
  usersInProject,
};
