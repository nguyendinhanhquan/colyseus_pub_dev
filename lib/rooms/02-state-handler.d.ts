import { Room, Client } from "colyseus";
import { Schema, MapSchema } from "@colyseus/schema";
export declare class Player extends Schema {
    x: number;
    y: number;
}
export declare class State extends Schema {
    players: MapSchema<Player, string>;
    something: string;
    createPlayer(sessionId: string): void;
    removePlayer(sessionId: string): void;
    movePlayer(sessionId: string, movement: any): void;
}
export declare class StateHandlerRoom extends Room<State> {
    maxClients: number;
    onCreate(options: any): void;
    onAuth(client: any, options: any, req: any): boolean;
    onJoin(client: Client): void;
    onLeave(client: any): void;
    onDispose(): void;
}
