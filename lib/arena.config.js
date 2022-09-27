"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arena_1 = __importDefault(require("@colyseus/arena"));
const monitor_1 = require("@colyseus/monitor");
const path_1 = __importDefault(require("path"));
const serve_index_1 = __importDefault(require("serve-index"));
const express_1 = __importDefault(require("express"));
// import { uWebSocketsTransport} from "@colyseus/uwebsockets-transport";
// Import demo room handlers
const colyseus_1 = require("colyseus");
const _01_chat_room_1 = require("./rooms/01-chat-room");
const _02_state_handler_1 = require("./rooms/02-state-handler");
const _03_auth_1 = require("./rooms/03-auth");
const _04_reconnection_1 = require("./rooms/04-reconnection");
const _07_custom_lobby_room_1 = require("./rooms/07-custom-lobby-room");
exports.default = arena_1.default({
    getId: () => "Your Colyseus App",
    // initializeTransport: (options) => new uWebSocketsTransport(options),
    initializeGameServer: (gameServer) => {
        // Define "lobby" room
        gameServer.define("lobby", colyseus_1.LobbyRoom);
        // Define "relay" room
        gameServer.define("relay", colyseus_1.RelayRoom, { maxClients: 4 })
            .enableRealtimeListing();
        // Define "chat" room
        gameServer.define("chat", _01_chat_room_1.ChatRoom)
            .enableRealtimeListing();
        // Register ChatRoom with initial options, as "chat_with_options"
        // onInit(options) will receive client join options + options registered here.
        gameServer.define("chat_with_options", _01_chat_room_1.ChatRoom, {
            custom_options: "you can use me on Room#onCreate"
        });
        // Define "state_handler" room
        gameServer.define("state_handler", _02_state_handler_1.StateHandlerRoom)
            .enableRealtimeListing();
        // Define "auth" room
        gameServer.define("auth", _03_auth_1.AuthRoom)
            .enableRealtimeListing();
        // Define "reconnection" room
        gameServer.define("reconnection", _04_reconnection_1.ReconnectionRoom)
            .enableRealtimeListing();
        // Define "custom_lobby" room
        gameServer.define("custom_lobby", _07_custom_lobby_room_1.CustomLobbyRoom);
        gameServer.onShutdown(function () {
            console.log(`game server is going down.`);
        });
    },
    initializeExpress: (app) => {
        app.use('/', serve_index_1.default(path_1.default.join(__dirname, "static"), { 'icons': true }));
        app.use('/', express_1.default.static(path_1.default.join(__dirname, "static")));
        // app.use(serveIndex(path.join(__dirname, "static"), {'icons': true}))
        // app.use(express.static(path.join(__dirname, "static")));
        // (optional) attach web monitoring panel
        app.use('/colyseus', monitor_1.monitor());
    },
    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
