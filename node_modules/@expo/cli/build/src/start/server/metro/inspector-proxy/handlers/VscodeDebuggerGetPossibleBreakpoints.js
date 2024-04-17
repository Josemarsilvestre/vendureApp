"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _utils = require("./utils");
class VscodeDebuggerGetPossibleBreakpointsHandler {
    onDebuggerMessage(message, { socket , debuggerType  }) {
        if (debuggerType === "vscode" && message.method === "Debugger.getPossibleBreakpoints") {
            return (0, _utils).respond(socket, {
                id: message.id,
                result: {
                    locations: []
                }
            });
        }
        return false;
    }
}
exports.VscodeDebuggerGetPossibleBreakpointsHandler = VscodeDebuggerGetPossibleBreakpointsHandler;

//# sourceMappingURL=VscodeDebuggerGetPossibleBreakpoints.js.map