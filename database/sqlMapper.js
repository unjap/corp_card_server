const mysqlDB = require('./mysqlDB');

let result = null;

module.exports = class sqlMapper {
  // 법인카드 잔액 Setting (초기 설정)
  static setBalance(balance, callback) {  
    mysqlDB.query('insert into total (balance, limitBalance) VALUES (?, ?)', [balance, balance], function (err, rows) {
      if (!err) {
        result = rows;
      } else {
        console.log('query error : ' + err);
        result = err;
      }

      return callback(result);
    });
  }

  // 법인카드 한도 변경하기 (한도 변경 금액에 따른 잔액 변경도 된다)
  static updateLimit(params, callback) {  
    mysqlDB.query('update total set balance=?, limitBalance=?', [params.balance, params.limitBalance], function (err, rows) {
      if (!err) {
        result = rows;
      } else {
        console.log('query error : ' + err);
        result = err;
      }

      return callback(result);
    });
  }

  // 법인카드 잔액 가져오기
  static getBalance(callback) { 
    mysqlDB.query('select balance, limitBalance from total', function (err, rows) {
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

  // 법인카드 잔액 Update
  static updateBalance(balance, callback) {  
    mysqlDB.query('update total set balance=?', [balance], function (err, rows) {
      if (!err) {
        result = rows;
      } else {
        console.log('query error : ' + err);
        result = err;
      }

      return callback(result);
    });
  }

  // 사용내역 가져오기
  static getList(callback) {
    mysqlDB.query('select * from list', function (err, rows) {
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

  // 사용내역 등록하기
  static registUsage(params, callback) {
    const insertSql = 'insert into list (amount, date, category, timeInMs, memo, usedDate, customer, purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const param = [
      params.amount, params.date, params.category, params.timeInMs, params.memo, params.usedDate, params.customer, params.purpose, 
    ];

    mysqlDB.query(insertSql, param, function (err, rows) {
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

  // 사용내역 삭제하기
  static deleteUsage(params, callback) {
    const deleteSql = 'delete from list where timeInMs=?';
    const param = [ params.timeInMs ];

    mysqlDB.query(deleteSql, param, function (err, rows) {
      if (!err) {
        result = rows;
      } else {
        console.log('query error : ' + err);
        result = err;
      }

      return callback(result);
    });
  }

  // 사용내역 수정하기
  static editUsage(params, callback) {
    const updateSql = `update list set ${params.columnName}=? where timeInMs=?`;
    const param = [ params.columnValue, params.timeInMs ];

    mysqlDB.query(updateSql, param, function (err, rows) {
      if (!err) {
        result = rows;
      } else {
        console.log('query error : ' + err);
        result = err;
      }

      return callback(result);
    });
  }
}