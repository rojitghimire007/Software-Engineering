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
      `SELECT void, DATE(inventory_date), CONCAT(first_name, ' ', last_name) AS inspector, location, pipe_id as id,  coil_number as coil_no, heat_number as heat_no, diameter, designation as schedule, wall_thickness, grade, pipe_length as length, pipes.coating_type as coating, color as coating_color, mfg as manufacturer, material as material_type, purchase_order as po_number, comments FROM pipes INNER JOIN schedule_and_class ON pipes.schedule_class = schedule_and_class.id INNER JOIN users ON pipes.inspector_id = users.id INNER JOIN pipe_coating ON pipes.coating_type = pipe_coating.coating_type WHERE pipe_id in (${pipes.join(
        ','
      )})`
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

    if (!left_pipe) {
      curr_next = null;
      temp_next = nexts[0].next;
    } else if (nexts[0].pipe == left_pipe) {
      curr_next = nexts[0].next; // next val of left pipe
      temp_next = nexts[1].next; //next val of target pipe
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
      where next in (${target_pipe} , ${curr_next})
      ${!target_pipe || !curr_next ? 'or next is null' : ''};

    `);

    await client.query(`delete from stringing where pipe=${target_pipe};`);

    let firstPipe = await client.query('SELECT * from first_pipe;');
    firstPipe = firstPipe.rows[0].id;

    await client.query(
      `insert into stringing(pipe, next) values(${target_pipe}, ${
        !left_pipe ? firstPipe : !curr_next ? null : curr_next
      });`
    );

    if (firstPipe == target_pipe) updateFirstPipe(temp_next); //first pipe is being moved
    if (!left_pipe) updateFirstPipe(target_pipe);

    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const lengthofSequence = async (req, res, next) => {
  let { sequence } = req.body;

  if (!sequence || sequence.length == 0)
    return res.status(200).send({ length: 0 });
  try {
    let length = await client.query(
      `SELECT SUM(pipe_length) as length from pipes where pipe_id in (${sequence.join(
        ','
      )})`
    );
    length = length.rows[0];

    return res.status(200).send(length);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getStriningEligiblePipes = async (req, res, next) => {
  try {
    let ans = await client.query(
      `select pipe_id from pipes where pipe_id !~ '[0-9]+[A-Z]' and iscut = false`
    );
    ans = ans.rows;

    let _ = await client.query(
      `select min(pipe_id) as pipe_id from pipes where pipe_id ~ '[0-9]+[A-Z]' group by SUBSTR(pipe_id, 0, LENGTH(pipe_id))`
    );
    ans = ans.concat(_.rows);

    res.status(200).send(ans);
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
  lengthofSequence,
  getStriningEligiblePipes,
};
