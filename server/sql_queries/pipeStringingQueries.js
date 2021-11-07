const pipeStringingQueries = {
  getSequences: 'SELECT item_id from sequences order by start_station asc',
  getOneSequence:
    'SELECT item_id, station_number from stringing where start_pipe = $1 order by station_number asc',
};

module.exports = pipeStringingQueries;
