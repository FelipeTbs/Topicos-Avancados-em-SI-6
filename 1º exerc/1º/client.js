const net = require('net')  //core do node
const readline = require('readline')  //core do node

const client = new net.Socket()
const texto = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

client.connect(4000, '127.0.0.1', () => {
    console.log('conectou')
    texto.addListener('line', line => {
        client.write(line)
    })
    client.on('data', data => {
        const str = data.toString()
        if(str == 'end'){
            socket.end()
        }
        else{
            console.log(str)
        }
    })
})
