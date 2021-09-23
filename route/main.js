
require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs');
const conv = require('../conv');

const checkyturl = /(?:https?:\/\/)?(?:www\.|music\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
const checkytid = /(?:https?:\/\/)?(?:www\.|music\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?/gi;

// 메인 시작
router.get('/', async (req, res) => {
  return res.status(200).render('main', {
    title: '유튜브 영상 MP3 변환',
    dec: '유튜브 영상 MP3 변환 사이트',
    domain: process.env.DOMAIN,
    url: `http://${process.env.DOMAIN}`,
    time: process.env.LOADTIME || 500
  });
});
router.post('/', async (req, res) => {
  let url = req.body.url || '';
  let text = req.body.text || '';
  text = text.split('\r\n');
  console.log(url);
  if (url.match(checkyturl)) {
    url = url.replace(checkytid, '').replace(/&.+/gi, '').split('\r\n');
    if (url) {
      for (i in url) {
        console.log(text[i], url[i]);
        console.log(`${text[i]} 다운로드중`);
        fs.writeFileSync('log.txt',`${text[i]} 다운로드중`,'utf8');
        await conv(url[i], text[i]);
      }
    }
  } else {
    fs.writeFileSync('log.txt',`유튜브 주소를 찾을수 없습니다.`,'utf8');
    res.status(200).send('<script>window.location="/"</script>');
  }
});
// 메인 끝

module.exports = router;
