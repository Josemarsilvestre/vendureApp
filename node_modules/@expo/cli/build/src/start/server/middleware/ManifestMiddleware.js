"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWorkspaceRoot = getWorkspaceRoot;
exports.getEntryWithServerRoot = getEntryWithServerRoot;
exports.getMetroServerRoot = getMetroServerRoot;
exports.resolveMainModuleName = resolveMainModuleName;
exports.createBundleUrlPath = createBundleUrlPath;
exports.DEVELOPER_TOOL = void 0;
var _config = require("@expo/config");
var _findYarnWorkspaceRoot = _interopRequireDefault(require("find-yarn-workspace-root"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var Log = _interopRequireWildcard(require("../../../log"));
var _env = require("../../../utils/env");
var _url1 = require("../../../utils/url");
var ProjectDevices = _interopRequireWildcard(require("../../project/devices"));
var _platformBundlers = require("../platformBundlers");
var _webTemplate = require("../webTemplate");
var _expoMiddleware = require("./ExpoMiddleware");
var _resolveAssets = require("./resolveAssets");
var _resolveEntryPoint = require("./resolveEntryPoint");
var _resolvePlatform = require("./resolvePlatform");
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
const debug = require("debug")("expo:start:server:middleware:manifest");
function getWorkspaceRoot(projectRoot) {
    try {
        return (0, _findYarnWorkspaceRoot).default(projectRoot);
    } catch (error) {
        if (error.message.includes("Unexpected end of JSON input")) {
            return null;
        }
        throw error;
    }
}
function getEntryWithServerRoot(projectRoot, projectConfig, platform) {
    return _path.default.relative(getMetroServerRoot(projectRoot), (0, _resolveEntryPoint).resolveAbsoluteEntryPoint(projectRoot, platform, projectConfig));
}
function getMetroServerRoot(projectRoot) {
    if (_env.env.EXPO_USE_METRO_WORKSPACE_ROOT) {
        var ref;
        return (ref = getWorkspaceRoot(projectRoot)) != null ? ref : projectRoot;
    }
    return projectRoot;
}
function resolveMainModuleName(projectRoot, projectConfig, platform) {
    const entryPoint = getEntryWithServerRoot(projectRoot, projectConfig, platform);
    debug(`Resolved entry point: ${entryPoint} (project root: ${projectRoot})`);
    return (0, _url1).stripExtension(entryPoint, "js");
}
function createBundleUrlPath({ platform , mainModuleName , mode , minify =mode === "production" , environment , serializerOutput  }) {
    const queryParams = new URLSearchParams({
        platform: encodeURIComponent(platform),
        dev: String(mode !== "production"),
        // TODO: Is this still needed?
        hot: String(false),
        lazy: String(!_env.env.EXPO_NO_METRO_LAZY)
    });
    if (minify) {
        queryParams.append("minify", String(minify));
    }
    if (environment) {
        queryParams.append("resolver.environment", environment);
        queryParams.append("transform.environment", environment);
    }
    if (serializerOutput) {
        queryParams.append("serializer.output", serializerOutput);
    }
    return `/${encodeURI(mainModuleName)}.bundle?${queryParams.toString()}`;
}
const DEVELOPER_TOOL = "expo-cli";
exports.DEVELOPER_TOOL = DEVELOPER_TOOL;
class ManifestMiddleware extends _expoMiddleware.ExpoMiddleware {
    constructor(projectRoot, options){
        super(projectRoot, /**
       * Only support `/`, `/manifest`, `/index.exp` for the manifest middleware.
       */ [
            "/",
            "/manifest",
            "/index.exp"
        ]);
        this.projectRoot = projectRoot;
        this.options = options;
        this.initialProjectConfig = (0, _config).getConfig(projectRoot);
    }
    /** Exposed for testing. */ async _resolveProjectSettingsAsync({ platform , hostname  }) {
        // Read the config
        const projectConfig = (0, _config).getConfig(this.projectRoot);
        // Read from headers
        const mainModuleName = this.resolveMainModuleName(projectConfig, platform);
        // Create the manifest and set fields within it
        const expoGoConfig = this.getExpoGoConfig({
            mainModuleName,
            hostname
        });
        const hostUri = this.options.constructUrl({
            scheme: "",
            hostname
        });
        const bundleUrl = this._getBundleUrl({
            platform,
            mainModuleName,
            hostname
        });
        // Resolve all assets and set them on the manifest as URLs
        await this.mutateManifestWithAssetsAsync(projectConfig.exp, bundleUrl);
        return {
            expoGoConfig,
            hostUri,
            bundleUrl,
            exp: projectConfig.exp
        };
    }
    /** Get the main entry module ID (file) relative to the project root. */ resolveMainModuleName(projectConfig, platform) {
        let entryPoint = getEntryWithServerRoot(this.projectRoot, projectConfig, platform);
        debug(`Resolved entry point: ${entryPoint} (project root: ${this.projectRoot})`);
        // NOTE(Bacon): Webpack is currently hardcoded to index.bundle on native
        // in the future (TODO) we should move this logic into a Webpack plugin and use
        // a generated file name like we do on web.
        // const server = getDefaultDevServer();
        // // TODO: Move this into BundlerDevServer and read this info from self.
        // const isNativeWebpack = server instanceof WebpackBundlerDevServer && server.isTargetingNative();
        if (this.options.isNativeWebpack) {
            entryPoint = "index.js";
        }
        return (0, _url1).stripExtension(entryPoint, "js");
    }
    /** Store device IDs that were sent in the request headers. */ async saveDevicesAsync(req) {
        var ref;
        const deviceIds = (ref = req.headers) == null ? void 0 : ref["expo-dev-client-id"];
        if (deviceIds) {
            await ProjectDevices.saveDevicesAsync(this.projectRoot, deviceIds).catch((e)=>Log.exception(e)
            );
        }
    }
    /** Create the bundle URL (points to the single JS entry file). Exposed for testing. */ _getBundleUrl({ platform , mainModuleName , hostname  }) {
        var _mode;
        const path = createBundleUrlPath({
            mode: (_mode = this.options.mode) != null ? _mode : "development",
            minify: this.options.minify,
            platform,
            mainModuleName
        });
        return this.options.constructUrl({
            scheme: "http",
            // hostType: this.options.location.hostType,
            hostname
        }) + path;
    }
    _getBundleUrlPath({ platform , mainModuleName  }) {
        const queryParams = new URLSearchParams({
            platform: encodeURIComponent(platform),
            dev: String(this.options.mode !== "production"),
            // TODO: Is this still needed?
            hot: String(false),
            lazy: String(!_env.env.EXPO_NO_METRO_LAZY)
        });
        if (this.options.minify) {
            queryParams.append("minify", String(this.options.minify));
        }
        return `/${encodeURI(mainModuleName)}.bundle?${queryParams.toString()}`;
    }
    getExpoGoConfig({ mainModuleName , hostname  }) {
        return {
            // localhost:8081
            debuggerHost: this.options.constructUrl({
                scheme: "",
                hostname
            }),
            // http://localhost:8081/logs -- used to send logs to the CLI for displaying in the terminal.
            // This is deprecated in favor of the WebSocket connection setup in Metro.
            logUrl: this.options.constructUrl({
                scheme: "http",
                hostname
            }) + "/logs",
            // Required for Expo Go to function.
            developer: {
                tool: DEVELOPER_TOOL,
                projectRoot: this.projectRoot
            },
            packagerOpts: {
                // Required for dev client.
                dev: this.options.mode !== "production"
            },
            // Indicates the name of the main bundle.
            mainModuleName,
            // Add this string to make Flipper register React Native / Metro as "running".
            // Can be tested by running:
            // `METRO_SERVER_PORT=8081 open -a flipper.app`
            // Where 8081 is the port where the Expo project is being hosted.
            __flipperHack: "React Native packager is running"
        };
    }
    /** Resolve all assets and set them on the manifest as URLs */ async mutateManifestWithAssetsAsync(manifest, bundleUrl) {
        await (0, _resolveAssets).resolveManifestAssets(this.projectRoot, {
            manifest,
            resolver: async (path)=>{
                if (this.options.isNativeWebpack) {
                    // When using our custom dev server, just do assets normally
                    // without the `assets/` subpath redirect.
                    return (0, _url).resolve(bundleUrl.match(/^https?:\/\/.*?\//)[0], path);
                }
                return bundleUrl.match(/^https?:\/\/.*?\//)[0] + "assets/" + path;
            }
        });
        // The server normally inserts this but if we're offline we'll do it here
        await (0, _resolveAssets).resolveGoogleServicesFile(this.projectRoot, manifest);
    }
    getWebBundleUrl() {
        const platform = "web";
        // Read from headers
        const mainModuleName = this.resolveMainModuleName(this.initialProjectConfig, platform);
        return this._getBundleUrlPath({
            platform,
            mainModuleName
        });
    }
    /**
   * Web platforms should create an index.html response using the same script resolution as native.
   *
   * Instead of adding a `bundleUrl` to a `manifest.json` (native) we'll add a `<script src="">`
   * to an `index.html`, this enables the web platform to load JavaScript from the server.
   */ async handleWebRequestAsync(req, res) {
        // Read from headers
        const bundleUrl = this.getWebBundleUrl();
        res.setHeader("Content-Type", "text/html");
        res.end(await (0, _webTemplate).createTemplateHtmlFromExpoConfigAsync(this.projectRoot, {
            exp: this.initialProjectConfig.exp,
            scripts: [
                bundleUrl
            ]
        }));
    }
    /** Exposed for testing. */ async checkBrowserRequestAsync(req, res, next) {
        // Read the config
        const bundlers = (0, _platformBundlers).getPlatformBundlers(this.initialProjectConfig.exp);
        if (bundlers.web === "metro") {
            // NOTE(EvanBacon): This effectively disables the safety check we do on custom runtimes to ensure
            // the `expo-platform` header is included. When `web.bundler=web`, if the user has non-standard Expo
            // code loading then they'll get a web bundle without a clear assertion of platform support.
            const platform = (0, _resolvePlatform).parsePlatformHeader(req);
            // On web, serve the public folder
            if (!platform || platform === "web") {
                var ref;
                if (((ref = this.initialProjectConfig.exp.web) == null ? void 0 : ref.output) === "static") {
                    // Skip the spa-styled index.html when static generation is enabled.
                    next();
                    return true;
                } else {
                    await this.handleWebRequestAsync(req, res);
                    return true;
                }
            }
        }
        return false;
    }
    async handleRequestAsync(req, res, next) {
        // First check for standard JavaScript runtimes (aka legacy browsers like Chrome).
        if (await this.checkBrowserRequestAsync(req, res, next)) {
            return;
        }
        // Save device IDs for dev client.
        await this.saveDevicesAsync(req);
        // Read from headers
        const options = this.getParsedHeaders(req);
        const { body , version , headers  } = await this._getManifestResponseAsync(options);
        for (const [headerName, headerValue] of headers){
            res.setHeader(headerName, headerValue);
        }
        res.end(body);
        // Log analytics
        this.trackManifest(version != null ? version : null);
    }
}
exports.ManifestMiddleware = ManifestMiddleware;

//# sourceMappingURL=ManifestMiddleware.js.map