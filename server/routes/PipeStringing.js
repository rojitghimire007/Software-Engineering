const { client } = require('../utils/databaseConnection');

const updateFirstPipe = async (pipe_id) => {
  try {
    await client.query(
      `DELETE FROM first_pipe; INSERT INTO first_pipe(id) VALUES(${pipe_id});`
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getStringing = async (req, res, next) => {
  try {
    let first_pipe = await client.query(`SELECT * FROM first_pipe;`);

    first_pipe = first_pipe.rows[0];

    let data = await client.query(
      `with recursive walk as (
            select s1.pipe, s1.next, array[pipe] as path from stringing s1
            where s1.pipe = ${first_pipe.id}
            
            union all
            
            select s2.pipe, s2.next, w.path || s2.pipe from stringing s2
            join walk w
            on w.next = s2.pipe
        )
        select path from walk where next is null;`
    );

    res.status(200).send(data.rows[0].path);
  } catch (error) {
    next(error);
  }
};

const appendToString = async (req, res, next) => {
  let { pipe_id } = req.body;

  try {
    let firstPipe = await client.query('SELECT * from first_pipe;');

    if (firstPipe.rows.length == 0) updateFirstPipe(pipe_id);
    else
      await client.query(
        `update stringing set next = ${pipe_id} where next is null;`
      );

    await client.query(
      `INSERT INTO stringing(pipe, next) VALUES(${pipe_id}, null)`
    );

    res.status(200).send({ success: true });
  } catch (error) {
    next(error);
  }
};

// Note data must be separated by _
const getStrungPipesInfo = async (req, res, next) => {
  let { pipes } = req.params;
  pipes = pipes.split('_');

  try {
    let data = await client.query(
      `SELECT * FROM pipes WHERE pipe_id in (${pipes.join(',')})`
    );

    return res.status(200).send(data.rows);
  } catch (error) {
    next(error);
  }
};

const updateSequence = async (req, res, next) => {
  let { target_pipe, left_pipe } = req.body;

  try {
    let nexts = await client.query(
      `SELECT * FROM stringing WHERE pipe in (${target_pipe}, ${left_pipe})`
    );

    nexts = nexts.rows;

    if (nexts[0].pipe == left_pipe) {
      curr_next = nexts[0].next;
      temp_next = nexts[1].next;
    } else {
      curr_next = nexts[1].next;
      temp_next = nexts[0].next;
    }

    await client.query(`
      update stringing
      set next = case
      when pipe = ${left_pipe} then ${target_pipe}
      when next = ${target_pipe} then ${temp_next}
      end
      where next in (${target_pipe} , ${curr_next});

      delete from stringing where pipe=${target_pipe};
      insert into stringing(pipe, next) values(${target_pipe}, ${curr_next});
    `);

    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getStringing,
  getStrungPipesInfo,
  appendToString,
  updateSequence,
};
