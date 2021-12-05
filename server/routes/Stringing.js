const fittingQueries = require('../sql_queries/fittingQueries');
const pipeQueries = require('../sql_queries/pipeQueries');
const stringingQueries = require('../sql_queries/stringingQueries');
const { connect_project_db, query_resolver } = require('../utils/dbHandler');

/**
 * Get Stringing items
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Get all stringing item
 */
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

/**
 * Update Stringing Sequence
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Success object
 */
const updateSequence = async (req, res, next) => {
  // let { target_pipe, left_pipe } = req.body;
  let { item, prev_item, start_item } = req.body;

  try {
    const connection = await connect_project_db(req.dbname);
    let inspector = req.uname;

    await deleteItemFromStringing(item, connection);

    await insertItemIntoStringing(
      item,
      prev_item,
      start_item,
      connection,
      inspector
    );
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

/**
 * Delete item from sequence
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Success object
 */
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

/**
 * Insert item into sequence
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Success object
 */
const insertIntoSequence = async (req, res, next) => {
  try {
    const connection = await connect_project_db(req.dbname);

    let { item, prev_item, start_item } = req.body;

    await insertItemIntoStringing(
      item,
      prev_item,
      start_item,
      connection,
      req.uname
    );

    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Get all stringing eligible pipes
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Stringing eligible pipes
 */
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
    _ = await query_resolver(connection, {
      text: stringingQueries.getStriningEligibleFittings1,
    });

    ans = ans.concat(_);

    _ = await query_resolver(connection, {
      text: stringingQueries.getStriningEligibleFittings2,
    });

    ans = ans.concat(_);

    res.status(200).send(ans.map((item) => item.id));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Depricated
 * @param {*} item
 * @param {*} connection
 */
const old_deleteItemFromStringing = async (item, connection) => {
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
      if (next_item) {
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
      } else
        await query_resolver(connection, {
          text: 'DELETE FROM sequences where item_id = $1',
          values: [item],
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

/**
 * Delete item from sequence
 * @param {String} item - Item id
 * @param {Object} connection - connection object for db
 */
const deleteItemFromStringing = async (item, connection) => {
  try {
    let _ = null;
    let length = 0;

    _ = await query_resolver(connection, {
      text: 'SELECT * from stringing where item_id = $1',
      values: [item],
    });

    let { station_number, next_item, prev_item } = _[0];

    if (!prev_item) {
      if (next_item) {
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
      } else
        await query_resolver(connection, {
          text: 'DELETE FROM sequences where item_id = $1',
          values: [item],
        });
    }

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

/**
 * Insert item into stringing
 * @param {String} item The item to be inserted
 * @param {String} prev_item The thing that needs to be ahead of our item in the updated sequence. Can be null if item is placed at the beginning of the sequence.
 * @param {String} start_item If the item is placed at the beginning of the sequence, this will be the previous first item in that sequence.
 * @param {Object} connection connection object to db
 */
const oldinsertItemIntoStringing = async (
  item,
  prev_item,
  start_item,
  connection
) => {
  let _,
    station_number,
    next_item,
    start_pipe = null;
  let length = 0;
  try {
    if (!start_item) {
      // get the length of prev_item. This is use to calculate the station of the item.
      if (new RegExp('F_.*').test(prev_item)) {
        _ = await query_resolver(connection, {
          text: 'SELECT station_number, next_item, start_pipe, flength from stringing join fitting on fitting.id = SUBSTRING(stringing.item_id, 3) where id = $1',
          values: [prev_item.substring(2)],
        });

        length = _[0].flength;
      } else {
        _ = await query_resolver(connection, {
          text: 'SELECT station_number, next_item, start_pipe, plength from stringing join pipe on pipe.id = SUBSTRING(stringing.item_id, 3) where id = $1',
          values: [prev_item.substring(2)],
        });

        length = _[0].plength;
      }

      station_number = _[0].station_number;
      start_pipe = _[0].start_pipe;
      next_item = _[0].next_item;
    } else {
      _ = await query_resolver(connection, {
        text: 'select * from sequences where item_id = $1',
        values: [start_item],
      });
      station_number = _[0].start_station;
      next_item = start_item;
      prev_item = null;
      start_pipe = item;
    }
    // insert the pipe
    await query_resolver(connection, {
      text: stringingQueries.insertIntoStringing,
      values: [item, station_number + length, next_item, prev_item, start_pipe],
    });

    // point prev pipe to this new pipe
    if (!start_item)
      await query_resolver(connection, {
        text: 'update stringing set next_item = $1 where item_id = $2',
        values: [item, prev_item],
      });
    // else update sequences
    else {
      await query_resolver(connection, {
        text: 'UPDATE sequences set item_id = $1 where item_id = $2',
        values: [item, start_item],
      });
      await query_resolver(connection, {
        text: 'UPDATE stringing set start_pipe = $1 where start_pipe = $2',
        values: [item, start_item],
      });
    }

    let item_length = 0;

    // get length
    if (new RegExp('F_.*').test(item)) {
      _ = await query_resolver(connection, {
        text: 'SELECT flength from fitting where id = $1',
        values: [item.substring(2)],
      });
      item_length = _[0].flength;
    } else {
      _ = await query_resolver(connection, {
        text: 'SELECT plength from pipe where id = $1',
        values: [item.substring(2)],
      });

      item_length = _[0].plength;
    }

    //update stations of following items
    await query_resolver(connection, {
      text: 'UPDATE stringing set station_number = station_number + $1 where station_number >= $2 and item_id != $3',
      values: [item_length, station_number + length, item],
    });

    // point the item to prev_item
    await query_resolver(connection, {
      text: 'update stringing set prev_item = $1 where item_id = $2',
      values: [item, next_item],
    });
  } catch (err) {
    throw err;
  }
};

/**
 * Create new sequence
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Success object
 */
const insertItemIntoStringing = async (
  item,
  prev_item,
  start_item,
  connection,
  inspector
) => {
  let _,
    station_number,
    next_item,
    start_pipe = null;
  let length = 0;

  try {
    if (!start_item) {
      // get the length of prev_item. This is use to calculate the station of the item.
      if (new RegExp('F_.*').test(prev_item)) {
        _ = await query_resolver(connection, {
          text: 'SELECT station_number, next_item, start_pipe, flength from stringing join fitting on fitting.id = SUBSTRING(stringing.item_id, 3) where id = $1',
          values: [prev_item.substring(2)],
        });

        length = _[0].flength;
      } else {
        _ = await query_resolver(connection, {
          text: 'SELECT station_number, next_item, start_pipe, plength from stringing join pipe on pipe.id = SUBSTRING(stringing.item_id, 3) where id = $1',
          values: [prev_item.substring(2)],
        });

        length = _[0].plength;
      }

      station_number = _[0].station_number;
      start_pipe = _[0].start_pipe;
      next_item = _[0].next_item;
    } else {
      _ = await query_resolver(connection, {
        text: 'select * from sequences where item_id = $1',
        values: [start_item],
      });
      station_number = _[0].start_station;
      next_item = start_item;
      prev_item = null;
      start_pipe = item;
    }
    // insert the pipe
    await query_resolver(connection, {
      text: stringingQueries.insertIntoStringing,
      values: [
        item,
        station_number + length,
        next_item,
        prev_item,
        start_pipe,
        inspector,
      ],
    });

    // point prev pipe to this new pipe
    if (!start_item)
      await query_resolver(connection, {
        text: 'update stringing set next_item = $1 where item_id = $2',
        values: [item, prev_item],
      });
    // else update sequences
    else {
      await query_resolver(connection, {
        text: 'UPDATE sequences set item_id = $1 where item_id = $2',
        values: [item, start_item],
      });
      await query_resolver(connection, {
        text: 'UPDATE stringing set start_pipe = $1 where start_pipe = $2',
        values: [item, start_item],
      });
    }

    // let item_length = 0;

    // // get length
    // if (new RegExp('F_.*').test(item)) {
    //   _ = await query_resolver(connection, {
    //     text: 'SELECT flength from fitting where id = $1',
    //     values: [item.substring(2)],
    //   });
    //   item_length = _[0].flength;
    // } else {
    //   _ = await query_resolver(connection, {
    //     text: 'SELECT plength from pipe where id = $1',
    //     values: [item.substring(2)],
    //   });

    //   item_length = _[0].plength;
    // }

    // //update stations of following items
    // await query_resolver(connection, {
    //   text: 'UPDATE stringing set station_number = station_number + $1 where station_number >= $2 and item_id != $3',
    //   values: [item_length, station_number + length, item],
    // });

    // point the item to prev_item
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
    let inspector = req.uname;
    const connection = await connect_project_db(req.dbname);

    // insert the pipe
    await query_resolver(connection, {
      text: stringingQueries.insertIntoStringing,
      values: [item, station, null, null, item, inspector],
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

/**
 * Get a single item info
 * @param {String} item - item id of an item
 * @param {Object} connection connection object to the db
 * @returns Item info
 */
const getOneItemInfo = async (item, connection) => {
  try {
    // If fitting
    if (new RegExp('F_.*').test(item)) {
      _ = await query_resolver(connection, {
        text: fittingQueries.oneFitting,
        values: [item.substring(2)],
      });
    } else {
      _ = await query_resolver(connection, {
        text: pipeQueries.onePipe,
        values: [item.substring(2)],
      });
    }

    return _[0];
  } catch (error) {
    throw error;
  }
};

/**
 * Get item information
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Information about an item
 */
const getItemInfo = async (req, res, next) => {
  // item needs to be p_ or f_
  let { item } = req.params;

  try {
    const connection = await connect_project_db(req.dbname);
    let details = await getOneItemInfo(item, connection);

    return res.status(200).send(details);
  } catch (error) {
    next(error);
  }
};

/**
 * Get info on item in stringing
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Get item details in stringing
 */
const getStrungItemsInfo = async (req, res, next) => {
  let items = req.params.items.split('-');
  let ans = [];

  try {
    const connection = await connect_project_db(req.dbname);
    for (item of items) {
      if (item == 'gap')
        ans.push({
          heat_no: null,
          wall_thickness: null,
          grade: null,
          bending: null,
        });
      else ans.push(await getOneItemInfo(item, connection));

      // SELECT ARRAY_AGG(degree  || ' ' ||  bdirection || CASE WHEN blength is not null THEN ' @ ' || blength ELSE '' END) as bendInfo   from pipe left join pipe_bend on pipe_bend.id = pipe.id    left join bend on bend.bend_id = pipe_bend.bend_id where pipe.id='90' group by pipe.id
    }
    res.status(200).send(ans);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStringing,
  updateSequence,
  getStriningEligiblePipes,
  deleteFromSequence,
  createNewSequence,
  getItemInfo,
  insertIntoSequence,
  getStrungItemsInfo,
};
