const pipeQueries = require('../sql_queries/pipeQueries');
const { client } = require('../utils/databaseConnection');
const { connect_project_db, query_resolver } = require('../utils/dbHandler');
const { getRandomString } = require('../utils/randomGenerator');

const getSchedule = async (connection, schedule, diameter) => {
  try {
    const breakSchedule = schedule.split('-');
    schedule = breakSchedule[0].trim();
    const wallThick = breakSchedule[1].trim();

    const query = {
      text: `SELECT pipe_ref_id FROM pipe_ref WHERE (diameter = $1 AND schedule = $2 AND thickness = $3)`,
      values: [diameter, schedule, wallThick],
    };

    const schedule_class = await query_resolver(connection, query);
    // let schedule_class = await client.query(
    //   `SELECT pipe_ref_id FROM pipe_ref WHERE (diameter = $1 AND schedule = $2 AND thickness = $3)`,
    //   [diameter, schedule, wallThick]
    // );

    return schedule_class[0].pipe_ref_id;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addPipe = async (req, res, next) => {
  let {
    coating,
    coil_no,
    comments,
    diameter,
    grade,
    heat_no,
    length,
    location,
    material_type,
    po_number,
    schedule,
    isVoid,
    id,
    manufacturer,
  } = req.body;

  try {
    // USER AUTHENTICATION
    // if (!req.userEmail) throw { status: 400, message: 'Invalid Token!' };

    // let user = await client.query(
    //   `SELECT * FROM USERS WHERE email = '${req.userEmail}'`
    // );
    // user = user.rows[0].id;

    const connection = await connect_project_db(req.dbname);

    let pipe_ref_id = await getSchedule(connection, schedule, diameter);

    const query = {
      text: 'SELECT * FROM pipe_heat WHERE heat_number = $1',
      values: [heat_no],
    };

    let pipe_heat = await query_resolver(connection, query);

    if (pipe_heat.length == 0) {
      const query1 = {
        text: pipeQueries.addPipeHeat,
        values: [heat_no, manufacturer],
      };
      await query_resolver(connection, query1);

      const query2 = {
        text: 'SELECT * FROM pipe_heat WHERE heat_number = $1',
        values: [heat_no],
      };

      pipe_heat = await query_resolver(connection, query2);
    } else if (pipe_heat[0].manufacture != manufacturer) {
      throw {
        status: 400,
        message:
          'Same Heat Number with a different manufacturer exists. Please consult admin to verify correct manufacturer. You can also leave a comment on the pipe.',
      };
    }

    pipe_heat = pipe_heat[0].pipe_heat_id;

    let shared_ref = getRandomString(30);
    const query3 = {
      text: pipeQueries.addPipeSharedInfo,
      values: [
        shared_ref,
        coating,
        grade,
        pipe_heat,
        pipe_ref_id,
        po_number,
        material_type,
        req.uname,
      ],
    };

    await query_resolver(connection, query3);

    const query4 = {
      text: pipeQueries.addPipe,
      values: [
        id,
        shared_ref,
        length,
        req.uname,
        location,
        coil_no,
        comments,
        isVoid,
        false,
      ],
    };
    await query_resolver(connection, query4);

    return res.status(201).send({
      success: true,
      message: 'Pipe Added!',
    });
  } catch (error) {
    console.log(error);
    next({ status: 500, message: 'Something went wrong!' });
  }
};

const allPipes = async (req, res, next) => {
  const connection = await connect_project_db(req.dbname);
  try {
    let pipes = await query_resolver(connection, {
      text: pipeQueries.allPipes,
    });
    return res.status(200).send({ success: true, pipes });
  } catch (error) {
    console.log(error);
    next({ status: 500, message: 'Something went wrong!' });
  }
};

const deletePipe = async (req, res, next) => {
  let { pipeID } = req.params;

  try {
    await client.query(`DELETE FROM pipes WHERE pipe_id = ${pipeID}`);

    return res.status(204).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getStringingInfo = async (req, res, next) => {
  try {
    let info = await client.query(
      'SELECT * FROM STATIONS order by(station, id)'
    );

    return res.status(200).send(info.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePipeSchedule = async (
  schedule,
  diameter,
  pipeSharedId,
  connection
) => {
  try {
    let pipeRefId = await getSchedule(connection, schedule, diameter);

    await query_resolver(connection, {
      text: 'UPDATE pipe_shared_info SET pipe_ref_id = $1 WHERE pipe_shared_id = $2',
      values: [pipeRefId, pipeSharedId],
    });

    return;
  } catch (err) {
    console.log(err);
    throw {
      status: 400,
      message: 'Invalid Pipe Schedule-class-thickness update.',
    };
  }
};

const editPipe = async (req, res, next) => {
  let { oldData, newData } = req.body;

  let {
    coating,
    coil_no,
    comments,
    grade,
    heat_no,
    length,
    location,
    material_type,
    po_number,
    isVoid,
    id,
  } = newData;

  //handle heat no change after asking todd

  try {
    const connection = await connect_project_db(req.dbname);

    let _ = await query_resolver(connection, {
      text: 'SELECT pipe_shared_id FROM pipe WHERE id = $1',
      values: [oldData.id],
    });

    let pipeSharedId = _[0].pipesharedid;

    if (
      newData.diameter != oldData.diameter ||
      newData.wall_thickness != oldData.wall_thickness ||
      newData.schedule != oldData.schedule
    ) {
      updatePipeSchedule(
        `${newData.schedule} - ${newData.wall_thickness}`,
        newData.diameter,
        pipeSharedId,
        connection
      );
    }

    await query_resolver(connection, {
      text: pipeQueries.updatePipeSharedInfo,
      values: [coating, grade, po_number, material_type, pipeSharedId],
    });

    await query_resolver(connection, {
      text: pipeQueries.updatePipe,
      values: [
        id,
        length,
        'user',
        location,
        coil_no,
        comments,
        isVoid,
        new Date().toISOString(),
        oldData.id,
      ],
    });

    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateStrung = async (req, res, next) => {
  let { pipe_id, curr_id, curr_station, left_of_target } = req.body;
  try {
    let pipe_length = await deleteFromString(pipe_id, curr_id, curr_station);

    var new_station_id = 0;

    if (left_of_target) {
      let left_pipe = await client.query(
        `SELECT * from stations where pipe_id = ${left_of_target}`
      );

      let left_pipe_station = left_pipe.rows[0]['station'];

      if (left_pipe_station == curr_station) {
        let left_pipe_details = await client.query(
          `SELECT pipe_length from pipes where pipe_id = ${left_of_target}`
        );

        new_station_id =
          Number(left_pipe.rows[0]['id']) +
          Number(left_pipe_details.rows[0]['pipe_length']);
      }
    }

    await client.query(
      `UPDATE STATIONS SET id = id + ${pipe_length} where id >= ${new_station_id} and station = ${curr_station}`
    );

    await client.query(
      `INSERT INTO STATIONS(station, id, pipe_id) VALUES(${curr_station}, ${new_station_id}, ${pipe_id})`
    );

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteFromString = async (pipe_id, curr_id, curr_station) => {
  try {
    await client.query(`DELETE FROM STATIONS WHERE pipe_id = ${pipe_id}`);

    let pipe_length = await client.query(
      `SELECT pipe_length from pipes where pipe_id = ${pipe_id}`
    );

    pipe_length = pipe_length.rows[0]['pipe_length'];

    await client.query(
      `UPDATE stations set id = id - ${pipe_length} where station = ${curr_station} and id > ${curr_id}`
    );

    return pipe_length;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getOptions = async (req, res, next) => {
  try {
    const connection = await connect_project_db(req.dbname);

    let grades = await query_resolver(connection, {
      text: 'SELECT grade from pipe_grade;',
    });
    grades = grades.map((data) => data.grade);

    // let materials = await client.query('SELECT material_name FROM material;');
    // materials = materials.rows.map((data) => data.material_name);

    let po_numbers = await query_resolver(connection, {
      text: 'SELECT po_number FROM purchase_number;',
    });

    po_numbers = po_numbers.map((data) => data.ponumber);

    let heat_numbers = await query_resolver(connection, {
      text: 'SELECT heat_number FROM pipe_heat;',
    });

    heat_numbers = heat_numbers.map((data) => data.heatnumber);

    let coatings = await query_resolver(connection, {
      text: 'SELECT coat, color FROM pipe_coat;',
    });

    let coating_return = {};
    coatings.forEach((data) => {
      coating_return[data.coat] = data.color;
    });

    res.status(200).send({
      success: true,
      grades,
      coatings: coating_return,
      // materials,
      po_numbers,
      heat_numbers,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  addPipe,
  allPipes,
  deletePipe,
  updateStrung,
  deleteFromString,
  getStringingInfo,
  getOptions,
  editPipe,
  updatePipeSchedule,
};
