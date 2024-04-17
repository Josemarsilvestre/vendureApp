"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAppRouterRelativeEntryPath = getAppRouterRelativeEntryPath;
exports.getRouterDirectory = getRouterDirectory;
var _chalk = _interopRequireDefault(require("chalk"));
var _path = _interopRequireDefault(require("path"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var _log = require("../../../log");
var _dir = require("../../../utils/dir");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:server:metro:router");
function getAppRouterRelativeEntryPath(projectRoot, routerDirectory = getRouterDirectory(projectRoot)) {
    var ref;
    // Auto pick App entry
    const routerEntry = (ref = _resolveFrom.default.silent(projectRoot, "expo-router/entry")) != null ? ref : getFallbackEntryRoot(projectRoot);
    if (!routerEntry) {
        return undefined;
    }
    // It doesn't matter if the app folder exists.
    const appFolder = _path.default.join(projectRoot, routerDirectory);
    const appRoot = _path.default.relative(_path.default.dirname(routerEntry), appFolder);
    debug("routerEntry", routerEntry, appFolder, appRoot);
    return appRoot;
}
/** If the `expo-router` package is not installed, then use the `expo` package to determine where the node modules are relative to the project. */ function getFallbackEntryRoot(projectRoot) {
    const expoRoot = _resolveFrom.default.silent(projectRoot, "expo/package.json");
    if (expoRoot) {
        return _path.default.join(_path.default.dirname(_path.default.dirname(expoRoot)), "expo-router/entry");
    }
    return _path.default.join(projectRoot, "node_modules/expo-router/entry");
}
function getRouterDirectory(projectRoot) {
    // more specific directories first
    if ((0, _dir).directoryExistsSync(_path.default.join(projectRoot, "src/app"))) {
        _log.Log.log(_chalk.default.gray("Using src/app as the root directory for Expo Router."));
        return "src/app";
    }
    _log.Log.debug("Using app as the root directory for Expo Router.");
    return "app";
}

//# sourceMappingURL=router.js.map