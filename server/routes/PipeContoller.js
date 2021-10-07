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
    .query(
      "SELECT void, DATE(inventory_date), CONCAT(first_name, ' ', last_name) AS inspector, location, pipe_id as id,  coil_number as coil_no, heat_number as heat_no, diameter, designation as schedule, wall_thickness, grade, pipe_length as length, pipes.coating_type as coating, color as coating_color, mfg as manufacturer, material as material_type, purchase_order as po_number, comments FROM pipes INNER JOIN schedule_and_class ON pipes.schedule_class = schedule_and_class.id INNER JOIN users ON pipes.inspector_id = users.id INNER JOIN pipe_coating ON pipes.coating_type = pipe_coating.coating_type;"
    )
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

const getOptions = async (req, res, next) => {
  try {
    let grades = await client.query('SELECT grade FROM PIPE_GRADE;');
    grades = grades.rows.map((data) => data.grade);

    let materials = await client.query('SELECT material_name FROM material;');
    materials = materials.rows.map((data) => data.material_name);

    let po_numbers = await client.query('SELECT id FROM purchase_orders;');
    po_numbers = po_numbers.rows.map((data) => data.id);

    let heat_numbers = await client.query(
      'SELECT heat_number FROM pipe_heat_numbers;'
    );

    heat_numbers = heat_numbers.rows.map((data) => data.heat_number);

    let coatings = await client.query(
      'SELECT coating_type, color FROM pipe_coating;'
    );
    // let coating_color = await client.query('SELECT color FROM pipe_coating;');

    let coating_return = {};
    coatings.rows.forEach((data) => {
      coating_return[data.coating_type] = data.color;
    });

    res.status(200).send({
      success: true,
      grades,
      coatings: coating_return,
      materials,
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
  updateStrung,
  deleteFromString,
  getStringingInfo,
  getOptions,
};
