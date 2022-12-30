const { read } = require('fs')
const readline = require('readline')  //core do node
const net = require('net') //core do node, para comunicação socket

const texto = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const handleConnection = socket => {
    console.log('alguem se conectou')

    socket.on('error', () => {
        console.log('perda de conexão')
    })
    socket.on('end', () => {
        console.log('desconectou')
    })
    socket.on('data', data => {
        const str = data.toString()
        if(str == 'end'){
            socket.end()
        }
        else{
            console.log(str)
        }
    })
    texto.addListener('line', line => {
        socket.write(line)
    })
}

const server = net.createServer(handleConnection)

server.listen(4000, '127.0.0.1')