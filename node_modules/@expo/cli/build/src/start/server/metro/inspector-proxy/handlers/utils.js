"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.respond = respond;
function respond(socket, message) {
    socket.send(JSON.stringify(message));
    return true;
}

//# sourceMappingURL=utils.js.map