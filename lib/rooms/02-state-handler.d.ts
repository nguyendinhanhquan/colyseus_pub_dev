import { Room, Client } from "colyseus";
import { RoomState } from "./schema/schema_state";
export declare class StateHandlerRoom extends Room<RoomState> {
    maxClients: number;
    onCreate(options: any): void;
    onAuth(client: any, options: any, req: any): boolean;
    onJoin(client: Client): void;
    onLeave(client: any): void;
    onDispose(): void;
}
