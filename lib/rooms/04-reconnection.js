"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReconnectionRoom = void 0;
const colyseus_1 = require("colyseus");
class ReconnectionRoom extends colyseus_1.Room {
    onCreate(options) {
    }
    onJoin(client, options, auth) {
        client.send("status", "Welcome!");
    }
    onLeave(client, consented) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(client.sessionId, "left", { consented });
            try {
                if (consented) {
                    /*
                     * Optional:
                     * you may want to allow reconnection if the client manually closed the connection.
                     */
                    throw new Error("left_manually");
                }
                yield this.allowReconnection(client, 60);
                console.log("Reconnected!");
                client.send("status", "Welcome back!");
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    onDispose() {
    }
}
exports.ReconnectionRoom = ReconnectionRoom;
