const express = require('express');
const tpsConnect = require('lbs-connect-driver');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/lbs-api-repl').get((req, res) => {
  res.render('lbs_api_repl');
}).post(async (req, res, next) => {
  try {
    if (req.body.iden && req.body.payload) {
      const response = await tpsConnect(req.body.iden, req.body.payload);
      res.json(response);
    } else {
      throw new Error(`Miss parameter: ${JSON.stringify(req.body, null, 2)}`);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
