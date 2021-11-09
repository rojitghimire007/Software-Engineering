const stringingQueries = {
  getSequences: 'SELECT item_id from sequences order by start_station asc',
  getOneSequence:
    'SELECT item_id, station_number from stringing where start_pipe = $1 order by station_number asc',
  getStriningEligiblePipes1:
    'SELECT id FROM pipe WHERE parent is null except all select substring(item_id , 3) from stringing',
  getStriningEligiblePipes2:
    'SELECT min(id) as id FROM pipe WHERE parent is not null except all select substring(item_id , 3) from stringing group by SUBSTR(id, 0, LENGTH(id))',
  insertIntoStringing: `INSERT INTO public.stringing(
  item_id, station_number, next_item, prev_item, start_pipe)
  VALUES ($1, $2, $3, $4, $5);`,
};

module.exports = stringingQueries;
