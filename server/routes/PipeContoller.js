const { client } = require('../utils/databaseConnection');

const addPipe = async (req, res, next) => {
  let {
    location,
    coil_no,
    heat_no,
    grade,
    length,
    coating,
    coating_color,
    material_type,
    po_number,
    smart_label,
    comments,
    isVoid,
    diameter,
    schedule,
  } = req.body;

  try {
    if (!req.userEmail) throw { status: 400, message: 'Invalid Token!' };

    console.log(req.userEmail);

    let user = await client.query(
      `SELECT * FROM USERS WHERE email = '${req.userEmail}'`
    );
    user = user.rows[0];
    return res.status(201).send({
      success: true,
      message: 'Pipe Added!',
      user: user,
    });
  } catch (error) {
    console.log(error);
    next({ status: 500, message: 'Something went wrong!' });
  }
  // client
  //   .query({
  //     text: 'INSERT INTO pipes(location, coil_number, heat_number, grade_type, pipe_length,coating_type, coating_color, type_name, porder_id, smart_label, comments, void, schedule_class, diameter) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
  //     values: [
  //       location,
  //       coil_no,
  //       heat_no,
  //       grade,
  //       length,
  //       coating,
  //       coating_color,
  //       material_type,
  //       po_number,
  //       smart_label,
  //       comments,
  //       isVoid,
  //       schedule,
  //       diameter,
  //     ],
  //   })
  //   .then((r) => {
  //     return res.status(201).send({
  //       success: true,
  //       message: 'Pipe Added!',
  //     });
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     next({ status: 500, message: 'Something went wrong!' });
  //   });
};

const allPipes = (req, res, next) => {
  client
    .query('SELECT pipe_id as id, * FROM pipes')
    .then((response) => {
      return res.status(200).send({ success: true, pipes: response.rows });
    })
    .catch((err) => {
      console.log(err);
      next({ status: 500, message: 'Something went wrong!' });
    });
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

module.exports = {
  addPipe,
  allPipes,
  updateStrung,
  deleteFromString,
  getStringingInfo,
};
