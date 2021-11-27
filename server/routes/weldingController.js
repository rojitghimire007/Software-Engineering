const { default_pool, connect_project_db, query_resolver } = require('../utils/dbHandler');
const { getRandomString } = require('../utils/randomGenerator');

const postWeld = async (req, res, next) => {
  try {
    const { item_id, next_item, station, rp, hp, hpp, fl, wdate, fldate } = req.body;

    const weldID = getRandomString(16);

    const connection = await connect_project_db(req.dbname);

    //check validity in stringing
    const checkString = await query_resolver(connection, {
      text: `SELECT * FROM stringing WHERE item_id=$1 AND next_item=$2 AND station_number=$3`,
      values: [item_id, next_item, station]
    });
    if(checkString.length === 0) throw {status: 500, message: "No Such entry in strinigng to weld!"}

    //check if the welding is already done
    const dupCheck = await query_resolver(connection, {
      text: 'SELECT * FROM weld_seq WHERE item_id=$1 and next_item=$2',
      values: [item_id, next_item]
    });
    if (dupCheck.length > 0) throw { status: 500, message: 'This weld already exists' }

    let query = {
      text: `INSERT INTO weld(weld_id, rp, hp, hpp, fl, wdate, fldate) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      values: [weldID, rp, hp, hpp, fl, wdate, fldate]
    }

    await query_resolver(connection, query);

    const result1 = await query_resolver(connection, {
      text: 'SELECT start_station FROM weld_seq WHERE next_item=$1',
      values: [item_id]
    });

    //figure out start
    let start = station;
    //if the item_id is already welded to left (assume weld direction left to right)
    if (result1.length > 0) start = result1[0].start_station;

    await query_resolver(connection, {
      text: `INSERT INTO weld_seq(item_id, next_item, weld_id, start_station) VALUES ($1, $2, $3, $4)`,
      values: [item_id, next_item, weldID, start]
    });

    const result2 = await query_resolver(connection, {
      text: `SELECT start_station FROM weld_seq WHERE item_id=$1`,
      values: [next_item]
    });

    //if the next_item has a weld on it right (assume weld direction left to right)
    if (result2.length > 0) {
      await query_resolver(connection, {
        text: `UPDATE weld_seq SET start_station=$1 WHERE start_station=$2`,
        values: [start, result2[0].start_station]
      });
    }

    let up_inventory = [item_id, next_item]

    for (let item of up_inventory) {
      if (item.startsWith('P_')) {
        await query_resolver(connection, {
          text: 'UPDATE pipe SET is_weld=$1 WHERE id=$2',
          values: [true, item.substring(2)]
        })
      } else if (item.startsWith('F_')) {
        await query_resolver(connection, {
          text: 'UPDATE fitting SET is_weld=$1 WHERE id=$2',
          values: [true, item.substring(2)]
        })
      } else { //we should not reach here
        throw { status: 500, message: 'Unknown id' }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Welded!'
    })

  } catch (error) {
    next(error);
  }
}

const getWeld = async (req, res, next) => {
  try {
    const connection = await connect_project_db(req.dbname);

    const sequence = await query_resolver(connection, 'SELECT DISTINCT(start_station) AS start FROM weld_seq ORDER BY start_station ASC');

    let data = [];

    if (sequence.length > 0) {
      for (let seq in sequence) {
        const seq_items = await query_resolver(connection, {
          text: 'SELECT * FROM weld_seq WHERE start_station=$1',
          values: [seq.start]
        });
        data.push(seq_items);
      }
    }

    return res.status(200).json({
      success: true,
      data
    })

  } catch (error) {
    next(error);
  }
}

module.exports = { postWeld, getWeld }