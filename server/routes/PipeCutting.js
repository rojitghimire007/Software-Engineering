const { query } = require("express");
const { query_resolver, connect_project_db } = require("../utils/dbHandler");

const cutPipe = async (req, res, next) => {
  const { id, cutLength } = req.body;

  try {
    const connection = await connect_project_db(req.dbname);

    let selected_pipe = await query_resolver(connection, {
      text: `SELECT plength, parent, is_void, is_used, is_cut, pipe_shared_id, plocation FROM pipe WHERE id=$1`,
      values: [id]
    });

    if (selected_pipe.length === 0) {
      throw { status: 500, message: 'Invalid pipe id!' }
    }

    if (cutLength >= selected_pipe[0].plength) {
      throw { status: 401, message: "Invalid cut length!" }
    }

    if (selected_pipe[0].parent) {
      const newPipeId = selected_pipe[0].parent + String.fromCharCode(id.charCodeAt(id.length - 1) + 1);

      await query_resolver(connection, {
        text: `INSERT INTO pipe(id, pipe_shared_id, plength, updated_by, updated_on, plocation, parent) VALUES ($1, $2, $3, $4, to_timestamp($5), $6, $7)`,
        values: [newPipeId, selected_pipe[0].pipe_shared_id, selected_pipe[0].plength - cutLength, req.uname, Math.floor(Date.now() / 1000), selected_pipe[0].plocation, selected_pipe[0].parent]
      });

      await query_resolver(connection, {
        text: `UPDATE pipe SET plength=$1, updated_by=$2, updated_on=to_timestamp($3) WHERE id=$4`,
        values: [cutLength, req.uname, Math.floor(Date.now() / 1000), id]
      });

      return res.status(200).json({
        success: true,
        message: 'Pipe Successfully Cut!'
      });

    } else {
      const newPipeIds = [
        { id: `${id}A`, len: cutLength },
        { id: `${id}B`, len: selected_pipe[0].plength - cutLength }
      ]

      for (let i = 0; i < 2; i++) {
        await query_resolver(connection, {
          text: `INSERT INTO pipe(id, pipe_shared_id, plength, updated_by, updated_on, plocation, parent) VALUES ($1, $2, $3, $4, to_timestamp($5), $6, $7)`,
          values: [newPipeIds[i].id, selected_pipe[0].pipe_shared_id, newPipeIds[i].len, req.uname, Math.floor(Date.now() / 1000), selected_pipe[0].plocation, id]
        });
      }
    }
    await query_resolver(connection, {
      text: `UPDATE pipe SET is_cut=$1, updated_by=$2, updated_on=to_timestamp($3) WHERE id=$4`,
      values: [true, req.uname, Math.floor(Date.now() / 1000), id]
    });

    return res.status(200).json({
      success: true,
      message: 'Pipe Successfully Cut!'
    });

  } catch (error) {
    next(error);
  }
};

const getCuttingEligiblePipes = async (req, res, next) => {
  try {
    const connection = await connect_project_db(req.dbname);
    let allPipeExceptString = await query_resolver(connection, {
      text: `SELECT id FROM pipe WHERE id !~ '[0-9]+[A-Z]' AND is_void!=TRUE AND is_cut!=TRUE EXCEPT ALL SELECT SUBSTRING(item_id, 3) AS id FROM stringing WHERE SUBSTR(item_id, 0, 3)='p_'`
    });

    let cutMaxPipeExceptString = await query_resolver(connection, {
      text: `SELECT  MAX(id) as id FROM pipe WHERE id ~ '[0-9]+[A-Z]' AND is_void!=TRUE AND is_cut!=TRUE GROUP BY SUBSTR(id, 0, LENGTH(id)) EXCEPT ALL SELECT SUBSTRING(item_id, 3) AS id FROM stringing WHERE SUBSTR(item_id, 0, 3)='p_'`
    });

    const result = allPipeExceptString.concat(cutMaxPipeExceptString);

    return res.status(200).json({
      success: true,
      data: [...result]
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getPipeLength = async (req, res, next) => {
  try {
    const { id } = req.body;
    const connection = await connect_project_db(req.dbname);
    const result = await query_resolver(connection, {
      text: `SELECT plength FROM pipe WHERE id=$1`,
      values: [id]
    })

    return res.status(200).json({
      success: true,
      data: result[0]
    })

  }catch(error){
    next(error);
  }
}

module.exports = { cutPipe, getCuttingEligiblePipes, getPipeLength };

//console.log('Everything is fine');
