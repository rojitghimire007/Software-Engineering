const { client } = require('../utils/databaseConnection');

const cutPipe = async (req, res, next) => {
  const { pipe, cut_length } = req.body;

  try {
    if (!pipe)
      return res.status(400).send({ message: 'Please enter a valid pipeId' });
    else {
      let _ = await client.query('select pipe from stringing where pipe = $1', [
        pipe,
      ]);

      if (_.rows.length != 0)
        return res.status(400).send({
          message: "Can't cut a pipe that is in the stringing sequence.",
        });
    }

    let _ = await client.query(
      'SELECT pipe_length from pipes where pipe_id = $1',
      [pipe]
    );
    let originalLength = _.rows[0].pipe_length;

    let newPipes = null;
    if (new RegExp('[0-9]+[A-Z]').test(pipe)) {
      newPipes = [
        pipe,
        pipe.slice(0, -1) +
          String.fromCharCode(pipe.charCodeAt(pipe.length - 1) + 1),
      ];
    } else newPipes = [pipe + 'A', pipe + 'B'];

    await client.query(
      `CREATE TEMPORARY TABLE temp_pipe_table AS SELECT * FROM pipes WHERE pipe_id = '${pipe}';
      `
    );

    if (newPipes[0] == pipe)
      await client.query(`DELETE FROM pipes WHERE pipe_id = '${pipe}';`);
    //insert into cut pipes
    else await client.query(`INSERT INTO cut_pipes(pipe) values(${pipe})`);

    await client.query(
      `
      UPDATE temp_pipe_table SET pipe_id = '${
        newPipes[0]
      }', pipe_length = ${cut_length}, coil_number = null;
      
      INSERT INTO pipes SELECT * from temp_pipe_table;
      UPDATE temp_pipe_table SET pipe_id = '${newPipes[1]}', pipe_length = ${
        originalLength - cut_length
      };
      INSERT INTO pipes SELECT * from temp_pipe_table;
      DROP TABLE temp_pipe_table;   
      `
    );

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCuttingEligiblePipes = async (req, res, next) => {
  try {
    let ans = await client.query(
      `select pipe_id from pipes where pipe_id !~ '[0-9]+[A-Z]' except all select pipe from cut_pipes except all select pipe from stringing;`
    );
    ans = ans.rows;

    let _ = await client.query(
      `select max(pipe_id) as pipe_id from pipes where pipe_id ~ '[0-9]+[A-Z]' group by SUBSTR(pipe_id, 0, LENGTH(pipe_id)) except all select pipe from stringing;`
    );
    ans = ans.concat(_.rows);

    res.status(200).send(ans);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { cutPipe, getCuttingEligiblePipes };

//console.log('Everything is fine');
