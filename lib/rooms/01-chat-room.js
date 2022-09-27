"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoom = void 0;
const colyseus_1 = require("colyseus");
class ChatRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        // this room supports only 4 clients connected
        this.maxClients = 4;
    }
    onCreate(options) {
        console.log("ChatRoom created!", options);
        this.onMessage("message", (client, message) => {
            console.log("ChatRoom received message from", client.sessionId, ":", message);
            this.broadcast("messages", `(${client.sessionId}) ${message}`);
        });
    }
    onJoin(client) {
        this.broadcast("messages", `${client.sessionId} joined.`);
    }
    onLeave(client) {
        this.broadcast("messages", `${client.sessionId} left.`);
    }
    onDispose() {
        console.log("Dispose ChatRoom");
    }
}
exports.ChatRoom = ChatRoom;
