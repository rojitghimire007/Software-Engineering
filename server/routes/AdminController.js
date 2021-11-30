const { getRandomString } = require('../utils/randomGenerator');
const { default_pool, create_database, query_resolver } = require('../utils/dbHandler');

/**
 * Creates new project
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Success message if the project creation is successful
 */
const postProject = async (req, res, next) => {
  try {
    /**
     * TODO: Check if admin
     */
    const { project_number,
      pname,
      company,
      company_address,
      company_phone,
      company_email,
      work_number,
      work_site_phone,
      plocation,
      notes,
      start_date,
      end_date } = req.body;
    
    if(!pname.replace(/\s/g, '').length || pname == null){ //checks if project name is null or just whitespace
      throw {status: 500, message: "Project name can't be null or empty"}
    }

    const dbname = pname.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, "") + getRandomString(5, '0123456789');
    
    const projObj = {
      project_number: project_number.trim(),
      pname,
      company,
      work_number,
      plocation,
      company_address: company_address ? company_address: null,
      company_phone: company_phone ? company_phone: null,
      company_email: company_email ? company_email: null,
      work_site_phone: work_site_phone ? work_site_phone: null,
      notes: notes ? notes: null,
      start_date: start_date ? start_date : null,
      end_date: end_date ? end_date : null,
      dbname

    }
    
    await create_database(projObj);

    return res.status(200).json({
      success: true,
      message: "Project Created!"
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Associates users to a project (Admin Only Functionality)
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Success message if the users are save in the project
 */
const addUserToProject = async (req, res, next) => {
  try {
    
    const { users } = req.body;
    
    if (users.length == 0) throw { status: 500, message: 'No user selected to associate with the project!' };

    let existingUsers = await query_resolver(default_pool, {
      text: 'SELECT * FROM users WHERE uname = $1',
      values: [users[0]],
    });

    if(existingUsers.length == 0){
      throw {status: 500, message: "No such users!"};
    }

    const query = {
      text: `SELECT project_number FROM projects WHERE dbname=$1`,
      values: [req.dbname]
    }

    const result = await query_resolver(default_pool, query);

    let usersInProj = await query_resolver(default_pool, {
      text: `SELECT uname from user_project WHERE project_number=$1`,
      values: [result[0].project_number]
    });

    usersInProj = new Set(usersInProj.map(user => user.uname));
    let difference = users.filter(x => !usersInProj.has(x));

    if (difference.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Mentioned user(s) already in the project!"
      });
    }

    const { project_number } = result[0];
    /**
     * TODO: check of duplicates within inputs itself
     */
    let valueList = difference.map(ele => {
      return `('${ele.trim()}', '${project_number.trim()}')`
    });

    const vals = valueList.join(', ').trim();

    const inQuery = `INSERT INTO user_project(uname, project_number) VALUES ${vals}`

    await query_resolver(default_pool, inQuery);

    return res.status(200).json({
      success: true,
      message: 'Successfully added users to the project!'
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Removes a user from a project (Admin Only Functionality)
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Success message if a user is removed successfully
 */
const removeUserFromProject = async (req, res, next) => {
  try {
    const { uname } = req.params;

    const projNum = await query_resolver(default_pool, {
      text: `SELECT project_number FROM projects WHERE dbname=$1`,
      values: [req.dbname]
    });

    const query = {
      text: `DELETE FROM user_project WHERE uname=$1 AND project_number=$2`,
      values: [uname, projNum[0].project_number]
    }

    await query_resolver(default_pool, query);

    return res.status(200).json({
      success: true,
      message: 'User deleted from the project!'
    })
  } catch (error) {
    next(error);
  }
}

/**
 * Gets all the users in the database
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} List of all the users and their data
 */
const getAllUsers = async (req, res, next) => {
  try {
    const query = `SELECT * FROM users`;

    const users = await query_resolver(default_pool, query);

    return res.status(200).json({
      success: true,
      data: [...users]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { postProject, addUserToProject, getAllUsers, removeUserFromProject }