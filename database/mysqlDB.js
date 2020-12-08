const mysql = require('mysql');
let connection = null;

const db_config = {
    host: '114.202.216.45',
    post: 3306,
    user: 'iptvteam',
    password: 'open1404',
    database: 'corp',
    dateStrings: 'date'
};

function handleDisconnect() {
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
        if(err) {
            console.log('error when connection to db: ', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', function(err) {
        console.log('db error ', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            return handleDisconnect();
        } else {
            throw err;
        }
    })
}

handleDisconnect()

module.exports = connection;