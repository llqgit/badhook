/**
 * Author: LLQ
 * Lately: 2017-04-07
 */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer')();
var exec = require('child_process').exec;
var path = require('path').resolve();
var extend = require('util')._extend;
var app = express();
var config = require('./config');

app.use(multer.array()); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var opt = extend({
  path: '',
  cmd: '',
  project: null,
  port: 8080,
  password: '',
  events: ['push'],
  origin: ['github', 'gitlab', 'coding'],
}, config);

// listen hook path
var listenHook = function(path, cmd) {
  app.post(path, function (req, res, next) {
    var body = req.body;
    var result = '';
    if(opt.password && body.password !== opt.password) {
      result = 'password not right';
    } else {
      exec(cmd, function(err, stdout, stderr) {
        console.info('[' + new Date() + ']');
        console.info(stdout);
        console.error(stderr);
      });
      result = 'success';
    }
    res.json({ result: result });
  });
}

// init hook listener
if (opt.project) {
  var projects = opt.project;
  for(var i in projects) {
    listenHook(projects[i].path, projects[i].cmd);
  }
} else {
  listenHook(opt.path, opt.cmd);
}

app.listen(opt.port);
console.info('[' + new Date() + '] Server start at [' + opt.port + ']');
