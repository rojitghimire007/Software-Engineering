const { Client } = require('pg');
client = new Client({
  host: 'teamdaemon.chdmjbgrdfsw.us-east-2.rds.amazonaws.com',
  user: 'postgres',
  password: 'teamDaemon',
  database: 'pipeline',
});

client.connect();

module.exports = { client };
