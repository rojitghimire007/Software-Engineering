const { client } = require('../utils/databaseConnection');

const addPipe = (req, res, next) => {
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

  console.log(
    location,
    coil_no,
    heat_no,
    schedule,
    grade,
    length,
    coating,
    coating_color,
    material_type,
    po_number,
    smart_label,
    comments,
    isVoid
  );
  client
    .query({
      text:
        'INSERT INTO pipes(location, coil_number, heat_number, grade_type, pipe_length,coating_type, coating_color, type_name, porder_id, smart_label, comments, void, schedule_class, diameter) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
      values: [
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
        schedule,
        diameter,
      ],
    })
    .then((r) => {
      return res.status(201).send({
        success: true,
        message: 'Pipe Added!',
      });
    })
    .catch((e) => {
      console.log(e);
      next({ status: 500, message: 'Something went wrong!' });
    });
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

module.exports = { addPipe, allPipes };

// .query("SELECT pipe_id as id, * FROM pipes")
