const stringingQueries = {
  getSequences: 'SELECT item_id from sequences order by start_station asc',
  getOneSequence:
    'SELECT item_id, station_number, plength , flength  from stringing left join pipe on pipe.id = substring(item_id , 3) left join fitting on fitting.id = substring(item_id , 3) where start_pipe = $1 order by station_number asc',
  getStriningEligiblePipes1:
    'SELECT id FROM pipe WHERE parent is null except all select substring(item_id , 3) from stringing except all select parent from pipe',
  getStriningEligiblePipes2:
    'SELECT min(id) as id FROM pipe where parent is not null group by SUBSTR(id, 0, LENGTH(id)) except all select substring(item_id , 3) from stringing',
  getStriningEligibleFittings1: `SELECT CONCAT('F_', id) as id FROM fitting WHERE parent is null except all select item_id from stringing except all select parent from pipe`,
  getStriningEligibleFittings2: `SELECT  CONCAT('F_', min(id)) as id FROM fitting where parent is not null group by SUBSTR(id, 0, LENGTH(id)) except all select item_id from stringing`,
  insertIntoStringing: `INSERT INTO public.stringing(
  item_id, station_number, next_item, prev_item, start_pipe)
  VALUES ($1, $2, $3, $4, $5);`,
};

module.exports = stringingQueries;
