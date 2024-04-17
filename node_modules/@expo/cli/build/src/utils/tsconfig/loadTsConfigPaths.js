"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadTsConfigPathsAsync = loadTsConfigPathsAsync;
exports.readTsconfigAsync = readTsconfigAsync;
var _jsonFile = _interopRequireDefault(require("@expo/json-file"));
var _path = _interopRequireDefault(require("path"));
var _dir = require("../dir");
var _evaluateTsConfig = require("./evaluateTsConfig");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:utils:tsconfig:load");
async function loadTsConfigPathsAsync(dir) {
    var ref;
    const options = (ref = await readTsconfigAsync(dir)) != null ? ref : await readJsconfigAsync(dir);
    if (options) {
        var ref1, ref2;
        const [filepath, config] = options;
        if ((ref1 = config.compilerOptions) == null ? void 0 : ref1.baseUrl) {
            var ref3;
            return {
                paths: (ref3 = config.compilerOptions) == null ? void 0 : ref3.paths,
                baseUrl: _path.default.resolve(dir, config.compilerOptions.baseUrl)
            };
        }
        debug(`No baseUrl found in ${filepath}`);
        return {
            paths: (ref2 = config.compilerOptions) == null ? void 0 : ref2.paths,
            baseUrl: dir
        };
    }
    return null;
}
async function readJsconfigAsync(projectRoot) {
    const configPath = _path.default.join(projectRoot, "jsconfig.json");
    if (await (0, _dir).fileExistsAsync(configPath)) {
        const config = await _jsonFile.default.readAsync(configPath, {
            json5: true
        });
        if (config) {
            return [
                configPath,
                config
            ];
        }
    }
    return null;
}
async function readTsconfigAsync(projectRoot) {
    const configPath = _path.default.join(projectRoot, "tsconfig.json");
    if (await (0, _dir).fileExistsAsync(configPath)) {
        // We need to fully evaluate the tsconfig to get the baseUrl and paths in case they were applied in `extends`.
        const ts = (0, _evaluateTsConfig).importTypeScriptFromProjectOptionally(projectRoot);
        if (ts) {
            return [
                configPath,
                (0, _evaluateTsConfig).evaluateTsConfig(ts, configPath)
            ];
        }
        debug(`typescript module not found in: ${projectRoot}`);
    }
    return null;
}

//# sourceMappingURL=loadTsConfigPaths.js.map