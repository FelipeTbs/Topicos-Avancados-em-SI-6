const net = require('net');  //core do node

let sockets = [];  //lista dos clients

const server = net.createServer(socket => {

    sockets.push(socket);
    console.log('Usuario conectado.');
    
    socket.on('data', data => {
        broadcast(data, socket);
    });

    socket.on('error', err => {
        console.log('O usuario desconectou. Erro: ' + err);
    });

    socket.on('close', () => {
        console.log("O usuario deixou o chat.");
    });

});

server.listen(4000);

function broadcast(message, socketSent) {
    if (message === 'end') {
        const index = sockets.indexOf(socketSent);  //procura o index do socket que mandou a mensagem end
        sockets.splice(index, 1);  //remove socket que mandou mensagem end da lista de sockets
    } else {
        sockets.forEach(socket => {
            if (socket !== socketSent) socket.write(message);  //envia para todos a mensagem do usuario, mesnos para si mesmo
        });
    }
}