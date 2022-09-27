import { Room, Client } from "colyseus";
export declare class ReconnectionRoom extends Room {
    onCreate(options: any): void;
    onJoin(client: Client, options: any, auth: any): void;
    onLeave(client: Client, consented?: boolean): Promise<void>;
    onDispose(): void;
}
