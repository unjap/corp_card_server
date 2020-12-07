const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '114.202.216.45',
    post: 3306,
    user: 'iptvteam',
    password: 'open1404',
    database: 'corp',
    dateStrings: 'date'
});

connection.handleDisconnect = () => {
    connection = mysql.createConnection(connection);
  }

module.exports = connection;