const mysql = require('mysql');

let reConnection = null;
const connection = mysql.createConnection({
    host: '114.202.216.45',
    post: 3306,
    user: 'iptvteam',
    password: 'open1404',
    database: 'corp',
    dateStrings: 'date'
});

connection.handleDisconnect = () => {
    reConnection = mysql.createConnection(connection);
  }

module.exports = connection;