"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runServer = void 0;
var _assert = _interopRequireDefault(require("assert"));
var _http = _interopRequireDefault(require("http"));
var _https = _interopRequireDefault(require("https"));
var _url = require("url");
var _env = require("../../../utils/env");
var _inspectorProxy = require("./inspector-proxy");
var _resolveFromProject = require("./resolveFromProject");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const runServer = async (metroBundler, config, { hasReducedPerformance =false , host , onError , onReady , secureServerOptions , waitForBundler =false , websocketEndpoints ={} , watch  })=>{
    const projectRoot = metroBundler.projectRoot;
    const Metro = (0, _resolveFromProject).importMetroFromProject(projectRoot);
    const createWebsocketServer = (0, _resolveFromProject).importMetroCreateWebsocketServerFromProject(projectRoot);
    const MetroHmrServer = (0, _resolveFromProject).importMetroHmrServerFromProject(projectRoot);
    // await earlyPortCheck(host, config.server.port);
    // if (secure != null || secureCert != null || secureKey != null) {
    //   // eslint-disable-next-line no-console
    //   console.warn(
    //     chalk.inverse.yellow.bold(' DEPRECATED '),
    //     'The `secure`, `secureCert`, and `secureKey` options are now deprecated. ' +
    //       'Please use the `secureServerOptions` object instead to pass options to ' +
    //       "Metro's https development server.",
    //   );
    // }
    const { middleware , end , metroServer  } = await Metro.createConnectMiddleware(config, {
        hasReducedPerformance,
        waitForBundler,
        watch
    });
    (0, _assert).default(typeof middleware.use === "function");
    const serverApp = middleware;
    let inspectorProxy = null;
    if (config.server.runInspectorProxy && !_env.env.EXPO_NO_INSPECTOR_PROXY) {
        inspectorProxy = (0, _inspectorProxy).createInspectorProxy(metroBundler, config.projectRoot);
    } else if (config.server.runInspectorProxy) {
        const { InspectorProxy  } = (0, _resolveFromProject).importMetroInspectorProxyFromProject(projectRoot);
        inspectorProxy = new InspectorProxy(config.projectRoot);
    }
    let httpServer;
    if (secureServerOptions != null) {
        httpServer = _https.default.createServer(secureServerOptions, serverApp);
    } else {
        httpServer = _http.default.createServer(serverApp);
    }
    return new Promise((resolve, reject)=>{
        httpServer.on("error", (error)=>{
            if (onError) {
                onError(error);
            }
            reject(error);
            end();
        });
        httpServer.listen(config.server.port, host, ()=>{
            if (onReady) {
                onReady(httpServer);
            }
            Object.assign(websocketEndpoints, {
                ...inspectorProxy ? {
                    ...inspectorProxy.createWebSocketListeners(httpServer)
                } : {},
                "/hot": createWebsocketServer({
                    websocketServer: new MetroHmrServer(metroServer.getBundler(), metroServer.getCreateModuleId(), config)
                })
            });
            httpServer.on("upgrade", (request, socket, head)=>{
                const { pathname  } = (0, _url).parse(request.url);
                if (pathname != null && websocketEndpoints[pathname]) {
                    websocketEndpoints[pathname].handleUpgrade(request, socket, head, (ws)=>{
                        websocketEndpoints[pathname].emit("connection", ws, request);
                    });
                } else {
                    socket.destroy();
                }
            });
            if (inspectorProxy) {
                // TODO(hypuk): Refactor inspectorProxy.processRequest into separate request handlers
                // so that we could provide routes (/json/list and /json/version) here.
                // Currently this causes Metro to give warning about T31407894.
                // $FlowFixMe[method-unbinding] added when improving typing for this parameters
                serverApp.use(inspectorProxy.processRequest.bind(inspectorProxy));
            }
            resolve({
                server: httpServer,
                metro: metroServer
            });
        });
        // Disable any kind of automatic timeout behavior for incoming
        // requests in case it takes the packager more than the default
        // timeout of 120 seconds to respond to a request.
        httpServer.timeout = 0;
        httpServer.on("close", ()=>{
            end();
        });
    });
};
exports.runServer = runServer;

//# sourceMappingURL=runServer-fork.js.map