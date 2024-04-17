"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDeepLinkHandler = getDeepLinkHandler;
var _config = require("@expo/config");
var _devServer = require("@expo/dev-server");
var runtimeEnv = _interopRequireWildcard(require("@expo/env"));
var _assert = _interopRequireDefault(require("assert"));
var _chalk = _interopRequireDefault(require("chalk"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _path = _interopRequireDefault(require("path"));
var _log = require("../../../log");
var _getDevClientProperties = _interopRequireDefault(require("../../../utils/analytics/getDevClientProperties"));
var _rudderstackClient = require("../../../utils/analytics/rudderstackClient");
var _port = require("../../../utils/port");
var _bundlerDevServer = require("../BundlerDevServer");
var _getStaticRenderFunctions = require("../getStaticRenderFunctions");
var _contextModuleSourceMapsMiddleware = require("../middleware/ContextModuleSourceMapsMiddleware");
var _createFileMiddleware = require("../middleware/CreateFileMiddleware");
var _faviconMiddleware = require("../middleware/FaviconMiddleware");
var _historyFallbackMiddleware = require("../middleware/HistoryFallbackMiddleware");
var _interstitialPageMiddleware = require("../middleware/InterstitialPageMiddleware");
var _manifestMiddleware = require("../middleware/ManifestMiddleware");
var _reactDevToolsPageMiddleware = require("../middleware/ReactDevToolsPageMiddleware");
var _runtimeRedirectMiddleware = require("../middleware/RuntimeRedirectMiddleware");
var _serveStaticMiddleware = require("../middleware/ServeStaticMiddleware");
var _startTypescriptTypeGeneration = require("../type-generation/startTypescriptTypeGeneration");
var _instantiateMetro = require("./instantiateMetro");
var _metroErrorInterface = require("./metroErrorInterface");
var _metroWatchTypeScriptFiles = require("./metroWatchTypeScriptFiles");
var _waitForMetroToObserveTypeScriptFile = require("./waitForMetroToObserveTypeScriptFile");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
const debug = require("debug")("expo:start:server:metro");
/** Default port to use for apps running in Expo Go. */ const EXPO_GO_METRO_PORT = 8081;
/** Default port to use for apps that run in standard React Native projects or Expo Dev Clients. */ const DEV_CLIENT_METRO_PORT = 8081;
class MetroBundlerDevServer extends _bundlerDevServer.BundlerDevServer {
    metro = null;
    get name() {
        return "metro";
    }
    async resolvePortAsync(options = {}) {
        var // If the manually defined port is busy then an error should be thrown...
        _port1;
        const port = (_port1 = options.port) != null ? _port1 : // Otherwise use the default port based on the runtime target.
        (options.devClient ? Number(process.env.RCT_METRO_PORT) || DEV_CLIENT_METRO_PORT : await (0, _port).getFreePortAsync(EXPO_GO_METRO_PORT));
        return port;
    }
    /** Get routes from Expo Router. */ async getRoutesAsync() {
        const url = this.getDevServerUrl();
        (0, _assert).default(url, "Dev server must be started");
        const { getManifest  } = await (0, _getStaticRenderFunctions).getStaticRenderFunctions(this.projectRoot, url, {
            // Ensure the API Routes are included
            environment: "node"
        });
        return getManifest({
            fetchData: true
        });
    }
    async composeResourcesWithHtml({ mode , resources , template , devBundleUrl  }) {
        if (!resources) {
            return "";
        }
        const isDev = mode === "development";
        return htmlFromSerialAssets(resources, {
            dev: isDev,
            template,
            bundleUrl: isDev ? devBundleUrl : undefined
        });
    }
    async getStaticRenderFunctionAsync({ mode , minify =mode !== "development"  }) {
        const url = this.getDevServerUrl();
        const { getStaticContent  } = await (0, _getStaticRenderFunctions).getStaticRenderFunctions(this.projectRoot, url, {
            minify,
            dev: mode !== "production",
            // Ensure the API Routes are included
            environment: "node"
        });
        return async (path)=>{
            return await getStaticContent(new URL(path, url));
        };
    }
    async getStaticResourcesAsync({ mode , minify =mode !== "development"  }) {
        var ref;
        const devBundleUrlPathname = (0, _manifestMiddleware).createBundleUrlPath({
            platform: "web",
            mode,
            minify,
            environment: "client",
            serializerOutput: "static",
            mainModuleName: (0, _manifestMiddleware).resolveMainModuleName(this.projectRoot, (0, _config).getConfig(this.projectRoot), "web")
        });
        const bundleUrl = new URL(devBundleUrlPathname, this.getDevServerUrl());
        // Fetch the generated HTML from our custom Metro serializer
        const results = await (0, _nodeFetch).default(bundleUrl.toString());
        const txt = await results.text();
        let data;
        try {
            data = JSON.parse(txt);
        } catch (error) {
            _log.Log.error("Failed to generate resources with Metro, the Metro config may not be using the correct serializer. Ensure the metro.config.js is extending the expo/metro-config and is not overriding the serializer.");
            debug(txt);
            throw error;
        }
        // NOTE: This could potentially need more validation in the future.
        if (Array.isArray(data)) {
            return data;
        }
        if (data != null && (data.errors || ((ref = data.type) == null ? void 0 : ref.match(/.*Error$/)))) {
            // {
            //   type: 'InternalError',
            //   errors: [],
            //   message: 'Metro has encountered an error: While trying to resolve module `stylis` from file `/Users/evanbacon/Documents/GitHub/lab/emotion-error-test/node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js`, the package `/Users/evanbacon/Documents/GitHub/lab/emotion-error-test/node_modules/stylis/package.json` was successfully found. However, this package itself specifies a `main` module field that could not be resolved (`/Users/evanbacon/Documents/GitHub/lab/emotion-error-test/node_modules/stylis/dist/stylis.mjs`. Indeed, none of these files exist:\n' +
            //     '\n' +
            //     '  * /Users/evanbacon/Documents/GitHub/lab/emotion-error-test/node_modules/stylis/dist/stylis.mjs(.web.ts|.ts|.web.tsx|.tsx|.web.js|.js|.web.jsx|.jsx|.web.json|.json|.web.cjs|.cjs|.web.scss|.scss|.web.sass|.sass|.web.css|.css)\n' +
            //     '  * /Users/evanbacon/Documents/GitHub/lab/emotion-error-test/node_modules/stylis/dist/stylis.mjs/index(.web.ts|.ts|.web.tsx|.tsx|.web.js|.js|.web.jsx|.jsx|.web.json|.json|.web.cjs|.cjs|.web.scss|.scss|.web.sass|.sass|.web.css|.css): /Users/evanbacon/Documents/GitHub/lab/emotion-error-test/node_modules/metro/src/node-haste/DependencyGraph.js (289:17)\n' +
            //     '\n' +
            //     '\x1B[0m \x1B[90m 287 |\x1B[39m         }\x1B[0m\n' +
            //     '\x1B[0m \x1B[90m 288 |\x1B[39m         \x1B[36mif\x1B[39m (error \x1B[36minstanceof\x1B[39m \x1B[33mInvalidPackageError\x1B[39m) {\x1B[0m\n' +
            //     '\x1B[0m\x1B[31m\x1B[1m>\x1B[22m\x1B[39m\x1B[90m 289 |\x1B[39m           \x1B[36mthrow\x1B[39m \x1B[36mnew\x1B[39m \x1B[33mPackageResolutionError\x1B[39m({\x1B[0m\n' +
            //     '\x1B[0m \x1B[90m     |\x1B[39m                 \x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[0m\n' +
            //     '\x1B[0m \x1B[90m 290 |\x1B[39m             packageError\x1B[33m:\x1B[39m error\x1B[33m,\x1B[39m\x1B[0m\n' +
            //     '\x1B[0m \x1B[90m 291 |\x1B[39m             originModulePath\x1B[33m:\x1B[39m \x1B[36mfrom\x1B[39m\x1B[33m,\x1B[39m\x1B[0m\n' +
            //     '\x1B[0m \x1B[90m 292 |\x1B[39m             targetModuleName\x1B[33m:\x1B[39m to\x1B[33m,\x1B[39m\x1B[0m'
            // }
            // The Metro logger already showed this error.
            throw new Error(data.message);
        }
        throw new Error("Invalid resources returned from the Metro serializer. Expected array, found: " + data);
    }
    async renderStaticErrorAsync(error) {
        return (0, _metroErrorInterface).getErrorOverlayHtmlAsync({
            error,
            projectRoot: this.projectRoot
        });
    }
    async getStaticPageAsync(pathname, { mode , minify =mode !== "development"  }) {
        const devBundleUrlPathname = (0, _manifestMiddleware).createBundleUrlPath({
            platform: "web",
            mode,
            environment: "client",
            mainModuleName: (0, _manifestMiddleware).resolveMainModuleName(this.projectRoot, (0, _config).getConfig(this.projectRoot), "web")
        });
        const bundleStaticHtml = async ()=>{
            const { getStaticContent  } = await (0, _getStaticRenderFunctions).getStaticRenderFunctions(this.projectRoot, this.getDevServerUrl(), {
                minify: false,
                dev: mode !== "production",
                // Ensure the API Routes are included
                environment: "node"
            });
            const location = new URL(pathname, this.getDevServerUrl());
            return await getStaticContent(location);
        };
        const [resources, staticHtml] = await Promise.all([
            this.getStaticResourcesAsync({
                mode,
                minify
            }),
            bundleStaticHtml(), 
        ]);
        const content = await this.composeResourcesWithHtml({
            mode,
            resources,
            template: staticHtml,
            devBundleUrl: devBundleUrlPathname
        });
        return {
            content,
            resources
        };
    }
    async watchEnvironmentVariables() {
        if (!this.instance) {
            throw new Error("Cannot observe environment variable changes without a running Metro instance.");
        }
        if (!this.metro) {
            // This can happen when the run command is used and the server is already running in another
            // process.
            debug("Skipping Environment Variable observation because Metro is not running (headless).");
            return;
        }
        const envFiles = runtimeEnv.getFiles(process.env.NODE_ENV).map((fileName)=>_path.default.join(this.projectRoot, fileName)
        );
        (0, _waitForMetroToObserveTypeScriptFile).observeFileChanges({
            metro: this.metro,
            server: this.instance.server
        }, envFiles, ()=>{
            debug("Reloading environment variables...");
            // Force reload the environment variables.
            runtimeEnv.load(this.projectRoot, {
                force: true
            });
        });
    }
    async startImplementationAsync(options) {
        options.port = await this.resolvePortAsync(options);
        this.urlCreator = this.getUrlCreator(options);
        const parsedOptions = {
            port: options.port,
            maxWorkers: options.maxWorkers,
            resetCache: options.resetDevServer,
            // Use the unversioned metro config.
            // TODO: Deprecate this property when expo-cli goes away.
            unversioned: false
        };
        // Required for symbolication:
        process.env.EXPO_DEV_SERVER_ORIGIN = `http://localhost:${options.port}`;
        const { metro , server , middleware , messageSocket  } = await (0, _instantiateMetro).instantiateMetroAsync(this, parsedOptions);
        const manifestMiddleware = await this.getManifestMiddlewareAsync(options);
        // Important that we noop source maps for context modules as soon as possible.
        (0, _devServer).prependMiddleware(middleware, new _contextModuleSourceMapsMiddleware.ContextModuleSourceMapsMiddleware().getHandler());
        // We need the manifest handler to be the first middleware to run so our
        // routes take precedence over static files. For example, the manifest is
        // served from '/' and if the user has an index.html file in their project
        // then the manifest handler will never run, the static middleware will run
        // and serve index.html instead of the manifest.
        // https://github.com/expo/expo/issues/13114
        (0, _devServer).prependMiddleware(middleware, manifestMiddleware.getHandler());
        var _scheme;
        middleware.use(new _interstitialPageMiddleware.InterstitialPageMiddleware(this.projectRoot, {
            // TODO: Prevent this from becoming stale.
            scheme: (_scheme = options.location.scheme) != null ? _scheme : null
        }).getHandler());
        middleware.use(new _reactDevToolsPageMiddleware.ReactDevToolsPageMiddleware(this.projectRoot).getHandler());
        const deepLinkMiddleware = new _runtimeRedirectMiddleware.RuntimeRedirectMiddleware(this.projectRoot, {
            onDeepLink: getDeepLinkHandler(this.projectRoot),
            getLocation: ({ runtime  })=>{
                if (runtime === "custom") {
                    var ref;
                    return (ref = this.urlCreator) == null ? void 0 : ref.constructDevClientUrl();
                } else {
                    var ref1;
                    return (ref1 = this.urlCreator) == null ? void 0 : ref1.constructUrl({
                        scheme: "exp"
                    });
                }
            }
        });
        middleware.use(deepLinkMiddleware.getHandler());
        middleware.use(new _createFileMiddleware.CreateFileMiddleware(this.projectRoot).getHandler());
        // Append support for redirecting unhandled requests to the index.html page on web.
        if (this.isTargetingWeb()) {
            var ref2;
            const { exp  } = (0, _config).getConfig(this.projectRoot, {
                skipSDKVersionRequirement: true
            });
            const useWebSSG = ((ref2 = exp.web) == null ? void 0 : ref2.output) === "static";
            // This MUST be after the manifest middleware so it doesn't have a chance to serve the template `public/index.html`.
            middleware.use(new _serveStaticMiddleware.ServeStaticMiddleware(this.projectRoot).getHandler());
            // This should come after the static middleware so it doesn't serve the favicon from `public/favicon.ico`.
            middleware.use(new _faviconMiddleware.FaviconMiddleware(this.projectRoot).getHandler());
            if (useWebSSG) {
                middleware.use(async (req, res, next)=>{
                    if (!(req == null ? void 0 : req.url)) {
                        return next();
                    }
                    // TODO: Formal manifest for allowed paths
                    if (req.url.endsWith(".ico")) {
                        return next();
                    }
                    if (req.url.includes("serializer.output=static")) {
                        return next();
                    }
                    try {
                        var _mode;
                        const { content  } = await this.getStaticPageAsync(req.url, {
                            mode: (_mode = options.mode) != null ? _mode : "development"
                        });
                        res.setHeader("Content-Type", "text/html");
                        res.end(content);
                        return;
                    } catch (error) {
                        res.setHeader("Content-Type", "text/html");
                        try {
                            res.end(await this.renderStaticErrorAsync(error));
                        } catch (staticError) {
                            // Fallback error for when Expo Router is misconfigured in the project.
                            res.end("<span><h3>Internal Error:</h3><b>Project is not setup correctly for static rendering (check terminal for more info):</b><br/>" + error.message + "<br/><br/>" + staticError.message + "</span>");
                        }
                    }
                });
            }
            // This MUST run last since it's the fallback.
            if (!useWebSSG) {
                middleware.use(new _historyFallbackMiddleware.HistoryFallbackMiddleware(manifestMiddleware.getHandler().internal).getHandler());
            }
        }
        // Extend the close method to ensure that we clean up the local info.
        const originalClose = server.close.bind(server);
        server.close = (callback)=>{
            return originalClose((err)=>{
                this.instance = null;
                this.metro = null;
                callback == null ? void 0 : callback(err);
            });
        };
        this.metro = metro;
        return {
            server,
            location: {
                // The port is the main thing we want to send back.
                port: options.port,
                // localhost isn't always correct.
                host: "localhost",
                // http is the only supported protocol on native.
                url: `http://localhost:${options.port}`,
                protocol: "http"
            },
            middleware,
            messageSocket
        };
    }
    async waitForTypeScriptAsync() {
        if (!this.instance) {
            throw new Error("Cannot wait for TypeScript without a running server.");
        }
        return new Promise((resolve)=>{
            if (!this.metro) {
                // This can happen when the run command is used and the server is already running in another
                // process. In this case we can't wait for the TypeScript check to complete because we don't
                // have access to the Metro server.
                debug("Skipping TypeScript check because Metro is not running (headless).");
                return resolve(false);
            }
            const off = (0, _metroWatchTypeScriptFiles).metroWatchTypeScriptFiles({
                projectRoot: this.projectRoot,
                server: this.instance.server,
                metro: this.metro,
                tsconfig: true,
                throttle: true,
                eventTypes: [
                    "change",
                    "add"
                ],
                callback: async ()=>{
                    // Run once, this prevents the TypeScript project prerequisite from running on every file change.
                    off();
                    const { TypeScriptProjectPrerequisite  } = await Promise.resolve().then(function() {
                        return _interopRequireWildcard(require("../../doctor/typescript/TypeScriptProjectPrerequisite"));
                    });
                    try {
                        const req = new TypeScriptProjectPrerequisite(this.projectRoot);
                        await req.bootstrapAsync();
                        resolve(true);
                    } catch (error) {
                        // Ensure the process doesn't fail if the TypeScript check fails.
                        // This could happen during the install.
                        _log.Log.log();
                        _log.Log.error(_chalk.default.red`Failed to automatically setup TypeScript for your project. Try restarting the dev server to fix.`);
                        _log.Log.exception(error);
                        resolve(false);
                    }
                }
            });
        });
    }
    async startTypeScriptServices() {
        var ref;
        return (0, _startTypescriptTypeGeneration).startTypescriptTypeGenerationAsync({
            server: (ref = this.instance) == null ? void 0 : ref.server,
            metro: this.metro,
            projectRoot: this.projectRoot
        });
    }
    getConfigModuleIds() {
        return [
            "./metro.config.js",
            "./metro.config.json",
            "./rn-cli.config.js"
        ];
    }
}
exports.MetroBundlerDevServer = MetroBundlerDevServer;
function getDeepLinkHandler(projectRoot) {
    return async ({ runtime  })=>{
        if (runtime === "expo") return;
        const { exp  } = (0, _config).getConfig(projectRoot);
        await (0, _rudderstackClient).logEventAsync("dev client start command", {
            status: "started",
            ...(0, _getDevClientProperties).default(projectRoot, exp)
        });
    };
}
function htmlFromSerialAssets(assets, { dev , template , bundleUrl  }) {
    // Combine the CSS modules into tags that have hot refresh data attributes.
    const styleString = assets.filter((asset)=>asset.type === "css"
    ).map(({ metadata , filename , source  })=>{
        if (dev) {
            return `<style data-expo-css-hmr="${metadata.hmrId}">` + source + "\n</style>";
        } else {
            return [
                `<link rel="preload" href="/${filename}" as="style">`,
                `<link rel="stylesheet" href="/${filename}">`, 
            ].join("");
        }
    }).join("");
    const jsAssets = assets.filter((asset)=>asset.type === "js"
    );
    const scripts = bundleUrl ? `<script src="${bundleUrl}" defer></script>` : jsAssets.map(({ filename  })=>{
        return `<script src="/${filename}" defer></script>`;
    }).join("");
    return template.replace("</head>", `${styleString}</head>`).replace("</body>", `${scripts}\n</body>`);
}

//# sourceMappingURL=MetroBundlerDevServer.js.map