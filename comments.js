//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var comments = [];

//Create server
http.createServer(function (req, res) {
  //Get the current url
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;

  if (pathname === '/') {
    //Read the html file
    fs.readFile('./index.html', function (err, data) {
      if (err) {
        console.log(err);
        res.end('Error');
      } else {
        res.end(data);
      }
    });
  } else if (pathname === '/comments') {
    //Get the comments
    var data = JSON.stringify(comments);
    res.end(data);
  } else if (pathname === '/addComment') {
    //Get the data from the client
    var str = '';
    req.on('data', function (data) {
      str += data;
    });
    req.on('end', function () {
      var data = qs.parse(str);
      comments.push(data);
      res.end('success');
    });
  } else {
    //Read other files
    fs.readFile(path.join(__dirname, pathname), function (err, data) {
      if (err) {
        res.end('404');
      } else {
        res.end(data);
      }
    });
  }
}).listen(3000, function () {
  console.log('Server is running...');
});