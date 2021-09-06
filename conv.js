
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

fs.writeFileSync('log.txt','다운로드 가능','utf8');
const audiofile = 'file';
if (fs.existsSync(audiofile)) {
  fs.readdirSync(audiofile).forEach((f) => {
    fs.unlinkSync(`${audiofile}/${f}`);
  });
} else {
  fs.mkdirSync(audiofile);
}

module.exports = async function(res, id = new String, text = new String) {
  let stream = ytdl(id, {
    quality: 'highestaudio'
  });
  
  let start = Date.now();
  ffmpeg(stream).audioBitrate(128).save(`file/${text}.mp3`).on('progress', async (p) => {
    fs.writeFileSync('log.txt',`${text} 다운로드중`,'utf8');
  }).on('end', () => {
    console.log(`다운로드 완료 - ${(Date.now() - start) / 1000}초 걸림`);
    fs.writeFileSync('log.txt',`다운로드 완료 - ${(Date.now() - start) / 1000}초 걸림`,'utf8');
    res.status(200).redirect(`file/file/${text}.mp3`);
    return setTimeout(() => {
      return fs.writeFileSync('log.txt', `다운로드 가능`, 'utf8');
    }, 1000);
  }).on('error', (err) => {
    fs.writeFileSync('log.txt', `영상을 다운로드 할수없습니다.`, 'utf8');
    return res.status(404).send('<script>window.location="/"</script>');
  });
}

function err(res, text = new String) {
  return res.status(404).render('err', {
    title: '유튜브 영상 MP3 변환 ERROR',
    dec: '유튜브 영상 MP3 변환 사이트',
    domain: process.env.DOMAIN,
    url: `http://${process.env.DOMAIN}`,
    err: text
  });
}