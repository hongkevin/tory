'use strict'
var express = require('express');
var router = express.Router();
var waitUntil = require('wait-until');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage: storage });

var async = require('async');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send', function(req, res, next) {
  res.render('send', { title: '카카오톡 파일'});
});

// 파일형태변경 & 유틸리티 함수들
function ConvertCsvToJson(csvFilePath, callback) {
  var convertedData = {};
  var lineNum = 0;

  require('csvtojson')()
  .fromFile(csvFilePath)
  .on('json', function(jsonobj) {
    convertedData[lineNum++] = jsonobj;
  })
  .on('done', function(error) {
    callback(convertedData);
  });
}

function ConvertTextToJsonMobileIphone(textFilePath, callback) {
  var convertedData = {};
  var lineNum = 0;

  function IsDate(line) {
    if (line.includes('요일') &&
      line.includes('년') &&
      line.includes('월') &&
      line.includes('일')) {
      return true;
    }
    else if(!line.includes(',') &&
      line.includes('년') &&
      line.includes('월') &&
      line.includes('일')) {
      return true;
    }
    else {
      return false;
    }
  }

  function ExtractDate(line) {
    var rawDate = line.match(/\S+/g);
    var year = rawDate[0].slice(0, -1);
    var month = rawDate[1].slice(0, -1);
    var day = rawDate[2].slice(0, -1);

    month = ('0' + month).slice(-2);
    day = ('0' + day).slice(-2);

    return year + '-' + month + '-' + day;
  }


  function IsChat(line) {
    if (line.includes(',') && line.includes(' : ')) {
      return true;
    }
    else {
      return false;
    }
  }

  function ExtractUser(line) {
    var user = line.split(' :')[0].split(', ')[1];
    return user;
  }

  function ExtractTime(line) {
    var rawTime = line.split(', ')[0].split('. ')[3];

    if(typeof rawTime == 'undefined'){
      rawTime = line.split(',')[0].split('일 ')[1]
    }
    var hour = parseInt(rawTime.match(/\ (.*?)\:/));
    var minute = parseInt(rawTime.split(':')[1]);
    if (rawTime[2] == '후' && hour < 12) {
      hour += 12;
    }else if(rawTime[2] == '전' &&
      hour == 12){
      hour = 0;
    }
    hour = ('0' + hour).slice(-2);
    minute = ('0' + minute).slice(-2);

    return hour + ':' + minute;
  }

  function ExtractMessage(line) {
    var separator = ' : ';
    var start = line.indexOf(separator) + 3;
    var message = line.slice(start);
    return message;
  }

  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(textFilePath)
  });

  var date = '';

  lineReader
  .on('line', function(line) {
    var jsonobj = {};
    if (IsDate(line)) {
      date = ExtractDate(line);
    }
    else if (IsChat(line)) {
      try{
        jsonobj['Date'] = date + ' ' + ExtractTime(line);
        jsonobj['User'] = ExtractUser(line);
        jsonobj['Message'] = ExtractMessage(line);
        if(jsonobj['User']!='(알수없음)'){
          convertedData[lineNum++] = jsonobj;
        }
      }catch(err){


      }
    }

  })
  .on('close', function() {
    callback(convertedData);

    //console.log(convertedData);
  });

}

function ConvertTextToJson(textFilePath, callback) {
  var convertedData = {};
  var lineNum = 0;

  function IsDate(line) {
    if (line.includes('-------') &&
      line.includes('년') &&
      line.includes('월') &&
      line.includes('일')) {
      return true;
    }
    else {
      return false;
    }
  }

  function ExtractDate(line) {
    var rawDate = line.match(/\S+/g);
    var year = rawDate[1].slice(0, -1);
    var month = rawDate[2].slice(0, -1);
    var day = rawDate[3].slice(0, -1);

    month = ('0' + month).slice(-2);
    day = ('0' + day).slice(-2);

    return year + '-' + month + '-' + day;
  }

  function IsChat(line) {
    if (line[0] == '[') {
      return true;
    }
    else {
      return false;
    }
  }

  function ExtractUser(line) {
    var user = line.match(/\[(.*?)\]/g)[0];
    user = user.slice(1, -1);
    return user;
  }

  function ExtractTime(line) {
    var rawTime = line.match(/\[(.*?)\]/g)[1];
    var hour = parseInt(rawTime.match(/\ (.*?)\:/));
    var minute = parseInt(rawTime.split(':')[1]);
    if (rawTime[2] == '후' && hour < 12) {
      hour += 12;
    }else if(rawTime[2] == '전' &&
      hour == 12){
      hour = 0;
    }
    hour = ('0' + hour).slice(-2);
    minute = ('0' + minute).slice(-2);

    return hour + ':' + minute;
  }

  // !! Catastrophe will occur when user name contains '] '
  // also if the \n occur it will be ignored
  function ExtractMessage(line) {
    var separator = '] ';
    var start = line.indexOf(separator) + 1;
    var message = line.slice(line.indexOf(separator, start) + 2);
    return message;
  }

  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(textFilePath)
  });

  var date = '';
  var isValidText = false;
  var breakAll = false;
  var lcount = 0;
  lineReader
  .on('line', function(line) {
    lcount++;
    if(lcount <3){

      // Text files which exported by mobile are not supported yet
      if(lcount==2 && (line.includes('오후') || line.includes('오전'))){
        ConvertTextToJsonMobileIphone(textFilePath, callback);
        breakAll = true;
      }else{

      }
    }else if(!breakAll){
      var jsonobj = {};
      if (IsDate(line)) {
        date = ExtractDate(line);
      }
      else if (IsChat(line)) {
        jsonobj['Date'] = date + ' ' + ExtractTime(line);
        jsonobj['User'] = ExtractUser(line);
        jsonobj['Message'] = ExtractMessage(line);
        if(jsonobj['User']!='(알수없음)'){
          convertedData[lineNum++] = jsonobj;
        }
      }
    }
  })
  .on('close', function() {
    if(!breakAll){
      callback(convertedData);
    }
    //console.log(convertedData);
  });
}

function ConvertFileToJson(filepath, callback) {
  var mdate = Date.now().toString();
  var extension = filepath.slice(-3);
  if (extension == 'txt') {
    ConvertTextToJson(filepath, callback);
  }
  else if (extension == 'csv') {
    ConvertCsvToJson(filepath, callback);
  }else if(extension == 'zip') {
    var fs = require('fs');
    var unzip = require('unzip');
    fs.createReadStream(filepath)
    .pipe(unzip.Parse())
    .on('entry', function (entry) {
      var fileName = entry.path;
      var type = entry.type; // 'Directory' or 'File'
      var size = entry.size;
      console.log(mdate)
      entry.pipe(fs.createWriteStream(mdate+'.txt'));
    })
    .on('close',function(err){
      ConvertFileToJson(mdate+'.txt', callback)
      console.log('close');
    })

  }
  else {
    console.log('Incorrect file! (Must be .txt or .csv file)');
  }
}

function IsContainWord(str, words) {
  for (var i in words) {
    if (str.indexOf(words[i]) != -1) {
      return true;
    }
  }
  return false;
}

function SortResult(result){
  var sortable = [];
  for (var name in result){
    sortable.push([name, result[name]]);
  }
  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });
  return sortable;
}

function FindUserWithWords(jsonData, words) {
  var result = {};

  for (var i in jsonData) {
    var message = jsonData[i].Message;
    var userResult = result[jsonData[i].User];
    if(userResult == null){
      result[jsonData[i].User] = 0;
    }else if (IsContainWord(message, words)) {
      result[jsonData[i].User] = ++result[jsonData[i].User];
    }
  }
  var rank = SortResult(result);

  return rank;
}

// 토리 알고리즘
// 1. 미래돼지
function FindPiggyKing(jsonData){
  console.log('미래돼지');
  var words = ['배고','다이어트','다요트','맛있','존맛'];
  var rank = FindUserWithWords(jsonData, words);
  var array = [];
  for(var i in rank){
    array.push(rank[i]);
  }
  console.log(array);
  return array;
}

// 2. 욕쟁이
function FindFuckKing(jsonData) {
  console.log('욕쟁이');
  var words = ['씨발', '시발', '미친', 'ㅅㅂ', '꺼져'];
  var rank = FindUserWithWords(jsonData, words);
  var array = [];
  for (var i in rank) {
    array.push(rank[i]);
  }
  console.log(array);
  return array;
}

// 3. 인스타중독
function FindPhotoKing(jsonData) {
  console.log('사진공유왕');
  // 이 경우는 "사진"만 있어야 되므로 나중에 FindUserWithWords 에 세 번째 parameter 추가해서 진행
  var words = ['사진'];
  var rank = FindUserWithWords(jsonData, words);
  var array = [];
  for (var i in rank) {
    array.push(rank[i]);
  }
  console.log(array);
  return array;
}

// 4. 죄송장인
function FindSorryKing(jsonData){
  console.log('미안하니?');
  var words = ['죄송', 'ㅈㅅ', '미안', '미아뉴', '쏘리'];
  var rank = FindUserWithWords(jsonData, words);
  var array = [];
  for(var i in rank){
    array.push(rank[i]);
  }
  console.log(array);
  return array;
}

// 5. 맥스타터
function FindChatStarter(jsonData){
  FindChatLifer(jsonData, 'start');
}

// 6. 맥커터
function FindChatEnder(jsonData){
  FindChatLifer(jsonData, 'end');
}

function FindChatLifer(jsonData, delimiter){
  if(delimiter == 'end'){
    console.log('대화종결자');
  }else{
    console.log('대화스타터');
  }
  var curDate = 0;
  var prevDate = 0;
  var sum = 0;
  var count = 0;
  var result = {};

  // Used arithmetic mean. Smarter solution will be needed (if we have time)

  for(var i in jsonData){
    count++;
  }
  var tlen = count;

  for(var i in jsonData){
    prevDate = curDate;
    curDate = new Date(jsonData[i].Date);

    if(prevDate != 0 && Number.isInteger(curDate - prevDate)){
      sum += (curDate - prevDate)/tlen;
    }
  }
  var threshold = sum;

  for(var i in jsonData){
    var cur = i;
    if(i > 1 && delimiter == 'end') {
      cur = i - 1;
    }
    prevDate = curDate;
    curDate = new Date(jsonData[i].Date);
    if(prevDate != 0){
      var userResult = result[jsonData[i].User];
      if(userResult == null){
        result[jsonData[i].User] = 0;
      }else if (curDate - prevDate > threshold) {
        result[jsonData[cur].User] = ++result[jsonData[cur].User];
      }
    }
  }
  var rank = SortResult(result);
  var array = [];
  for(var i in rank){
    array.push(rank[i]);
  }
  console.log(array);
  return array;
}

// 7. 결정장애
function FindMakingDisorderKing(jsonData){
  console.log('결정장애');
  var words = ['?'];
  var rank = FindUserWithWords(jsonData, words);
  var array = [];
  for(var i in rank){
    array.push(rank[i]);
  }
  console.log(array);
  return array;
}

// 8. 공유왕
function FindSharingKing(jsonData){
  console.log('공유왕');
  var words = ['http', 'https'];
  var rank = FindUserWithWords(jsonData, words);
  var array = [];
  for(var i in rank){
    array.push(rank[i]);
  }
  console.log(array);
  return array;
}

router.post('/send', upload.single('file'), function(req, res, next) {

  var filePath = './' + req.file.path;
  var checkedOptions = req.body.option;
  console.log(checkedOptions);
  var checkedLength = checkedOptions.length;
  console.log(checkedLength);
  var counter = 0;
  var array = [];

  if (checkedOptions.indexOf('pig') != -1) {
    var a = ConvertFileToJson(filePath, FindPiggyKing)
    array.push(a);
  }
  if (checkedOptions.indexOf('fuck') != -1) {
    array.push(ConvertFileToJson(filePath, FindFuckKing));
  }
  if (checkedOptions.indexOf('photo') != -1) {
    array.push(ConvertFileToJson(filePath, FindPhotoKing));
  }
  if (checkedOptions.indexOf('sorry') != -1) {
    var a = ConvertFileToJson(filePath, FindSorryKing);
    array.push(a);
  }
  if (checkedOptions.indexOf('chat_start') != -1) {
    array.push(ConvertFileToJson(filePath, FindChatStarter));
  }
  if (checkedOptions.indexOf('chat_end') != -1) {
    array.push(ConvertFileToJson(filePath, FindChatEnder));
  }
  if (checkedOptions.indexOf('disorder') != -1) {
    array.push(ConvertFileToJson(filePath, FindMakingDisorderKing));
  }
  if (checkedOptions.indexOf('share') != -1) {
    array.push(ConvertFileToJson(filePath, FindSharingKing));
  }
  if (checkedOptions.indexOf('late') != -1) {
    array.push(ConvertFileToJson(filePath, FindSharingKing));
  }

  var a = function () {
    console.log('1:'+checkedLength);
    console.log('2:'+array.length);
    if (checkedLength == array.length) {
      console.log(array);
      res.send(array);
    }
  };

  setInterval(a, 1000);

});

module.exports = router;
