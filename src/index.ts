import { WebSocket, WebSocketServer } from "ws";

const ws = new WebSocketServer({port: 8080});

interface User {
    socket: WebSocket,
    room: string
}

let allsocket: User[] = [];

ws.on("connection", (socket) => {

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        if(parsedMessage.type === "join"){
            console.log("User joined: " + parsedMessage.payload.roomId);
            allsocket.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type === "chat"){
            console.log("user wants to chat");
            const currentUserRoom = allsocket.find((user) => user.socket === socket)?.room
            for(let i = 0; i < allsocket.length; i++){
                if(allsocket[i].room == currentUserRoom){
                    allsocket[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
        
    });
});