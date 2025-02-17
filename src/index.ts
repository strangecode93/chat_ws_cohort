import { WebSocket, WebSocketServer } from "ws";

const ws = new WebSocketServer({port: 8080});

let usercount = 0;
let allsocket: WebSocket[] = [];

ws.on("connection", (socket) => {
    allsocket.push(socket);

    usercount = usercount+1;
    console.log("active users : " + usercount);

    socket.on("message", (message) => {
        console.log("message received: " + message.toString());
        for(let i = 0; i < allsocket.length; i++){
            allsocket[i].send(message.toString() + ": sent to the server");
        }
    });
});