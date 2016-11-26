/**
 * Author: LLQ
 */

var http = require('http');
var exec = require('child_process').exec;
var path = require('path').resolve();
var extend = require('util')._extend;

var init = function(opt) {
  var config = {
    path: '',
    cmd: '',
    project: null,
    port: 8080,
    events: ['push'],
    origin: ['github', 'gitlab', 'coding'],
  };
  extend(config, opt);

  var server = http.createServer((req, res) => {
    console.log('req.url:', req.url);
    var req_path = req.url.split('?').shift();
    var project_path = '/';
    var project_cmd = '';

    if (config.project) {
      var projects = config.project;
      for(var i in projects) {
        console.log(req_path, projects[i].path, req_path === projects[i].path);
        if(req_path === projects[i].path) {
          project_path = projects[i].path;
          project_cmd = projects[i].cmd;
          break;
        }
      }
    } else {
      project_path = config.path;
      project_cmd = config.cmd;
    }

    console.log('[' + new Date() + ']');
    console.log(project_path, project_cmd);


    if (req_path !== project_path) {
      var result = {result: 'fail wrong path: [' + project_path + ']'};
      res.end(JSON.stringify(result));
    }else {
      exec(project_cmd, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });
      var result = {result: 'success'};
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(result));
    }
  });

  server.listen(config.port);
  if(config.project) {
    for(var i in config.project) {
      console.log('webhook start at localhost:' + config.port + config.project[i].path);
    }
  } else {
    console.log('webhook start at localhost:' + config.port + config.path);
  }
};

var config = require('./config');

init(config);
