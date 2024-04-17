"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logMetroErrorWithStack = logMetroErrorWithStack;
exports.logMetroError = logMetroError;
exports.logFromError = logFromError;
exports.logMetroErrorAsync = logMetroErrorAsync;
exports.getErrorOverlayHtmlAsync = getErrorOverlayHtmlAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var _terminalLink = _interopRequireDefault(require("terminal-link"));
var _log = require("../../../log");
var _getStaticRenderFunctions = require("../getStaticRenderFunctions");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function logMetroErrorWithStack(projectRoot, { stack , codeFrame , error  }) {
    const { getStackFormattedLocation  } = require((0, _resolveFrom).default(projectRoot, "@expo/metro-runtime/symbolicate"));
    _log.Log.log();
    _log.Log.log(_chalk.default.red("Metro error: ") + error.message);
    _log.Log.log();
    if (codeFrame) {
        _log.Log.log(codeFrame.content);
    }
    if (stack == null ? void 0 : stack.length) {
        _log.Log.log();
        _log.Log.log(_chalk.default.bold`Call Stack`);
        const stackProps = stack.map((frame)=>{
            return {
                title: frame.methodName,
                subtitle: getStackFormattedLocation(projectRoot, frame),
                collapse: frame.collapse
            };
        });
        stackProps.forEach((frame)=>{
            const position = _terminalLink.default.isSupported ? (0, _terminalLink).default(frame.subtitle, frame.subtitle) : frame.subtitle;
            let lineItem = _chalk.default.gray(`  ${frame.title} (${position})`);
            if (frame.collapse) {
                lineItem = _chalk.default.dim(lineItem);
            }
            _log.Log.log(lineItem);
        });
    } else {
        _log.Log.log(_chalk.default.gray(`  ${error.stack}`));
    }
}
async function logMetroError(projectRoot, { error  }) {
    var ref, ref1;
    const { LogBoxLog , parseErrorStack  } = require((0, _resolveFrom).default(projectRoot, "@expo/metro-runtime/symbolicate"));
    const stack = parseErrorStack(error.stack);
    const log = new LogBoxLog({
        level: "static",
        message: {
            content: error.message,
            substitutions: []
        },
        isComponentError: false,
        stack,
        category: "static",
        componentStack: []
    });
    await new Promise((res)=>log.symbolicate("stack", res)
    );
    var ref2;
    logMetroErrorWithStack(projectRoot, {
        stack: (ref2 = (ref = log.symbolicated) == null ? void 0 : (ref1 = ref.stack) == null ? void 0 : ref1.stack) != null ? ref2 : [],
        codeFrame: log.codeFrame,
        error
    });
}
function logFromError({ error , projectRoot  }) {
    const { LogBoxLog , parseErrorStack  } = require((0, _resolveFrom).default(projectRoot, "@expo/metro-runtime/symbolicate"));
    const stack = parseErrorStack(error.stack);
    return new LogBoxLog({
        level: "static",
        message: {
            content: error.message,
            substitutions: []
        },
        isComponentError: false,
        stack,
        category: "static",
        componentStack: []
    });
}
async function logMetroErrorAsync({ error , projectRoot  }) {
    var ref, ref3;
    const log = logFromError({
        projectRoot,
        error
    });
    await new Promise((res)=>log.symbolicate("stack", res)
    );
    var ref4;
    logMetroErrorWithStack(projectRoot, {
        stack: (ref4 = (ref = log.symbolicated) == null ? void 0 : (ref3 = ref.stack) == null ? void 0 : ref3.stack) != null ? ref4 : [],
        codeFrame: log.codeFrame,
        error
    });
}
async function getErrorOverlayHtmlAsync({ error , projectRoot  }) {
    var ref, ref5;
    const log = logFromError({
        projectRoot,
        error
    });
    await new Promise((res)=>log.symbolicate("stack", res)
    );
    var ref6;
    logMetroErrorWithStack(projectRoot, {
        stack: (ref6 = (ref = log.symbolicated) == null ? void 0 : (ref5 = ref.stack) == null ? void 0 : ref5.stack) != null ? ref6 : [],
        codeFrame: log.codeFrame,
        error
    });
    const logBoxContext = {
        selectedLogIndex: 0,
        isDisabled: false,
        logs: [
            log
        ]
    };
    const html = `<html><head><style>#root,body,html{height:100%}body{overflow:hidden}#root{display:flex}</style></head><body><div id="root"></div><script id="_expo-static-error" type="application/json">${JSON.stringify(logBoxContext)}</script></body></html>`;
    const errorOverlayEntry = await (0, _getStaticRenderFunctions).createMetroEndpointAsync(projectRoot, // Keep the URL relative
    "", (0, _resolveFrom).default(projectRoot, "expo-router/_error"), {
        dev: true,
        platform: "web",
        minify: false,
        environment: "node"
    });
    const htmlWithJs = html.replace("</body>", `<script src=${errorOverlayEntry}></script></body>`);
    return htmlWithJs;
}

//# sourceMappingURL=metroErrorInterface.js.map