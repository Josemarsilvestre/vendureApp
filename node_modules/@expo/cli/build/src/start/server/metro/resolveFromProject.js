"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.importMetroFromProject = importMetroFromProject;
exports.importMetroCreateWebsocketServerFromProject = importMetroCreateWebsocketServerFromProject;
exports.importMetroHmrServerFromProject = importMetroHmrServerFromProject;
exports.importExpoMetroConfig = importExpoMetroConfig;
exports.importFromProjectOrFallback = importFromProjectOrFallback;
exports.importMetroResolverFromProject = importMetroResolverFromProject;
exports.importMetroInspectorProxyFromProject = importMetroInspectorProxyFromProject;
exports.importMetroInspectorDeviceFromProject = importMetroInspectorDeviceFromProject;
exports.importCliSaveAssetsFromProject = importCliSaveAssetsFromProject;
exports.importCliBuildBundleWithConfigFromProject = importCliBuildBundleWithConfigFromProject;
exports.resolveMetroVersionFromProject = resolveMetroVersionFromProject;
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:metro:import");
// These resolvers enable us to test the CLI in older projects.
// We may be able to get rid of this in the future.
// TODO: Maybe combine with AsyncResolver?
class MetroImportError extends Error {
    constructor(projectRoot, moduleId){
        super(`Missing package "${moduleId}" in the project at: ${projectRoot}\n` + 'This usually means "react-native" is not installed. ' + 'Please verify that dependencies in package.json include "react-native" ' + "and run `yarn` or `npm install`.");
    }
}
function resolveFromProject(projectRoot, moduleId) {
    const resolvedPath = _resolveFrom.default.silent(projectRoot, moduleId);
    if (!resolvedPath) {
        throw new MetroImportError(projectRoot, moduleId);
    }
    return resolvedPath;
}
function importFromProject(projectRoot, moduleId) {
    return require(resolveFromProject(projectRoot, moduleId));
}
function importMetroFromProject(projectRoot) {
    return importFromProject(projectRoot, "metro");
}
function importMetroCreateWebsocketServerFromProject(projectRoot) {
    return importFromProject(projectRoot, "metro/src/lib/createWebsocketServer");
}
function importMetroHmrServerFromProject(projectRoot) {
    return importFromProject(projectRoot, "metro/src/HmrServer");
}
function importExpoMetroConfig(projectRoot) {
    return importFromProjectOrFallback(projectRoot, "@expo/metro-config");
}
function importFromProjectOrFallback(projectRoot, moduleId) {
    const resolvedPath = _resolveFrom.default.silent(projectRoot, moduleId);
    if (!resolvedPath) {
        debug(`requiring "${moduleId}" relative to the CLI`);
        return require(require.resolve(moduleId));
    }
    debug(`requiring "${moduleId}" from the project:`, resolvedPath);
    return require(resolvedPath);
}
function importMetroResolverFromProject(projectRoot) {
    return importFromProject(projectRoot, "metro-resolver");
}
function importMetroInspectorProxyFromProject(projectRoot) {
    return importFromProject(projectRoot, "metro-inspector-proxy");
}
function importMetroInspectorDeviceFromProject(projectRoot) {
    return importFromProject(projectRoot, "metro-inspector-proxy/src/Device");
}
function importCliSaveAssetsFromProject(projectRoot) {
    return importFromProject(projectRoot, "@react-native-community/cli-plugin-metro/build/commands/bundle/saveAssets").default;
}
function importCliBuildBundleWithConfigFromProject(projectRoot) {
    return importFromProject(projectRoot, "@react-native-community/cli-plugin-metro/build/commands/bundle/buildBundle").buildBundleWithConfig;
}
function resolveMetroVersionFromProject(projectRoot) {
    return importFromProject(projectRoot, "metro/package.json").version;
}

//# sourceMappingURL=resolveFromProject.js.map