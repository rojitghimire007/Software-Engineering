const { client } = require('../utils/databaseConnection');

const addFittings = (req, res, next) => {
  let {
    id,
    location,
    dimension,
    style,
    wall_thickness,
    heat_number,
    grade,
    coating_type,
    mfg,
    purchase_order,
    smart_label,
  } = req.body;

  console.log(
    id,
    location,
    dimension,
    style,
    wall_thickness,
    heat_number,
    grade,
    coating_type,
    mfg,
    purchase_order,
    smart_label
  );
  client
    .query({
      text: 'INSERT INTO fittings(id,location,dimension,style,wall_thickness,heat_number,grade,coating_type,mfg,purchase_order,smart_label) VALUES($1, $2,  $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      values: [
        id,
        location,
        dimension,
        style,
        wall_thickness,
        heat_number,
        grade,
        coating_type,
        mfg,
        purchase_order,
        smart_label,
      ],
    })
    .then((r) => {
      return res.status(201).send({
        success: true,
        message: 'Fittings Added!',
      });
    })
    .catch((e) => {
      console.log(e);
      next({ status: 500, message: 'Something went wrong!' });
    });
};

const getFittings = (req, res, next) => {
  try {
    client.query(
      "SELECT fittings.id AS id , CONCAT(first_name, ' ', last_name) AS inspector, location, dimension, style, wall_thickness, grade, heat_number, mfg, fitting_coating.coating_type,description, material, purchase_order , smart_label FROM fittings RIGHT JOIN users ON fittings.inspector_id = users.id LEFT JOIN fitting_coating ON fittings.coating_type = fitting_coating.coating_type;"
    );
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { addFittings, getFittings };
