const mysql = require('mysql');

const db = mysql.createConnection({
    host: '114.202.216.45',
    post: 3306,
    user: 'iptvteam',
    password: 'open1404',
    database: 'corp',
    dateStrings: 'date'
});

function handleDisconnect() {
    db.connect(function(err) {
        if(err) {
            console.log('error when connection to db: ', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    db.on('error', function(err) {
        console.log('db error ', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            return handleDisconnect();
        } else {
            throw err;
        }
    })
}

handleDisconnect()

module.exports = db;