const stringingQueries = {
  getSequences: 'SELECT item_id from sequences order by start_station asc',
  getOneSequence:
    `SELECT item_id, station_number, pipe.id as pid, fitting.id as fid, coil_number, pipe_heat.heat_number as pheat, fitting_heat.heat_number as fheat, 
    diameter, pipe_ref.thickness as pthick, fitting_shared_info.thickness as fthick, fitting_shared_info.coat as fcoat, pipe_shared_info.coat as pcoat, 
    pipe_shared_info.grade as pgrade, fitting_shared_info.grade as fgrade, (CASE WHEN plength is null THEN 'fitting' ELSE 'pipe' END) as item_type, flength, plength, 
    pipe_shared_info.created_by as pperson, fitting_shared_info.created_by as fperson, 
    pipe_shared_info.created_on as pdate, fitting_shared_info.created_on as fdate, 
    pipe_heat.manufacture as pman, fitting_heat.manufacture as fman, string_date, string_inspector, 
    ARRAY_AGG(degree || ' ' || bdirection || CASE WHEN blength is not null THEN ' @ ' || blength ELSE '' END || ':'|| bdate || ':' || bend.created_by) as bendInfo  
    from stringing left join pipe on pipe.id = substring(item_id , 3) 
    left join fitting on fitting.id = substring(item_id , 3) 
    left join pipe_shared_info on pipe.pipe_shared_id = pipe_shared_info.pipe_shared_id 
    left join pipe_heat on pipe_shared_info.pipe_heat_id = pipe_heat.pipe_heat_id 
    left join pipe_ref on pipe_shared_info.pipe_ref_id = pipe_ref.pipe_ref_id  
    left join fitting_shared_info on fitting.fitting_shared_id = fitting_shared_info.fitting_shared_id 
    left join fitting_heat on fitting_heat.fitting_heat_id = fitting_shared_info.fitting_heat_id 
    left join pipe_bend on pipe_bend.id = pipe.id 
    left join bend on bend.bend_id = pipe_bend.bend_id 
    where start_pipe = $1 group by item_id, pipe.id, fitting.id, pipe_heat.heat_number, fitting_heat.heat_number, pipe_ref.diameter, pipe_ref.thickness, 
    fitting_shared_info.thickness, fitting_shared_info.coat, pipe_shared_info.coat, pipe_shared_info.grade, fitting_shared_info.grade, 
    pipe_shared_info.created_by, fitting_shared_info.created_by, pipe_shared_info.created_on, fitting_shared_info.created_on, pipe_heat.manufacture, fitting_heat.manufacture  
    order by station_number asc`,
};

module.exports = stringingQueries;
