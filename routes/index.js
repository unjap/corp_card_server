const express = require('express');
const router = express.Router();

const sqlMapper = require('../database/sqlMapper');

// 사용내역 가져오기
router.get('/getList', function(req, res, next) {
  console.log('routes /getList');

  sqlMapper.getList(function(queryResult) {
    res.send(queryResult);
  });
});

module.exports = router;
