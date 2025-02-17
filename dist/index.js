"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 8080 });
let allsocket = [];
ws.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            allsocket.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") {
            const currentUserRoom = (_a = allsocket.find((user) => user.socket === socket)) === null || _a === void 0 ? void 0 : _a.room;
            for (let i = 0; i < allsocket.length; i++) {
                if (allsocket[i].room == currentUserRoom) {
                    allsocket[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
