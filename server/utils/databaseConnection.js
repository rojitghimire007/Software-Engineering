const { Client } = require('pg');
client = new Client({
  host: 'teamdaemon.chdmjbgrdfsw.us-east-2.rds.amazonaws.com',
  user: 'postgres',
  password: 'teamDaemon',
  database: 'alpha',
});

client.connect();

module.exports = { client };
