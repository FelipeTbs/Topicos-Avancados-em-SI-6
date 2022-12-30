const net = require('net');  //core do node

const readLine = require('readline').createInterface({  //criação da interface
    input: process.stdin,
    output: process.stdout
});

const waitForUsername = new Promise(resolve => {
    readLine.question('Digite seu nome de usuário: ', answer => { //funçao anonima para obter o nome do usuario
        resolve(answer);
    });
});

waitForUsername.then((username) => {    //utilizando o nome adquirido na função anonima

    const socket = net.connect({    //porta pre-definida
        port: 4000
    });

    readLine.on('line', data => {
        if (data === 'end') {       //desconectando do chat
            socket.write(`${username} deixou o chat.`);
            socket.setTimeout(1000);
        } else {
            socket.write(username + ': ' + data);   //escrevendo no chat
        }
    });

    socket.on('connect', () => {
        socket.write(username + ' juntou-se ao chat.');     //mensagem ao entrar no chat
    });

    socket.on('data', data => {
        console.log('\x1b[33m%s\x1b[0m', data);     //muda a cor da mensagem para identificar o que está sendo recebido do que está sendo escrito
    });

    socket.on('timeout', () => {        //sai do chat por inatividade
        socket.write('end');
        socket.end();
    });

    socket.on('end', () => {        //encerrando processo
        process.exit();
    });

    socket.on('error', () => {         //erro de resposta do servidor
        console.log('O servidor está offline');
    });
});