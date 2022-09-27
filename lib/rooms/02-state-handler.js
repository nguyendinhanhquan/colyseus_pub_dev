"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateHandlerRoom = void 0;
const colyseus_1 = require("colyseus");
const schema_state_1 = require("./schema/schema_state");
class StateHandlerRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 4;
    }
    onCreate(options) {
        console.log("StateHandlerRoom created! 123123", options);
        this.setState(new schema_state_1.RoomState());
        this.onMessage("move", (client, data) => {
            console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
            this.state.movePlayer(client.sessionId, data);
        });
    }
    onAuth(client, options, req) {
        return true;
    }
    onJoin(client) {
        client.send("hello", "world");
        this.state.createPlayer(client.sessionId);
    }
    onLeave(client) {
        this.state.removePlayer(client.sessionId);
    }
    onDispose() {
        console.log("Dispose StateHandlerRoom");
    }
}
exports.StateHandlerRoom = StateHandlerRoom;
