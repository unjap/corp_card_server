const mysqlDB = require('./mysqlDB');

module.exports = class sqlMapper {
  // 사용 내역 가져오기
  static getList(callback) {
    let result = null;

    mysqlDB.query('select * from corp.list', function (err, rows, fields) {
      if (!err) {
        console.log(rows);
        result = rows;
      } else {
        console.log('query error : ' + err);
        result = err;
      }

      return callback(result);
    });
  }
}