"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomState = exports.PlayerState = void 0;
const schema_1 = require("@colyseus/schema");
class PlayerState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.x = Math.floor(Math.random() * 400);
        this.y = Math.floor(Math.random() * 400);
    }
}
__decorate([
    schema_1.type("number")
], PlayerState.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], PlayerState.prototype, "y", void 0);
exports.PlayerState = PlayerState;
class RoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.something = "This attribute won't be sent to the client-side";
    }
    createPlayer(sessionId) {
        this.players.set(sessionId, new PlayerState());
    }
    removePlayer(sessionId) {
        this.players.delete(sessionId);
    }
    movePlayer(sessionId, movement) {
        if (movement.x) {
            this.players.get(sessionId).x += movement.x * 10;
        }
        else if (movement.y) {
            this.players.get(sessionId).y += movement.y * 10;
        }
    }
}
__decorate([
    schema_1.type({ map: PlayerState })
], RoomState.prototype, "players", void 0);
exports.RoomState = RoomState;
