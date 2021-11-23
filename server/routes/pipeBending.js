const { connect_project_db, query_resolver } = require("../utils/dbHandler");
const { getRandomString } = require("../utils/randomGenerator");

const bendPipe = async (req, res, next) => {
  const { bends, id } = req.body;

  try {
    const connection = await connect_project_db(req.dbname);

    let bendQueryString = []
    let bendLinkPipeQuery = []

    let pipeCheck = await query_resolver(connection, {
      text: `SELECT id from pipe where id=$1`,
      values: [id]
    });

    if(pipeCheck.length === 0) throw {status: 500, message: 'No such pipe with the id in the database!'}

    for (let bend of bends) {
      let bendLen = bend.blength ? bend.blength : null;
      const test = `SELECT * FROM pipe_bend JOIN bend USING (bend_id) WHERE id=$1 AND degree=$2 AND bdirection=$3 AND blength${bendLen? "='"+bendLen+"'": ' IS NULL'}`;
      let prevBend = await query_resolver(connection, {
        text: test,
        values: [id, bend.degree, bend.bdirection]
      });
      if (prevBend.length === 0) {
        const genId = getRandomString(32);
        const temp = `('${genId}', ${bend.degree}, '${bend.bdirection}', ${bendLen ? "'" + bendLen + "'" : null}, '${req.uname}')`;
        const temp1 = `('${id}', '${genId}')`;
        bendQueryString.push(temp);
        bendLinkPipeQuery.push(temp1);
      }
    }

    if(bendQueryString.length === 0) throw {status: 500, message: "Bending already recorded!"}

    const bendVals = bendQueryString.join(', ').trim();
    const bendPipeVals = bendLinkPipeQuery.join(', ').trim();

    await query_resolver(connection, `INSERT INTO bend(bend_id, degree, bdirection, blength, created_by) VALUES ${bendVals}`);
    await query_resolver(connection, `INSERT INTO pipe_bend(id, bend_id) VALUES ${bendPipeVals}`);

    return res.status(200).json({
      success: true,
      message: 'Bending recorded!'
    });

  } catch (error) {
    next(error);
  }
}

const removeBend = async (req, res, next) => {
  try {
    const { bend_id } = req.params;

    const connection = await connect_project_db(req.dbname);

    await query_resolver(connection, {
      text: `DELETE FROM bend WHERE bend_id=$1`,
      values: [bend_id]
    });

    return res.status(200).json({
      success: true,
      message: 'Bending successfully deleted!'
    })
  } catch (error) {
    next(error);
  }
}

const updateBend = async (req, res, next) => {
  try {
    const { bend_obj, bend_id, id } = req.body;
    const { degree, bdirection, blength } = bend_obj;

    const connection = await connect_project_db(req.dbname);

    const checkDup = await query_resolver(connection, {
      text: `SELECT id from pipe_bend JOIN bend USING(bend_id) WHERE degree=$1 AND bdirection=$2 AND blength=$3 AND id=$4`,
      values: [degree, bdirection, blength, id]
    })

    if(checkDup.length > 0) throw {status: 500, message: 'Bending credential already recorded for the pipe!'}

    await query_resolver(connection, {
      text: `UPDATE bend SET degree=$1, bdirection=$2, blength=$3 WHERE bend_id=$4`,
      values: [degree, bdirection, blength, bend_id]
    })

    return res.status(200).json({
      success: true,
      message: "Bending updated!"
    })

  } catch (error) {
    next(error);
  }
}

const getBend = async (req, res, next) => {
  try{
    const connection = await connect_project_db(req.dbname);

    const query = `SELECT * from pipe_bend JOIN bend USING (bend_id)`;

    const result = await query_resolver(connection, query);
    
    return res.status(200).json({
      success: true,
      data: [...result]
    })

  }catch(error) {
    next(error);
  }
}

// const result = await query_resolver(connection, {
//   text: `select ARRAY_AGG(id || CASE WHEN coil_number is not null THEN ' ' ||  coil_number ELSE '' END) from pipe group by plength`
// });

module.exports = { bendPipe, removeBend, updateBend, getBend };