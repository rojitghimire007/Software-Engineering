const { Client } = require('pg');
client = new Client({
  host: 'teamdaemon.chdmjbgrdfsw.us-east-2.rds.amazonaws.com',
  user: 'postgres',
  password: 'teamDaemon',
  database: 'test_project',
});

client.connect();

module.exports = { client };
