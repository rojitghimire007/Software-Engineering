const { client } = require('../utils/databaseConnection');

const cutPipe = async (req, res, next) => {
  const { pipe, cut_length } = req.body;

  await client.query(`SELECT * FROM pipes WHERE `);
};

const getCuttingEligiblePipes = async (req, res, next) => {
  const { pipe, cut_length } = req.body;

  try {
    let eligiblePipes = await client.query(
      `SELECT * FROM pipes WHERE (pipe = ${pipe_id} AND isCut = '${false}`
    );

    eligiblepipes = eligiblePipes.rows[0].id;

    let cuttablePipes = await client.query(
      `SELECT * FROM pipes WHERE pipe LIKE '${pipe_id}%' ORDER BY ${pipe_id} DESC 1`
    );

    cuttablePipes = cuttablePipes.rows[0].id;
    res.status(200).send({ success: true, cuttablePipes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { cutPipe, getCuttingEligiblePipes };

//console.log('Everything is fine');
