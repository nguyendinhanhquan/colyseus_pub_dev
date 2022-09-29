import { Room, Client } from "colyseus";
import { Schema, Context, MapSchema } from "@colyseus/schema";

const type = Context.create();

export class Player extends Schema {
    @type("number")
    x = 0.0;

    @type("number")
    y = 0.0;
}

export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();

    something = "This attribute won't be sent to the client-side";


    createPlayer(sessionId: string) {
        this.players.set(sessionId, new Player());
    }

    removePlayer(sessionId: string) {
        this.players.delete(sessionId);
    }

    movePlayer(sessionId: string, movement: any) {
        console.log("===> AQ 🥕  => movePlayer => movement", movement)
        console.log("===> AQ 🥕  => movePlayer => sessionId", sessionId)
        this.players.get(sessionId).x = movement.x;
        this.players.get(sessionId).y = movement.y;
    }
}

export class StateHandlerRoom extends Room<State> {
    maxClients = 4;

    onCreate(options) {
        console.log("StateHandlerRoom created!", options);

        this.setState(new State());

        this.onMessage("move", (client, data) => {
            console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
            this.state.movePlayer(client.sessionId, data);
        });
    }

    onAuth(client, options, req) {
        return true;
    }

    onJoin(client: Client) {
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