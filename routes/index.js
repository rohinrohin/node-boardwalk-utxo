var express = require('express');
var router = express.Router();
var balance = require("../lib/balance")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* GET home page. */
router.post('/api/balance', function (req, res, next) {
  console.log(req.body);
  balance.getBalance(req.body.username, req.body.password, req.body.group_no,
    function (err, response) {
      console.log("asdasd" + JSON.stringify(response));
      if (err == "Unauthorized") {
        console.log("No auth.")
        return res.status(403).send({});
      }
      res.status(200).json(response)
    });
});

module.exports = router;