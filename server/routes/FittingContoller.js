const { client } = require('../utils/databaseConnection');

const addFittings = async (req, res, next) => {
  let {
    id,
    isVoid,
    inventory_date,
    location,
    dimension,
    style,
    wall_thickness,
    grade,
    heat_number,
    mfg,
    length,
    coating_type,
    description,
    material,
    purchase_order,
    smart_label,
    comments,
  } = req.body;

  try {
    if (!req.userEmail) throw { status: 400, message: 'Invalid Token!' };

    let user = await client.query(
      `SELECT * FROM USERS WHERE email = '${req.userEmail}'`
    );
    let inspector_id = user.rows[0].id;

    await client.query({
      text: 'INSERT INTO FITTINGS (id, isVoid, location, dimension, style, wall_thickness, grade, heat_number, mfg, length, coating_type, description, material, purchase_order, smart_label, comments, inspector_id) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
      values: [
        id,
        isVoid,
        location,
        dimension,
        style,
        wall_thickness,
        grade,
        heat_number,
        mfg,
        length,
        coating_type,
        description,
        material,
        purchase_order,
        smart_label,
        comments,
        inspector_id,
      ],
    });

    return res.status(200).send({ success: true, message: 'Fitting Added!' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getFittings = async (req, res, next) => {
  try {
    let data = await client.query(
      "SELECT fittings.id AS id , CONCAT(first_name, ' ', last_name) AS inspector, isVoid, inventory_date, length, location, dimension, style, wall_thickness, grade, heat_number, mfg, fitting_coating.coating_type,description, material, purchase_order , smart_label, comments FROM fittings RIGHT JOIN users ON fittings.inspector_id = users.id LEFT JOIN fitting_coating ON fittings.coating_type = fitting_coating.coating_type;"
    );
    res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { addFittings, getFittings };
