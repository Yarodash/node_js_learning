var http = require('http');
var fs = require('fs')

var isFile = function(path){
    var flag = false;
    try {
        if (fs.existsSync(path))
        flag = true
    } catch {
        pass;
      }
    return flag
}

var server = http.createServer(function(req,res){
    console.log(req.url)
    if (req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
          var myReadStream = fs.createReadStream(__dirname+'/index.html', 'utf8');
            myReadStream.pipe(res);
    } else {
        if ( isFile(__dirname+req.url)) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            var myReadStream = fs.createReadStream(__dirname+req.url, 'utf8');
            myReadStream.pipe(res);
        } else {
            res.writeHead(404);
          }
    }

  //res.end('test');
});

server.listen(3000);

const WebSocket = require('ws');
const Server = new WebSocket.Server({port: 8080});

Server.on('connection', ws => {
    ws.on('message', message => {
        //console.log(message);
        Server.clients.forEach(client => {
        if (client != ws)
            client.send(message); })
        })

    ws.send(JSON.stringify('Connected'));
});
