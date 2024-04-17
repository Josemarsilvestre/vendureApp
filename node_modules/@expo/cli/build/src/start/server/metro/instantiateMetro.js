"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMetroConfigAsync = loadMetroConfigAsync;
exports.instantiateMetroAsync = instantiateMetroAsync;
exports.isWatchEnabled = isWatchEnabled;
var _config = require("@expo/config");
var _chalk = _interopRequireDefault(require("chalk"));
var _metroCore = require("metro-core");
var _log = require("../../../log");
var _getMetroProperties = require("../../../utils/analytics/getMetroProperties");
var _metroDebuggerMiddleware = require("../../../utils/analytics/metroDebuggerMiddleware");
var _rudderstackClient = require("../../../utils/analytics/rudderstackClient");
var _env = require("../../../utils/env");
var _manifestMiddleware = require("../middleware/ManifestMiddleware");
var _createDevServerMiddleware = require("../middleware/createDevServerMiddleware");
var _platformBundlers = require("../platformBundlers");
var _metroTerminalReporter = require("./MetroTerminalReporter");
var _resolveFromProject = require("./resolveFromProject");
var _router = require("./router");
var _runServerFork = require("./runServer-fork");
var _withMetroMultiPlatform = require("./withMetroMultiPlatform");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function loadMetroConfigAsync(projectRoot, options, { exp =(0, _config).getConfig(projectRoot, {
    skipSDKVersionRequirement: true,
    skipPlugins: true
}).exp  } = {}) {
    var ref, ref1, ref2, ref3;
    let reportEvent;
    const serverRoot = (0, _manifestMiddleware).getMetroServerRoot(projectRoot);
    const terminal = new _metroCore.Terminal(process.stdout);
    const terminalReporter = new _metroTerminalReporter.MetroTerminalReporter(serverRoot, terminal);
    const reporter = {
        update (event) {
            terminalReporter.update(event);
            if (reportEvent) {
                reportEvent(event);
            }
        }
    };
    const ExpoMetroConfig = (0, _resolveFromProject).importExpoMetroConfig(projectRoot);
    let config = await ExpoMetroConfig.loadAsync(projectRoot, {
        reporter,
        ...options
    });
    const platformBundlers = (0, _platformBundlers).getPlatformBundlers(exp);
    var ref4, ref5;
    config = await (0, _withMetroMultiPlatform).withMetroMultiPlatformAsync(projectRoot, {
        routerDirectory: (ref4 = (ref = exp.extra) == null ? void 0 : (ref1 = ref.router) == null ? void 0 : ref1.unstable_src) != null ? ref4 : (0, _router).getRouterDirectory(projectRoot),
        config,
        platformBundlers,
        isTsconfigPathsEnabled: !!((ref2 = exp.experiments) == null ? void 0 : ref2.tsconfigPaths),
        webOutput: (ref5 = (ref3 = exp.web) == null ? void 0 : ref3.output) != null ? ref5 : "single"
    });
    (0, _rudderstackClient).logEventAsync("metro config", (0, _getMetroProperties).getMetroProperties(projectRoot, exp, config));
    return {
        config,
        setEventReporter: (logger)=>reportEvent = logger
        ,
        reporter: terminalReporter
    };
}
async function instantiateMetroAsync(metroBundler, options) {
    const projectRoot = metroBundler.projectRoot;
    // TODO: When we bring expo/metro-config into the expo/expo repo, then we can upstream this.
    const { exp  } = (0, _config).getConfig(projectRoot, {
        skipSDKVersionRequirement: true,
        skipPlugins: true
    });
    const { config: metroConfig , setEventReporter  } = await loadMetroConfigAsync(projectRoot, options, {
        exp
    });
    const { middleware , websocketEndpoints , eventsSocketEndpoint , messageSocketEndpoint  } = (0, _createDevServerMiddleware).createDevServerMiddleware(projectRoot, {
        port: metroConfig.server.port,
        watchFolders: metroConfig.watchFolders
    });
    const customEnhanceMiddleware = metroConfig.server.enhanceMiddleware;
    // @ts-expect-error: can't mutate readonly config
    metroConfig.server.enhanceMiddleware = (metroMiddleware, server)=>{
        if (customEnhanceMiddleware) {
            metroMiddleware = customEnhanceMiddleware(metroMiddleware, server);
        }
        return middleware.use(metroMiddleware);
    };
    middleware.use((0, _metroDebuggerMiddleware).createDebuggerTelemetryMiddleware(projectRoot, exp));
    const { server: server1 , metro  } = await (0, _runServerFork).runServer(metroBundler, metroConfig, {
        hmrEnabled: true,
        // @ts-expect-error: Inconsistent `websocketEndpoints` type between metro and @react-native-community/cli-server-api
        websocketEndpoints,
        watch: isWatchEnabled()
    });
    setEventReporter(eventsSocketEndpoint.reportEvent);
    return {
        metro,
        server: server1,
        middleware,
        messageSocket: messageSocketEndpoint
    };
}
function isWatchEnabled() {
    if (_env.env.CI) {
        _log.Log.log(_chalk.default`Metro is running in CI mode, reloads are disabled. Remove {bold CI=true} to enable watch mode.`);
    }
    return !_env.env.CI;
}

//# sourceMappingURL=instantiateMetro.js.map