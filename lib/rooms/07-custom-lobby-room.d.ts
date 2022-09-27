import { Client, LobbyRoom } from "colyseus";
export declare class CustomLobbyRoom extends LobbyRoom {
    onCreate(options: any): Promise<void>;
    onJoin(client: Client, options: any): void;
    onLeave(client: any): void;
}
