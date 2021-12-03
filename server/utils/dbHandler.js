const { Pool } = require('pg');
const { promiseHandler } = require('./promiseHandler');
const dbScripts = require('./dbScripts');

let project_connection = null; //connection pool to a particular project
let currentDB = null; //project where we established the connection at the time
let project_list = null; //list of all the projects in the system

//default connection to the master database
const master_pool = new Pool({
  user: 'postgres',
  host: 'teamdaemon.chdmjbgrdfsw.us-east-2.rds.amazonaws.com',
  database: 'master',
  password: 'teamDaemon',
  port: 5432,
  
});

/**
 * update project list after creation of new project database creation
 */
const update_project_list = async () => {
  try {
    let [projects, err0] = await promiseHandler(master_pool.query('SELECT * FROM projects'));

    if (err0) throw err0;
    project_list = [...projects.rows]
  } catch (error) {
    console.log("Error(30): ", error);
    throw error;
  }
};

/**
 * check if the project is already register for the give project name
 * @param {string} dbname project name
 * @returns {Promise} promise wrapped boolean; true if project already registered else false
 */
const isDbRegistered = async (dbname) => {
  try {
    //call to retrive project list
    if (!project_list) {
      await update_project_list();
    }

    const project_name_set = new Set(project_list.map(project => project.dbname));
    return project_name_set.has(dbname);
  } catch (error) {
    console.log("Error(50)", error);
    throw error;
  }
}

/**
 * get connection pool for the project database
 * @param {string} dbname - project name
 * @returns {Promise} - promise wrapped connection pool for the project database
 */
const connect_project_db = async (dbname) => {
  try {
    if (!(await isDbRegistered(dbname))) {
      throw new Error(`${dbname} is not registered in the database!`);
    }

    //end connection to previous project's database if exist
    if (project_connection && currentDB && (dbname !== currentDB)) {
      await project_connection.end();
    } else if (currentDB && (dbname === currentDB)) {
      return project_connection;
    }

    //make new connection to another project's database
    project_connection = new Pool({
      user: 'postgres',
      host: 'teamdaemon.chdmjbgrdfsw.us-east-2.rds.amazonaws.com',
      database: dbname,
      password: 'teamDaemon',
      port: 5432,
    });

    //open socket to listen error for idle clients
    project_connection.on('error', (err0, _c1) => {
      throw err0;
    });

    currentDB = dbname; //update current project
    return project_connection;
  } catch (error) {
    console.log("Error(90)", error);
    throw error;
  }
};

/**
 * execute database query and get result
 * @param {Pool} connection connection pool
 * @param {Object} sql_query sql query object to excute
 * @returns {Promise} result of the query
 */
const query_resolver = async (connection, sql_query) => {
  try {
    let [results, err] = await promiseHandler(connection.query(sql_query));

    if (err) throw err;

    return [...results.rows];
  } catch (error) {
    console.log("Error(107)", error);
    throw error;
  }
};

/**
 * initialize table when a project database is newly created
 * @param {Pool} db_connection connection pool
 */
const create_tables = async (db_connection) => {
  try {
    await query_resolver(db_connection, dbScripts.user_role);
    await query_resolver(db_connection, dbScripts.pipe_coat);
    await query_resolver(db_connection, dbScripts.pipe_heat);
    await query_resolver(db_connection, dbScripts.purchase_number);
    await query_resolver(db_connection, dbScripts.pipe_grade);
    await query_resolver(db_connection, dbScripts.pipe_ref);
    await query_resolver(db_connection, dbScripts.pipe_shared_info);
    await query_resolver(db_connection, dbScripts.pipe);
    await query_resolver(db_connection, dbScripts.fitting_heat);
    await query_resolver(db_connection, dbScripts.fitting_shared_info);
    await query_resolver(db_connection, dbScripts.fitting);
    await query_resolver(db_connection, dbScripts.stringing);
    await query_resolver(db_connection, dbScripts.sequences);
    await query_resolver(db_connection, dbScripts.populate_grade);
    await query_resolver(db_connection, dbScripts.populate_ref);
    await query_resolver(db_connection, dbScripts.bend);
    await query_resolver(db_connection, dbScripts.pipe_bend);
    await query_resolver(db_connection, dbScripts.weld);
    await query_resolver(db_connection, dbScripts.demoCoat);
    await query_resolver(db_connection, dbScripts.weld_seq);
  } catch (error) {
    console.log("Error(133)", error);
    throw error;
  }
}

/**
 * setup initial database when a db is created for a new project
 * @param {Object} project project object with project info
 */
const create_database = async (project) => {
  try {
    //check if the database for the given project name already exists
    if (await isDbRegistered(project.dbname)) {
      throw new Error(`Project database already exist for ${project.dbname}.\nPlease choose a different name.`);
    }
    //register the new database in the projects table
    const sDate = project.start_date ? project.start_date / 1000.0 : null; // change millisecond to second to make postgre compatible
    const eDate = project.end_date ? project.end_date / 1000.0 : null;

    let sql_query = {
      text: 'INSERT INTO projects(project_number, pname, company, work_number, plocation, start_date, end_date, dbname, company_address, company_phone, company_email, work_site_phone, notes) VALUES ($1, $2, $3, $4, $5, to_timestamp($6), to_timestamp($7), $8, $9, $10, $11, $12, $13)',
      values: [project.project_number, project.pname, project.company, project.work_number, project.plocation, sDate, eDate, project.dbname, project.company_address, project.company_phone, project.company_email, project.work_site_phone, project.notes]
    }

    await query_resolver(master_pool, sql_query);

    await update_project_list();

    //create database
    await query_resolver(master_pool, `CREATE DATABASE ${project.dbname}`);

    //get database connection
    await connect_project_db(project.dbname);

    //make the database calls to create table
    await create_tables(project_connection);
  } catch (error) {
    console.log("Error(170)", error);
    throw error;
  }
};

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
master_pool.on('error', (err, _c2) => {
  console.error('Unexpected error on idle client', err);
  throw err;
});

module.exports = {
  default_pool: master_pool,
  connect_project_db,
  create_database,
  query_resolver,
  isDbRegistered
};