const pipeQueries = require('../sql_queries/pipeQueries');
const stringingQueries = require('../sql_queries/stringingQueries');
const { client } = require('../utils/databaseConnection');
const { connect_project_db, query_resolver } = require('../utils/dbHandler');

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
    const connection = await connect_project_db(req.dbname);

    let _ = await query_resolver(connection, {
      text: stringingQueries.getSequences,
    });
    let firstPipes = _.map((data) => data.item_id);

    let ans = [];
    for (let i = 0; i < firstPipes.length; i++) {
      _ = await query_resolver(connection, {
        text: stringingQueries.getOneSequence,
        values: [firstPipes[i]],
      });
      ans.push(_);
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
  // let { target_pipe, left_pipe } = req.body;
  let { item, prev_item } = req.body;

  try {
    const connection = await connect_project_db(req.dbname);

    await insertIntoString(item, prev_item, connection);
    // nexts = await client.query(
    //   `SELECT * FROM stringing WHERE pipe in ('${target_pipe}', '${left_pipe}')`
    // );

    // nexts = nexts.rows;

    // if (!left_pipe) {
    //   curr_next = null;
    //   temp_next = nexts[0].next;
    // } else if (nexts[0].pipe == left_pipe) {
    //   curr_next = nexts[0].next; // next val of left pipe
    //   temp_next = nexts[1].next; //next val of target pipe
    // } else {
    //   curr_next = nexts[1].next;
    //   temp_next = nexts[0].next;
    // }

    // await client.query(
    //   `
    //   update stringing
    //   set next = case
    //   when pipe = $1 then $2
    //   when next = $2 then $3
    //   end
    //   where next in ('${target_pipe}' , '${curr_next}')
    //   ${!target_pipe || !curr_next ? 'or next is null' : ''};
    // `,
    //   [left_pipe, target_pipe, temp_next]
    // );

    // await client.query(`delete from stringing where pipe='${target_pipe}';`);

    // let firstPipe = await client.query('SELECT * from first_pipe;');
    // firstPipe = firstPipe.rows[0].id;

    // await client.query(
    //   `insert into stringing(pipe, next) values('${target_pipe}', $1);`,
    //   [!left_pipe ? firstPipe : !curr_next ? null : curr_next]
    // );

    // if (firstPipe == target_pipe) updateFirstPipe(temp_next); //first pipe is being moved
    // if (!left_pipe) updateFirstPipe(target_pipe);

    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteFromSequence = async (req, res, next) => {
  let { item } = req.params;

  try {
    const connection = await connect_project_db(req.dbname);

    await deleteItemFromStringing(item, connection);

    // let firstPipe = await client.query('SELECT * from first_pipe;');
    // firstPipe = firstPipe.rows[0].id;

    // let current = await client.query(
    //   `SELECT * FROM stringing where pipe = $1`,
    //   [pipe]
    // );
    // current = current.rows[0];

    // if (pipe == firstPipe) {
    //   if (current.next)
    //     client.query(`UPDATE first_pipe set id = $1;`, [current.next]);
    //   else client.query('delete from first_pipe;');
    // }

    // await client.query('delete from stringing where pipe = $1;', [pipe]);

    // await client.query('update stringing set next = $2 where next = $1;', [
    //   pipe,
    //   current.next,
    // ]);

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
    const connection = await connect_project_db(req.dbname);

    let ans = await query_resolver(connection, {
      text: stringingQueries.getStriningEligiblePipes1,
    });
    // let ans = await client.query(
    //   `select pipe_id from pipes where pipe_id !~ '[0-9]+[A-Z]' except all select pipe from cut_pipes except all select pipe from stringing;`
    // );
    // ans = ans.rows;

    let _ = await query_resolver(connection, {
      text: stringingQueries.getStriningEligiblePipes2,
    });

    // let _ = await client.query(
    //   `select min(pipe_id) as pipe_id from pipes where pipe_id ~ '[0-9]+[A-Z]' and not exists(select 1 from stringing where stringing.pipe = pipes.pipe_id) group by SUBSTR(pipe_id, 0, LENGTH(pipe_id))`
    // );
    ans = ans.concat(_);

    res.status(200).send(ans);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteItemFromStringing = async (item, connection) => {
  try {
    let _ = null;
    let length = 0;

    if (new RegExp('p_.*').test(item)) {
      _ = await query_resolver(connection, {
        text: 'SELECT plength from pipe where id = $1',
        values: [item.substring(2)],
      });

      length = _[0].plength;
    } else {
      _ = await query_resolver(connection, {
        text: 'SELECT flength from fitting where id = $1',
        values: [item.substring(2)],
      });
      length = _[0].flength;
    }

    _ = await query_resolver(connection, {
      text: 'SELECT * from stringing where item_id = $1',
      values: [item],
    });

    let { station_number, next_item, prev_item } = _[0];

    if (!prev_item) {
      await query_resolver(connection, {
        text: `
          Update sequences set item_id = $1 where item_id = $2;
        `,
        values: [next_item, item],
      });
      await query_resolver(connection, {
        text: `
          Update stringing set start_pipe = $1 where start_pipe = $2;
        `,
        values: [next_item, item],
      });
    }

    await query_resolver(connection, {
      text: 'Update stringing set station_number = station_number - $1 where station_number > $2;',
      values: [length, station_number],
    });

    await query_resolver(connection, {
      text: `DELETE from stringing where item_id = $1;`,
      values: [item],
    });

    await query_resolver(connection, {
      text: `UPDATE stringing set next_item = $1 where item_id = $2;`,
      values: [next_item, prev_item],
    });

    await query_resolver(connection, {
      text: `UPDATE stringing set prev_item = $1 where item_id = $2;`,
      values: [prev_item, next_item],
    });
  } catch (err) {
    throw err;
  }
};

const insertIntoString = async (item, prev_item, connection) => {
  let _,
    station_number,
    next_item,
    start_pipe = null;
  let length = 0;
  try {
    if (new RegExp('p_.*').test(prev_item)) {
      _ = await query_resolver(connection, {
        text: 'SELECT station_number, next_item, start_pipe, plength from stringing join pipe on pipe.id = SUBSTRING(stringing.item_id, 3) where id = $1',
        values: [prev_item.substring(2)],
      });

      length = _[0].plength;
    } else {
      _ = await query_resolver(connection, {
        text: 'SELECT station_number, next_item, start_pipe, flength from stringing join pipe on pipe.id = SUBSTRING(stringing.item_id, 3) where id = $1',
        values: [prev_item.substring(2)],
      });

      length = _[0].flength;
    }

    station_number = _[0].station_number;
    start_pipe = _[0].start_pipe;
    next_item = _[0].next_item;

    // insert the pipe
    await query_resolver(connection, {
      text: stringingQueries.insertIntoStringing,
      values: [item, station_number + length, next_item, prev_item, start_pipe],
    });

    // point prev pipe to this new pipe
    await query_resolver(connection, {
      text: 'update stringing set next_item = $1 where item_id = $2',
      values: [item, prev_item],
    });

    let item_length = 0;

    if (new RegExp('p_.*').test(item)) {
      _ = await query_resolver(connection, {
        text: 'SELECT plength from pipe where id = $1',
        values: [item.substring(2)],
      });

      item_length = _[0].plength;
    } else {
      _ = await query_resolver(connection, {
        text: 'SELECT flength from fitting where id = $1',
        values: [item.substring(2)],
      });
      item_length = _[0].flength;
    }

    await query_resolver(connection, {
      text: 'UPDATE stringing set station_number = $1 where station_number > $2 and item_id != $3',
      values: [station_number + length + item_length, station_number, item],
    });

    await query_resolver(connection, {
      text: 'update stringing set prev_item = $1 where item_id = $2',
      values: [item, next_item],
    });
  } catch (err) {
    throw err;
  }
};

const createNewSequence = async (req, res, next) => {
  try {
    let { station, item } = req.body;
    const connection = await connect_project_db(req.dbname);

    // insert the pipe
    await query_resolver(connection, {
      text: stringingQueries.insertIntoStringing,
      values: [item, station, null, null, item],
    });

    await query_resolver(connection, {
      text: 'INSERT INTO sequences (start_station, item_id) values($1, $2)',
      values: [station, item],
    });

    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateStringing = async (req, res, next) => {
  // item needs to be p_ or f_
  let { left_item, item } = req.body;
  try {
    const connection = await connect_project_db(req.dbname);

    let _ = query_resolver(connection, {
      text: 'SELECT * FROM STRINGING WHERE item_id = $1',
      values: [item],
    });

    // if(_.length > 0){

    // }

    // if
  } catch (error) {
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
  createNewSequence,
};
