const WebSocket = require('ws');
const http = require("http");
const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set();

http.createServer(function(req,res){
    res.writeHeader(200, {"Content-Type":"text/event-stream"
    , "Cache-Control":"no-cache"
    , "Connection":"keep-alive"
    , "Access-Control-Allow-Origin": "*"});
    var interval = setInterval( function() {
    res.write("data: " + randomInt(100,127) + "\n\n");
    },2000);
    }).listen(9090);

wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');
  clients.add(ws);


  ws.on('message', (message) => {
    const data = JSON.parse(message);
    //console.log(`Mensagem recebida: ${data.message}`); DEBUG
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        const messageToSend = JSON.stringify({
            nick: data.nick,
            message: data.message,
        });
        client.send(messageToSend);
      }
    });
  });
  ws.on('close', () => {
    console.log('Cliente desconectado');
    clients.delete(ws);
  });
});