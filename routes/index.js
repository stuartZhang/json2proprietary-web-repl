const express = require('express');
const {render, safe} = require('../utils');
const tpsConnect = require('lbs-connect-driver');
const router = module.exports = express.Router();
/* GET home page. */
router.get('/', render('index', {title: 'Express'}));
router.route('/lbs-api-repl').get(render('lbs_api_repl')).post(safe(async (req, res) => {
  const {iden, payload} = req.body;
  if (iden && payload) {
    const response = await tpsConnect(iden, payload);
    res.json(response);
  } else {
    throw new Error(`Miss parameter: ${JSON.stringify(req.body, null, 2)}`);
  }
}));
