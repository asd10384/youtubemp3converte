
require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/log', async (req, res) => {
  let text = fs.readFileSync('log.txt', 'utf8');
  return res.send({text: text});
});

module.exports = router;