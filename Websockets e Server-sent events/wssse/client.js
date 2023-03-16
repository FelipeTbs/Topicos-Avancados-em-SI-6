const socket = new WebSocket('ws://localhost:8080');
const reader = new FileReader();
const output = document.getElementById('output');
const nickInput = document.getElementById('nick');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

socket.addEventListener('open', (event) => {
    console.log('Conectado ao servidor');
});

socket.addEventListener('message', async (event) => {
    //console.log(event.data); DEBUG
    const data = JSON.parse(event.data);
    const nick = data.nick;
    const message = data.message;
    const messageElement = document.createElement('p');
    messageElement.textContent = `${nick}: ${message}`;
    //console.log(message); DEBUG
    output.appendChild(messageElement);
});

sendButton.addEventListener('click', (event) => {
    const nick = nickInput.value;
    const message = messageInput.value;
    const data = { nick, message };
    console.log(data);
    socket.send(JSON.stringify(data));
    messageInput.value = '';
    });

socket.addEventListener('close', (event) => {
    console.log('Desconectado do servidor');
});