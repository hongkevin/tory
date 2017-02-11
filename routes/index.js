var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send', function(req, res, next) {
  res.render('send', { title: '카카오톡 파일'});
});

router.post('/send', upload.single('file'), function(req, res, next) {
  console.log(req.file);
  console.log(req.body.option);
  res.send('good job');
});

module.exports = router;
