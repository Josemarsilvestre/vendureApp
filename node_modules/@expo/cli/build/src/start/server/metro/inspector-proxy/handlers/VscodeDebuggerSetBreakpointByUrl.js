"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class VscodeDebuggerSetBreakpointByUrlHandler {
    onDebuggerMessage(message, { debuggerType  }) {
        if (debuggerType === "vscode" && message.method === "Debugger.setBreakpointByUrl" && message.params.urlRegex) {
            // Explicitly force the breakpoint to be unbounded
            message.params.url = "file://__invalid_url__";
            delete message.params.urlRegex;
        }
        return false;
    }
}
exports.VscodeDebuggerSetBreakpointByUrlHandler = VscodeDebuggerSetBreakpointByUrlHandler;

//# sourceMappingURL=VscodeDebuggerSetBreakpointByUrl.js.map