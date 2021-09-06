
require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs');
const tt = require('../conv');

// 메인 시작
router.get('/', async (req, res) => {
  return res.status(200).render('main', {
    title: '유튜브 영상 MP3 변환',
    dec: '유튜브 영상 MP3 변환 사이트',
    domain: process.env.DOMAIN,
    url: `http://${process.env.DOMAIN}`
  });
});
router.post('/', async (req, res) => {
  const url = req.body.url || null;
  const text = req.body.text || null;
  console.log(`${text} 다운로드중`);
  fs.writeFileSync('log.txt',`${text} 다운로드중`,'utf8');
  tt(res, url, text);
});
// 메인 끝

module.exports = router;
