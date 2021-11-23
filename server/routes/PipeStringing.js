const pipeStringingQueries = require('../sql_queries/stringingQueries');
const { client } = require('../utils/databaseConnection');

const updateFirstPipe = async (pipe_id) => {
  try {
    await client.query(
      `DELETE FROM first_pipe; INSERT INTO first_pipe(id) VALUES('${pipe_id}');`
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getStringing = async (req, res, next) => {
  try {
    let _ = await client.query(pipeStringingQueries.getSequences);
    let firstPipes = _.rows.map((data) => data.itemid);

    let ans = [];
    for (let i = 0; i < firstPipes.length; i++) {
      _ = client.query(pipeStringingQueries.getOneSequence, firstPipes[i]);
      ans.push(_.rows);
    }

    // let first_pipe = await client.query(`SELECT * FROM first_pipe;`);

    // if (first_pipe.rows.length == 0) return res.status(200).send([]);

    // first_pipe = first_pipe.rows[0];

    // let data = await client.query(
    //   `with recursive walk as (
    //         select s1.pipe::varchar(20), s1.next::varchar(20), array[pipe]::varchar(20)[] as path from stringing s1
    //         where s1.pipe = '${first_pipe.id}'

    //         union all

    //         select s2.pipe::varchar(20), s2.next::varchar(20), (w.path || s2.pipe)::varchar(20)[] from stringing s2
    //         join walk w
    //         on w.next = s2.pipe
    //     )
    //     select path from walk where next is null;`
    // );

    res.status(200).send(ans);
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
        `update stringing set next = '${pipe_id}' where next is null;`
      );

    await client.query(
      `INSERT INTO stringing(pipe, next) VALUES('${pipe_id}', null)`
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
  var offset = 1;
  var placeholders = pipes
    .map(function (name, i) {
      return '$' + (i + offset);
    })
    .join(',');

  try {
    let data = await client.query(
      `SELECT void, DATE(inventory_date), CONCAT(first_name, ' ', last_name) AS inspector, location, pipe_id as id,  coil_number as coil_no, heat_number as heat_no, diameter, designation as schedule, wall_thickness, grade, pipe_length as length, pipes.coating_type as coating, color as coating_color, mfg as manufacturer, material as material_type, purchase_order as po_number, comments FROM pipes INNER JOIN schedule_and_class ON pipes.schedule_class = schedule_and_class.id INNER JOIN users ON pipes.inspector_id = users.id INNER JOIN pipe_coating ON pipes.coating_type = pipe_coating.coating_type WHERE pipe_id in (${placeholders})`,
      pipes
    );

    return res.status(200).send(data.rows);
  } catch (error) {
    next(error);
  }
};

const updateSequence = async (req, res, next) => {
  let { target_pipe, left_pipe } = req.body;

  try {
    nexts = await client.query(
      `SELECT * FROM stringing WHERE pipe in ('${target_pipe}', '${left_pipe}')`
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

    await client.query(
      `
      update stringing
      set next = case
      when pipe = $1 then $2
      when next = $2 then $3
      end
      where next in ('${target_pipe}' , '${curr_next}')
      ${!target_pipe || !curr_next ? 'or next is null' : ''};
    `,
      [left_pipe, target_pipe, temp_next]
    );

    await client.query(`delete from stringing where pipe='${target_pipe}';`);

    let firstPipe = await client.query('SELECT * from first_pipe;');
    firstPipe = firstPipe.rows[0].id;

    await client.query(
      `insert into stringing(pipe, next) values('${target_pipe}', $1);`,
      [!left_pipe ? firstPipe : !curr_next ? null : curr_next]
    );

    if (firstPipe == target_pipe) updateFirstPipe(temp_next); //first pipe is being moved
    if (!left_pipe) updateFirstPipe(target_pipe);

    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteFromSequence = async (req, res, next) => {
  let { pipe } = req.params;

  try {
    let firstPipe = await client.query('SELECT * from first_pipe;');
    firstPipe = firstPipe.rows[0].id;

    let current = await client.query(
      `SELECT * FROM stringing where pipe = $1`,
      [pipe]
    );
    current = current.rows[0];

    if (pipe == firstPipe) {
      if (current.next)
        client.query(`UPDATE first_pipe set id = $1;`, [current.next]);
      else client.query('delete from first_pipe;');
    }

    await client.query('delete from stringing where pipe = $1;', [pipe]);

    await client.query('update stringing set next = $2 where next = $1;', [
      pipe,
      current.next,
    ]);

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const lengthofSequence = async (req, res, next) => {
  let { sequence } = req.body;
  var offset = 1;
  var placeholders = sequence
    .map(function (name, i) {
      return '$' + (i + offset);
    })
    .join(',');

  if (!sequence || sequence.length == 0)
    return res.status(200).send({ length: 0 });
  try {
    let length = await client.query(
      `SELECT SUM(pipe_length) as length from pipes where pipe_id in (${placeholders})`,
      sequence
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
      `select pipe_id from pipes where pipe_id !~ '[0-9]+[A-Z]' except all select pipe from cut_pipes except all select pipe from stringing;`
    );
    ans = ans.rows;

    let _ = await client.query(
      `select min(pipe_id) as pipe_id from pipes where pipe_id ~ '[0-9]+[A-Z]' and not exists(select 1 from stringing where stringing.pipe = pipes.pipe_id) group by SUBSTR(pipe_id, 0, LENGTH(pipe_id))`
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
  deleteFromSequence,
};
