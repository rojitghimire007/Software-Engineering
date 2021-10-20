const { client } = require('../utils/databaseConnection');

const cutPipe = async (req, res, next) => {
  const { pipe, cut_length } = req.body;

  await client.query(`SELECT * FROM pipes WHERE `);
};

module.exports = { cutPipe };
