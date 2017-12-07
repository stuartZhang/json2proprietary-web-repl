const express = require('express');
const tpsConnect = require('lbs-connect-driver');
const _ = require('underscore');
const {render, safe} = require('../utils');
const router = module.exports = express.Router();
/* GET home page. */
router.get('/', render('index', {'title': 'Express'}));
router.route('/lbs-api-repl').get(render('lbs_api_repl', {'title': 'NavServer Interface'})).post(safe(async (req, res) => {
  const {iden, payload} = req.body;
  if (iden && payload) {
    const response = await tpsConnect(_.extendOwn(iden, {
      'ip-address': req.ip == null ? undefined : req.ip.replace(/^:+ffff:+/, '')
    }), payload);
    res.json(response);
  } else {
    throw new Error(`Miss parameter: ${JSON.stringify(req.body, null, 2)}`);
  }
}));
