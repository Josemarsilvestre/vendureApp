"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exportEmbedAsync = exportEmbedAsync;
var _instantiateMetro = require("../../start/server/metro/instantiateMetro");
var _resolveFromProject = require("../../start/server/metro/resolveFromProject");
var _nodeEnv = require("../../utils/nodeEnv");
async function exportEmbedAsync(projectRoot, options) {
    (0, _nodeEnv).setNodeEnv(options.dev ? "development" : "production");
    require("@expo/env").load(projectRoot);
    const { config  } = await (0, _instantiateMetro).loadMetroConfigAsync(projectRoot, {
        maxWorkers: options.maxWorkers,
        resetCache: options.resetCache,
        config: options.config
    });
    const buildBundleWithConfig = (0, _resolveFromProject).importCliBuildBundleWithConfigFromProject(projectRoot);
    // Import the internal `buildBundleWithConfig()` function from `react-native` for the purpose
    // of exporting with `@expo/metro-config` and other defaults like a resolved project entry.
    await buildBundleWithConfig(options, config);
}

//# sourceMappingURL=exportEmbedAsync.js.map