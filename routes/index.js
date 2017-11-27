const express = require('express');
const {render} = require('../utils');
const tpsConnect = require('lbs-connect-driver');
const router = module.exports = express.Router();
/* GET home page. */
router.get('/', render('index', {title: 'Express'}));
router.route('/lbs-api-repl').get(render('lbs_api_repl')).post(async (req, res, next) => {
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
