const WebSocket = require('ws'); const server = new WebSocket.Server({ port: 8080 });

function startMultiplayer() {
    if (!isConnected) {
        socket = new WebSocket('linkvandewebsite');

        socket.addEventListener('open', (event) => {
            console.log('Connection established with Websocket');
            isConnected = true;
            sendJoinMessage();
        });
    }
}