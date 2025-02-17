"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 8080 });
let usercount = 0;
let allsocket = [];
ws.on("connection", (socket) => {
    allsocket.push(socket);
    usercount = usercount + 1;
    console.log("active users : " + usercount);
    socket.on("message", (message) => {
        console.log("message received: " + message.toString());
        for (let i = 0; i < allsocket.length; i++) {
            allsocket[i].send(message.toString() + ": sent to the server");
        }
    });
});
