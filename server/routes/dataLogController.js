const stringingQueries = require('../sql_queries/materDataQueries');
const { connect_project_db, query_resolver } = require('../utils/dbHandler');

/**
 * Get master log information
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next Function
 * @returns {Object} Get date for master log database
 */
const getAggregateData = async (req, res, next) => {
  try {
    const connection = await connect_project_db(req.dbname);

    let getSeq = await query_resolver(connection, {
      text: stringingQueries.getSequences,
    });
    let firstPipes = getSeq.map((data) => data.item_id);

    let ans = [];
    for (let i = 0; i < firstPipes.length; i++) {
      getSeq = await query_resolver(connection, {
        text: stringingQueries.getOneSequence,
        values: [firstPipes[i]],
      });
      ans.push(getSeq);
    }

    let finalArray = ans.map(cont => {
      return cont.map(ele => {
        let st_station = '' + ele.station_number;
        let en_station = '' + (ele.station_number + (ele.plength ? ele.plength : ele.flength));

        if (st_station.length > 2) {
          st_station = st_station.substring(0, st_station.length - 2) + '+' + st_station.substring(st_station.length - 2);
        } else {
          st_station = '0' + '+' + st_station;
        }

        if (en_station.length > 2) {
          en_station = en_station.substring(0, en_station.length - 2) + '+' + en_station.substring(en_station.length - 2);
        } else {
          en_station = '0' + '+' + en_station;
        }

        if (ele.item_type == 'pipe') {
          let bends = '';
          let bendDate = '';
          let bendPer = '';
          if (ele.bendinfo[0] !== null) {
            for (let item of ele.bendinfo) {
              let splitArr = item.split(':');
              bends += splitArr[0] + "; ";
              bendDate += splitArr[1] + "; ";
              bendPer += splitArr[2] + "; ";
            }
          }

          return {
            fromNum: st_station,
            toNum: en_station,
            id: ele.pid,
            coilNum: ele.coil_number,
            heatNum: ele.pheat,
            diameter: ele.diameter,
            thick: ele.pthick,
            grade: ele.pgrade,
            iLength: ele.plength,
            coat: ele.pcoat,
            manufacture: ele.pman,
            create_date: ele.pdate,
            inspector: ele.pperson,
            string_date: ele.string_date,
            string_inspector: ele.string_inspector,
            bends,
            bendDate,
            bendPer,
            item_type: ele.item_type,
            rp: ele.rp? ele.rp.join(", ") : null,
            hp: ele.hp? ele.hp.join(", ") : null,
            hpp: ele.hpp? ele.hpp.join(", "): null,
            fl: ele.fl? ele.fl.join(", "): null,
            wdate: ele.wdate,
            fldate: ele.fldate
          }
        } else {

          return {
            fromNum: st_station,
            toNum: en_station,
            id: ele.fid,
            coilNum: 'test',
            heatNum: ele.fheat,
            diameter: null,
            thick: ele.fthick,
            grade: ele.fgrade,
            iLength: ele.flength,
            coat: ele.fcoat,
            manufacture: ele.fman,
            create_date: ele.fdate,
            inspector: ele.fperson,
            string_date: ele.string_date,
            string_inspector: ele.string_inspector,
            bends: null,
            bendDate: null,
            bendPer: null,
            item_type: ele.item_type,
            rp: ele.rp? ele.rp.join(", ") : null,
            hp: ele.hp? ele.hp.join(", ") : null,
            hpp: ele.hpp? ele.hpp.join(", "): null,
            fl: ele.fl? ele.fl.join(", "): null,
            wdate: ele.wdate,
            fldate: ele.fldate
          }
        }
      });
    })

    let senData = []
    for (let out of finalArray){
      for (let inner of out){
        senData.push(inner);
      }
    }

    return res.status(200).json({
      success: true,
      data: senData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAggregateData,
};