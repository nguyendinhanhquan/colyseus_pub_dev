import { Room } from "colyseus";
export declare class ChatRoom extends Room {
    maxClients: number;
    onCreate(options: any): void;
    onJoin(client: any): void;
    onLeave(client: any): void;
    onDispose(): void;
}
