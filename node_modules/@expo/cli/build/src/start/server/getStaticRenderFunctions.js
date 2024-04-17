"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStaticRenderFunctionsContentAsync = getStaticRenderFunctionsContentAsync;
exports.createMetroEndpointAsync = createMetroEndpointAsync;
exports.requireFileContentsWithMetro = requireFileContentsWithMetro;
exports.requireWithMetro = requireWithMetro;
exports.getStaticRenderFunctions = getStaticRenderFunctions;
var _fs = _interopRequireDefault(require("fs"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _path = _interopRequireDefault(require("path"));
var _requireFromString = _interopRequireDefault(require("require-from-string"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var _ansi = require("../../utils/ansi");
var _delay = require("../../utils/delay");
var _errors = require("../../utils/errors");
var _fn = require("../../utils/fn");
var _profile = require("../../utils/profile");
var _metroErrorInterface = require("./metro/metroErrorInterface");
var _manifestMiddleware = require("./middleware/ManifestMiddleware");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:server:node-renderer");
function wrapBundle(str) {
    // Skip the metro runtime so debugging is a bit easier.
    // Replace the __r() call with an export statement.
    // Use gm to apply to the last require line. This is needed when the bundle has side-effects.
    return str.replace(/^(__r\(.*\);)$/gm, "module.exports = $1");
}
function stripProcess(str) {
    // TODO: Remove from the metro prelude
    return str.replace(/process=this\.process\|\|{},/m, "");
}
// TODO(EvanBacon): Group all the code together and version.
const getRenderModuleId = (projectRoot)=>{
    const moduleId = _resolveFrom.default.silent(projectRoot, "expo-router/node/render.js");
    if (!moduleId) {
        throw new Error(`A version of expo-router with Node.js support is not installed in the project.`);
    }
    return moduleId;
};
const moveStaticRenderFunction = (0, _fn).memoize(async (projectRoot, requiredModuleId)=>{
    // Copy the file into the project to ensure it works in monorepos.
    // This means the file cannot have any relative imports.
    const tempDir = _path.default.join(projectRoot, ".expo/static");
    await _fs.default.promises.mkdir(tempDir, {
        recursive: true
    });
    const moduleId = _path.default.join(tempDir, "render.js");
    await _fs.default.promises.writeFile(moduleId, await _fs.default.promises.readFile(requiredModuleId, "utf8"));
    // Sleep to give watchman time to register the file.
    await (0, _delay).delayAsync(50);
    return moduleId;
});
async function getStaticRenderFunctionsContentAsync(projectRoot, devServerUrl, { dev =false , minify =false , environment  } = {}) {
    const root = (0, _manifestMiddleware).getMetroServerRoot(projectRoot);
    const requiredModuleId = getRenderModuleId(root);
    let moduleId = requiredModuleId;
    // Cannot be accessed using Metro's server API, we need to move the file
    // into the project root and try again.
    if (_path.default.relative(root, moduleId).startsWith("..")) {
        moduleId = await moveStaticRenderFunction(projectRoot, requiredModuleId);
    }
    return requireFileContentsWithMetro(root, devServerUrl, moduleId, {
        dev,
        minify,
        environment
    });
}
async function ensureFileInRootDirectory(projectRoot, otherFile) {
    // Cannot be accessed using Metro's server API, we need to move the file
    // into the project root and try again.
    if (!_path.default.relative(projectRoot, otherFile).startsWith("../")) {
        return otherFile;
    }
    // Copy the file into the project to ensure it works in monorepos.
    // This means the file cannot have any relative imports.
    const tempDir = _path.default.join(projectRoot, ".expo/static-tmp");
    await _fs.default.promises.mkdir(tempDir, {
        recursive: true
    });
    const moduleId = _path.default.join(tempDir, _path.default.basename(otherFile));
    await _fs.default.promises.writeFile(moduleId, await _fs.default.promises.readFile(otherFile, "utf8"));
    // Sleep to give watchman time to register the file.
    await (0, _delay).delayAsync(50);
    return moduleId;
}
async function createMetroEndpointAsync(projectRoot, devServerUrl, absoluteFilePath, { dev =false , platform ="web" , minify =false , environment  } = {}) {
    const root = (0, _manifestMiddleware).getMetroServerRoot(projectRoot);
    const safeOtherFile = await ensureFileInRootDirectory(projectRoot, absoluteFilePath);
    const serverPath = _path.default.relative(root, safeOtherFile).replace(/\.[jt]sx?$/, ".bundle");
    debug("fetching from Metro:", root, serverPath);
    let url = `${devServerUrl}/${serverPath}?platform=${platform}&dev=${dev}&minify=${minify}`;
    if (environment) {
        url += `&resolver.environment=${environment}&transform.environment=${environment}`;
    }
    return url;
}
class MetroNodeError extends Error {
    constructor(message, rawObject){
        super(message);
        this.rawObject = rawObject;
    }
}
exports.MetroNodeError = MetroNodeError;
async function requireFileContentsWithMetro(projectRoot, devServerUrl, absoluteFilePath, props = {}) {
    const url = await createMetroEndpointAsync(projectRoot, devServerUrl, absoluteFilePath, props);
    const res = await (0, _nodeFetch).default(url);
    // TODO: Improve error handling
    if (res.status === 500) {
        const text = await res.text();
        if (text.startsWith('{"originModulePath"') || text.startsWith('{"type":"TransformError"')) {
            const errorObject = JSON.parse(text);
            var ref;
            throw new MetroNodeError((ref = (0, _ansi).stripAnsi(errorObject.message)) != null ? ref : errorObject.message, errorObject);
        }
        throw new Error(`[${res.status}]: ${res.statusText}\n${text}`);
    }
    if (!res.ok) {
        throw new Error(`Error fetching bundle for static rendering: ${res.status} ${res.statusText}`);
    }
    const content = await res.text();
    let bun = wrapBundle(content);
    // This exposes the entire environment to the bundle.
    if (props.environment === "node") {
        bun = stripProcess(bun);
    }
    return bun;
}
async function requireWithMetro(projectRoot, devServerUrl, absoluteFilePath, options = {}) {
    const content = await requireFileContentsWithMetro(projectRoot, devServerUrl, absoluteFilePath, options);
    return evalMetro(content);
}
async function getStaticRenderFunctions(projectRoot, devServerUrl, options = {}) {
    const scriptContents = await getStaticRenderFunctionsContentAsync(projectRoot, devServerUrl, options);
    const contents = evalMetro(scriptContents);
    // wrap each function with a try/catch that uses Metro's error formatter
    return Object.keys(contents).reduce((acc, key)=>{
        const fn = contents[key];
        if (typeof fn !== "function") {
            return {
                ...acc,
                [key]: fn
            };
        }
        acc[key] = async function(...props) {
            try {
                return await fn.apply(this, props);
            } catch (error) {
                await (0, _metroErrorInterface).logMetroError(projectRoot, {
                    error
                });
                throw new _errors.SilentError(error);
            }
        };
        return acc;
    }, {});
}
function evalMetro(src) {
    return (0, _profile).profile(_requireFromString.default, "eval-metro-bundle")(src);
}

//# sourceMappingURL=getStaticRenderFunctions.js.map