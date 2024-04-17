"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveOptions = resolveOptions;
var _path = _interopRequireDefault(require("path"));
var _env = require("../../utils/env");
var _errors = require("../../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function assertIsBoolean(val) {
    if (typeof val !== "boolean") {
        throw new _errors.CommandError(`Expected boolean, got ${typeof val}`);
    }
}
function resolveOptions(args, parsed) {
    var ref;
    const dev = (ref = parsed.args["--dev"]) != null ? ref : true;
    assertIsBoolean(dev);
    var ref1;
    const generateStaticViewConfigs = (ref1 = parsed.args["--generate-static-view-configs"]) != null ? ref1 : true;
    assertIsBoolean(generateStaticViewConfigs);
    var ref2;
    const minify = (ref2 = parsed.args["--minify"]) != null ? ref2 : true;
    assertIsBoolean(minify);
    const entryFile = args["--entry-file"];
    if (!entryFile) {
        throw new _errors.CommandError(`Missing required argument: --entry-file`);
    }
    const bundleOutput = args["--bundle-output"];
    if (!bundleOutput) {
        throw new _errors.CommandError(`Missing required argument: --bundle-output`);
    }
    var ref3, ref4, ref5, ref6;
    return {
        entryFile,
        assetCatalogDest: args["--asset-catalog-dest"],
        platform: (ref3 = args["--platform"]) != null ? ref3 : "ios",
        transformer: args["--transformer"],
        // TODO: Support `--dev false`
        //   dev: false,
        bundleOutput,
        bundleEncoding: (ref4 = args["--bundle-encoding"]) != null ? ref4 : "utf8",
        maxWorkers: args["--max-workers"],
        sourcemapOutput: args["--sourcemap-output"],
        sourcemapSourcesRoot: args["--sourcemap-sources-root"],
        sourcemapUseAbsolutePath: !!parsed.args["--sourcemap-use-absolute-path"],
        assetsDest: args["--assets-dest"],
        unstableTransformProfile: (ref5 = args["--unstable-transform-profile"]) != null ? ref5 : "default",
        resetCache: !!parsed.args["--reset-cache"],
        resetGlobalCache: false,
        verbose: (ref6 = args["--verbose"]) != null ? ref6 : _env.env.EXPO_DEBUG,
        config: args["--config"] ? _path.default.resolve(args["--config"]) : undefined,
        dev,
        generateStaticViewConfigs,
        minify
    };
}

//# sourceMappingURL=resolveOptions.js.map