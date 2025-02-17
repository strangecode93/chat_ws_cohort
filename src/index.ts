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
            allsocket.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type === "chat"){
            const currentUserRoom = allsocket.find((user) => user.socket === socket)?.room
            
            for(let i = 0; i < allsocket.length; i++){
                if(allsocket[i].room == currentUserRoom){
                    allsocket[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
        
    });
});