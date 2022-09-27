import { Schema, MapSchema } from "@colyseus/schema";
export declare class PlayerState extends Schema {
    x: number;
    y: number;
}
export declare class RoomState extends Schema {
    players: MapSchema<PlayerState, string>;
    something: string;
    createPlayer(sessionId: string): void;
    removePlayer(sessionId: string): void;
    movePlayer(sessionId: string, movement: any): void;
}
