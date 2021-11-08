const { client } = require('../utils/databaseConnection');
const { connect_project_db, query_resolver } = require('../utils/dbHandler');
const { getRandomString } = require('../utils/randomGenerator');

const addFittings = async (req, res, next) => {
  let {
    id,
    flength,
    dimension,
    style,
    flocation,
    comment,
    is_void,
    is_used,
    heat_number,
    manufacturer,
    po_number,
    grade,
    ftype,
    coat,
    fdescription,
    material_type,
    thickness
  } = req.body;

  try {
    // if (!req.userEmail) throw { status: 400, message: 'Invalid Token!' };

    const connection = await connect_project_db(req.dbname);

    const query = {
      text: 'SELECT * FROM fitting_heat WHERE heat_number = $1',
      values: [heat_number],
    }

    let fitting_heat = await query_resolver(connection, query);

    if (fitting_heat.length === 0) {
      const query1 = {
        text: 'INSERT INTO fitting_heat(heat_number, manufacture) VALUES($1, $2)',
        values: [heat_number, manufacturer]
      };
      await query_resolver(connection, query1);

      const query2 = {
        text: 'SELECT * FROM fitting_heat WHERE heat_number = $1',
        values: [heat_number],
      }

      fitting_heat = await query_resolver(connection, query2);
    } else if (fitting_heat[0].manufacture != manufacturer) {
      throw {
        status: 400,
        message:
          'Same Heat Number with a different manufacturer exists. Please consult admin to verify correct manufacturer. You can also leave a comment on the pipe.',
      };
    }

    fitting_heat = fitting_heat[0].fitting_heat_id;

    const shared_ref = getRandomString(30);
    const query3 = {
      text: `INSERT INTO fitting_shared_info(fitting_shared_id, fitting_heat_id, po_number, grade, ftype, coat, fdescription, material_type, thickness, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      values: [shared_ref, fitting_heat, po_number ? po_number : null, grade, ftype, coat, fdescription, material_type, thickness, req.uname]
    }

    await query_resolver(connection, query3);

    const query4 = {
      text: `INSERT INTO fitting(id, fitting_shared_id, flength, dimension, style, flocation, comment, is_void, is_used) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      values: [id, shared_ref, flength, dimension, style, flocation, comment, Boolean(is_void), Boolean(is_used)]
    }

    await query_resolver(connection, query4);

    return res.status(200).send({
      success: true,
      message: 'Fitting Added!'
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getFittings = async (req, res, next) => {
  try {
    const connection = await connect_project_db(req.dbname);
    const query = `SELECT * from fitting JOIN fitting_shared_info USING (fitting_shared_id)`;
    const fittings = await query_resolver(connection, query);

    res.status(200).send({
      success: true,
      data: [...fittings]
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { addFittings, getFittings };
