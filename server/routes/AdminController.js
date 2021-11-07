const { getRandomString } = require('../utils/randomGenerator');
const {default_pool, create_database, query_resolver } = require('../utils/dbHandler');

const postProject = async (req, res, next) => {
  try {
    /**
     * TODO: Check if admin
     */
    const { project_number,
      pname,
      company,
      work_number,
      plocation,
      start_date,
      end_date } = req.body;

    const dbname = pname.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, "") + getRandomString(5, '0123456789');

    const projObj = {
      project_number: project_number.trim(),
      pname,
      company,
      work_number,
      plocation,
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

const addUserToProject = async (req, res, next) => {
  try {
    /**
     * users => arrays of usernames of the users
     * TODO: Admin check
     */
    const { users } = req.body;

    if(users.length == 0) throw {status: 500, message: 'No user selected to associate with the project!'};

    const query = {
      text: `SELECT project_number FROM projects WHERE dbname=$1`,
      values: [req.dbname]
    }

    const result = await query_resolver(default_pool, query);
    
    const { project_number } = result[0];
    let valueList = users.map(ele => {
      return `('${ele.trim()}', '${project_number.trim()}')`
    });

    const vals = valueList.join(', ').trim();

    const inQuery = `INSERT INTO user_project VALUES ${vals}`

    await query_resolver(default_pool, inQuery);

    return res.status(200).json({
      success:true,
      message: 'Successfully added users to the project!'
    });

  } catch (error) {
    next(error);
  }
}

const getAllUsers = async (req, res, next) => {
  try{
    /**
     * Check if admin
     */
    const query =  `SELECT * FROM users`;

    const users = await query_resolver(default_pool, query);

    return res.status(200).json({
      success: true,
      data: [...users]
    });
  }catch(error){
    next(error);
  }
}

module.exports = { postProject, addUserToProject, getAllUsers }