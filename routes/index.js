const express = require('express');
const router = express.Router();

const sqlMapper = require('../database/sqlMapper');

// 법인카드 한도 및 잔액 저장하기
router.post('/setTotal', function(req, res) {
  console.log('routes /setTotal');
  const balance = req.body.balance;
  console.log('balance : ', balance);
  sqlMapper.setBalance(balance, function(queryResult) {
    res.send(queryResult);
  });
});

// 법인카드 한도 변경하기 (한도 변경 금액에 따른 잔액 변경도 된다)
router.post('/updateLimit', function(req, res) {
  console.log('routes /updateLimit');
  const params = req.body.params;
  sqlMapper.updateLimit(params, function(queryResult) {
    res.send(queryResult);
  });
});

// 법인카드 잔액 변경하기
router.post('/updateTotal', function(req, res) {
  console.log('routes /updateTotal');
  const balance = req.body.balance;
  sqlMapper.updateBalance(balance, function(queryResult) {
    res.send(queryResult);
  });
});

// 법인카드 잔액 가져오기
router.get('/getTotal', function(req, res) {
  console.log('routes /getTotal');

  sqlMapper.getBalance(function(queryResult) {
    res.send(queryResult);
  });
});

// 사용내역 가져오기
router.get('/getList', function(req, res) {
  console.log('routes /getList');

  sqlMapper.getList(function(queryResult) {
    res.send(queryResult);
  });
});

// 사용내역 등록하기
router.post('/registUsage', function(req, res) {
  console.log('routes /registUsage');
  const params = req.body.params;

  sqlMapper.registUsage(params, function(queryResult) {
    res.send(queryResult);
  });
});

// 사용내역 삭제하기
router.post('/deleteUsage', function(req, res) {
  console.log('routes /deleteUsage');
  const params = req.body.params;

  sqlMapper.deleteUsage(params, function(queryResult) {
    res.send(queryResult);
  });
});

// 사용내역 수정하기
router.post('/editUsage', function(req, res) {
  console.log('routes /editUsage');
  const params = req.body.params;  

  sqlMapper.editUsage(params, function(queryResult) {
    res.send(queryResult);
  });
});


module.exports = router;
