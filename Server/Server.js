var http = require('http');
var Connection = require('./Connection');

var conn = new Connection();

http.createServer(function (req, res) {
  if (req.method == 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    conn.GetUsers().then((results) => {
      var json = JSON.stringify(results);
      res.end(json);
    }).catch((err) => {
      console.log("Promise rejection error: " + err);
      res.end("<h1>ERROR</h1>")
    })
  }
}).listen(3001);