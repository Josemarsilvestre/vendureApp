"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withExtendedResolver = withExtendedResolver;
exports.shouldAliasAssetRegistryForWeb = shouldAliasAssetRegistryForWeb;
exports.withMetroMultiPlatformAsync = withMetroMultiPlatformAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var _log = require("../../../log");
var _fileNotifier = require("../../../utils/FileNotifier");
var _env = require("../../../utils/env");
var _exit = require("../../../utils/exit");
var _interactive = require("../../../utils/interactive");
var _link = require("../../../utils/link");
var _loadTsConfigPaths = require("../../../utils/tsconfig/loadTsConfigPaths");
var _resolveWithTsConfigPaths = require("../../../utils/tsconfig/resolveWithTsConfigPaths");
var _webSupportProjectPrerequisite = require("../../doctor/web/WebSupportProjectPrerequisite");
var _externals = require("./externals");
var _metroErrors = require("./metroErrors");
var _resolveFromProject = require("./resolveFromProject");
var _router = require("./router");
var _withMetroResolvers = require("./withMetroResolvers");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:server:metro:multi-platform");
function withWebPolyfills(config, projectRoot) {
    const originalGetPolyfills = config.serializer.getPolyfills ? config.serializer.getPolyfills.bind(config.serializer) : ()=>[]
    ;
    const getPolyfills = (ctx)=>{
        if (ctx.platform === "web") {
            return [
                // NOTE: We might need this for all platforms
                _path.default.join(projectRoot, _externals.EXTERNAL_REQUIRE_POLYFILL)
            ];
        }
        // Generally uses `rn-get-polyfills`
        const polyfills = originalGetPolyfills(ctx);
        return [
            ...polyfills,
            _externals.EXTERNAL_REQUIRE_NATIVE_POLYFILL
        ];
    };
    return {
        ...config,
        serializer: {
            ...config.serializer,
            getPolyfills
        }
    };
}
function normalizeSlashes(p) {
    return p.replace(/\\/g, "/");
}
function withExtendedResolver(config, { projectRoot , tsconfig , platforms , isTsconfigPathsEnabled  }) {
    // Get the `transformer.assetRegistryPath`
    // this needs to be unified since you can't dynamically
    // swap out the transformer based on platform.
    const assetRegistryPath = _fs.default.realpathSync(// This is the native asset registry alias for native.
    _path.default.resolve((0, _resolveFrom).default(projectRoot, "react-native/Libraries/Image/AssetRegistry")));
    const isWebEnabled = platforms.includes("web");
    const { resolve  } = (0, _resolveFromProject).importMetroResolverFromProject(projectRoot);
    const extraNodeModules = {};
    const aliases = {
        web: {
            "react-native": "react-native-web"
        }
    };
    if (isWebEnabled) {
        // Allow `react-native-web` to be optional when web is not enabled but path aliases is.
        extraNodeModules["web"] = {
            "react-native": _path.default.resolve(require.resolve("react-native-web/package.json"), "..")
        };
    }
    const preferredMainFields = {
        // Defaults from Expo Webpack. Most packages using `react-native` don't support web
        // in the `react-native` field, so we should prefer the `browser` field.
        // https://github.com/expo/router/issues/37
        web: [
            "browser",
            "module",
            "main"
        ]
    };
    var _paths1;
    let tsConfigResolve = (tsconfig == null ? void 0 : tsconfig.paths) ? _resolveWithTsConfigPaths.resolveWithTsConfigPaths.bind(_resolveWithTsConfigPaths.resolveWithTsConfigPaths, {
        paths: (_paths1 = tsconfig.paths) != null ? _paths1 : {},
        baseUrl: tsconfig.baseUrl
    }) : null;
    if (isTsconfigPathsEnabled && (0, _interactive).isInteractive()) {
        // TODO: We should track all the files that used imports and invalidate them
        // currently the user will need to save all the files that use imports to
        // use the new aliases.
        const configWatcher = new _fileNotifier.FileNotifier(projectRoot, [
            "./tsconfig.json",
            "./jsconfig.json"
        ]);
        configWatcher.startObserving(()=>{
            debug("Reloading tsconfig.json");
            (0, _loadTsConfigPaths).loadTsConfigPathsAsync(projectRoot).then((tsConfigPaths)=>{
                if ((tsConfigPaths == null ? void 0 : tsConfigPaths.paths) && !!Object.keys(tsConfigPaths.paths).length) {
                    debug("Enabling tsconfig.json paths support");
                    var _paths;
                    tsConfigResolve = _resolveWithTsConfigPaths.resolveWithTsConfigPaths.bind(_resolveWithTsConfigPaths.resolveWithTsConfigPaths, {
                        paths: (_paths = tsConfigPaths.paths) != null ? _paths : {},
                        baseUrl: tsConfigPaths.baseUrl
                    });
                } else {
                    debug("Disabling tsconfig.json paths support");
                    tsConfigResolve = null;
                }
            });
        });
        // TODO: This probably prevents the process from exiting.
        (0, _exit).installExitHooks(()=>{
            configWatcher.stopObserving();
        });
    } else {
        debug("Skipping tsconfig.json paths support");
    }
    return (0, _withMetroResolvers).withMetroResolvers(config, projectRoot, [
        // Add a resolver to alias the web asset resolver.
        (immutableContext, moduleName1, platform)=>{
            var ref;
            let context = {
                ...immutableContext
            };
            const environment = (ref = context.customResolverOptions) == null ? void 0 : ref.environment;
            const isNode = environment === "node";
            // TODO: We need to prevent the require.context from including API routes as these use externals.
            // Should be fine after async routes lands.
            if (isNode) {
                const moduleId = (0, _externals).isNodeExternal(moduleName1);
                if (moduleId) {
                    moduleName1 = (0, _externals).getNodeExternalModuleId(context.originModulePath, moduleId);
                    debug(`Redirecting Node.js external "${moduleId}" to "${moduleName1}"`);
                }
            }
            // Conditionally remap `react-native` to `react-native-web` on web in
            // a way that doesn't require Babel to resolve the alias.
            if (platform && platform in aliases && aliases[platform][moduleName1]) {
                moduleName1 = aliases[platform][moduleName1];
            }
            // TODO: We may be able to remove this in the future, it's doing no harm
            // by staying here.
            // Conditionally remap `react-native` to `react-native-web`
            if (platform && platform in extraNodeModules) {
                context.extraNodeModules = {
                    ...extraNodeModules[platform],
                    ...context.extraNodeModules
                };
            }
            if ((tsconfig == null ? void 0 : tsconfig.baseUrl) && isTsconfigPathsEnabled) {
                context = {
                    ...context,
                    nodeModulesPaths: [
                        ...immutableContext.nodeModulesPaths,
                        // add last to ensure node modules are resolved first
                        tsconfig.baseUrl, 
                    ]
                };
            }
            let mainFields = context.mainFields;
            if (isNode) {
                // Node.js runtimes should only be importing main at the moment.
                // This is a temporary fix until we can support the package.json exports.
                mainFields = [
                    "main"
                ];
            } else if (_env.env.EXPO_METRO_NO_MAIN_FIELD_OVERRIDE) {
                mainFields = context.mainFields;
            } else if (platform && platform in preferredMainFields) {
                mainFields = preferredMainFields[platform];
            }
            function doResolve(moduleName) {
                return resolve({
                    ...context,
                    preferNativePlatform: platform !== "web",
                    resolveRequest: undefined,
                    mainFields,
                    // Passing `mainFields` directly won't be considered (in certain version of Metro)
                    // we need to extend the `getPackageMainPath` directly to
                    // use platform specific `mainFields`.
                    // @ts-ignore
                    getPackageMainPath (packageJsonPath) {
                        // @ts-expect-error: mainFields is not on type
                        const package_ = context.moduleCache.getPackage(packageJsonPath);
                        return package_.getMain(mainFields);
                    }
                }, moduleName, platform);
            }
            function optionalResolve(moduleName) {
                try {
                    return doResolve(moduleName);
                } catch (error) {
                    // If the error is directly related to a resolver not being able to resolve a module, then
                    // we can ignore the error and try the next resolver. Otherwise, we should throw the error.
                    const isResolutionError = (0, _metroErrors).isFailedToResolveNameError(error) || (0, _metroErrors).isFailedToResolvePathError(error);
                    if (!isResolutionError) {
                        throw error;
                    }
                }
                return null;
            }
            let result = null;
            if (tsConfigResolve) {
                result = tsConfigResolve({
                    originModulePath: context.originModulePath,
                    moduleName: moduleName1
                }, optionalResolve);
            }
            result != null ? result : result = doResolve(moduleName1);
            if (result) {
                // Replace the web resolver with the original one.
                // This is basically an alias for web-only.
                if (shouldAliasAssetRegistryForWeb(platform, result)) {
                    // @ts-expect-error: `readonly` for some reason.
                    result.filePath = assetRegistryPath;
                }
            }
            return result;
        }, 
    ]);
}
function shouldAliasAssetRegistryForWeb(platform, result) {
    return platform === "web" && (result == null ? void 0 : result.type) === "sourceFile" && typeof (result == null ? void 0 : result.filePath) === "string" && normalizeSlashes(result.filePath).endsWith("react-native-web/dist/modules/AssetRegistry/index.js");
}
async function withMetroMultiPlatformAsync(projectRoot, { config , platformBundlers , isTsconfigPathsEnabled , webOutput , routerDirectory  }) {
    // Auto pick app entry for router.
    process.env.EXPO_ROUTER_APP_ROOT = (0, _router).getAppRouterRelativeEntryPath(projectRoot, routerDirectory);
    var _EXPO_PUBLIC_PROJECT_ROOT;
    // Required for @expo/metro-runtime to format paths in the web LogBox.
    process.env.EXPO_PUBLIC_PROJECT_ROOT = (_EXPO_PUBLIC_PROJECT_ROOT = process.env.EXPO_PUBLIC_PROJECT_ROOT) != null ? _EXPO_PUBLIC_PROJECT_ROOT : projectRoot;
    if (webOutput === "static") {
        // Enable static rendering in runtime space.
        process.env.EXPO_PUBLIC_USE_STATIC = "1";
    }
    // Ensure the cache is invalidated if these values change.
    // @ts-expect-error
    config.transformer._expoRouterRootDirectory = process.env.EXPO_ROUTER_APP_ROOT;
    // @ts-expect-error
    config.transformer._expoRouterWebRendering = webOutput;
    // TODO: import mode
    if (platformBundlers.web === "metro") {
        await new _webSupportProjectPrerequisite.WebSupportProjectPrerequisite(projectRoot).assertAsync();
    } else if (!isTsconfigPathsEnabled) {
        // Bail out early for performance enhancements if no special features are enabled.
        return config;
    }
    let tsconfig = null;
    if (isTsconfigPathsEnabled) {
        _log.Log.warn(_chalk.default.yellow`Experimental path aliases feature is enabled. ` + (0, _link).learnMore("https://docs.expo.dev/guides/typescript/#path-aliases"));
        tsconfig = await (0, _loadTsConfigPaths).loadTsConfigPathsAsync(projectRoot);
    }
    await (0, _externals).setupNodeExternals(projectRoot);
    return withMetroMultiPlatform(projectRoot, {
        config,
        platformBundlers,
        tsconfig,
        isTsconfigPathsEnabled
    });
}
function withMetroMultiPlatform(projectRoot, { config , platformBundlers , isTsconfigPathsEnabled , tsconfig  }) {
    let expoConfigPlatforms = Object.entries(platformBundlers).filter(([, bundler])=>bundler === "metro"
    ).map(([platform])=>platform
    );
    if (Array.isArray(config.resolver.platforms)) {
        expoConfigPlatforms = [
            ...new Set(expoConfigPlatforms.concat(config.resolver.platforms))
        ];
    }
    // @ts-expect-error: typed as `readonly`.
    config.resolver.platforms = expoConfigPlatforms;
    if (expoConfigPlatforms.includes("web")) {
        config = withWebPolyfills(config, projectRoot);
    }
    return withExtendedResolver(config, {
        projectRoot,
        tsconfig,
        isTsconfigPathsEnabled,
        platforms: expoConfigPlatforms
    });
}

//# sourceMappingURL=withMetroMultiPlatform.js.map