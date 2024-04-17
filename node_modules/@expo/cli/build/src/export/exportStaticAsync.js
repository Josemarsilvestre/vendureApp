"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unstable_exportStaticAsync = unstable_exportStaticAsync;
exports.getFilesToExportFromServerAsync = getFilesToExportFromServerAsync;
exports.exportFromServerAsync = exportFromServerAsync;
exports.getHtmlFiles = getHtmlFiles;
exports.getPathVariations = getPathVariations;
var _assert = _interopRequireDefault(require("assert"));
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _prettyBytes = _interopRequireDefault(require("pretty-bytes"));
var _util = require("util");
var _log = require("../log");
var _devServerManager = require("../start/server/DevServerManager");
var _metroBundlerDevServer = require("../start/server/metro/MetroBundlerDevServer");
var _metroErrorInterface = require("../start/server/metro/metroErrorInterface");
var _favicon = require("./favicon");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:export:generateStaticRoutes");
async function unstable_exportStaticAsync(projectRoot, options) {
    // NOTE(EvanBacon): Please don't use this feature.
    _log.Log.warn("Static exporting with Metro is an experimental feature.");
    const devServerManager = new _devServerManager.DevServerManager(projectRoot, {
        minify: options.minify,
        mode: "production",
        location: {}
    });
    await devServerManager.startAsync([
        {
            type: "metro"
        }, 
    ]);
    await exportFromServerAsync(projectRoot, devServerManager, options);
    await devServerManager.stopAsync();
}
/** Match `(page)` -> `page` */ function matchGroupName(name) {
    var ref;
    return (ref = name.match(/^\(([^/]+?)\)$/)) == null ? void 0 : ref[1];
}
async function getFilesToExportFromServerAsync(projectRoot, { manifest , renderAsync  }) {
    // name : contents
    const files = new Map();
    await Promise.all(getHtmlFiles({
        manifest
    }).map(async (outputPath)=>{
        const pathname = outputPath.replace(/(index)?\.html$/, "");
        try {
            files.set(outputPath, "");
            const data = await renderAsync(pathname);
            files.set(outputPath, data);
        } catch (e) {
            await (0, _metroErrorInterface).logMetroErrorAsync({
                error: e,
                projectRoot
            });
            throw new Error("Failed to statically export route: " + pathname);
        }
    }));
    return files;
}
async function exportFromServerAsync(projectRoot, devServerManager, { outputDir , minify  }) {
    const injectFaviconTag = await (0, _favicon).getVirtualFaviconAssetsAsync(projectRoot, outputDir);
    const devServer = devServerManager.getDefaultDevServer();
    (0, _assert).default(devServer instanceof _metroBundlerDevServer.MetroBundlerDevServer);
    const [manifest, resources, renderAsync] = await Promise.all([
        devServer.getRoutesAsync(),
        devServer.getStaticResourcesAsync({
            mode: "production",
            minify
        }),
        devServer.getStaticRenderFunctionAsync({
            mode: "production",
            minify
        }), 
    ]);
    debug("Routes:\n", (0, _util).inspect(manifest, {
        colors: true,
        depth: null
    }));
    const files = await getFilesToExportFromServerAsync(projectRoot, {
        manifest,
        async renderAsync (pathname) {
            const template = await renderAsync(pathname);
            let html = await devServer.composeResourcesWithHtml({
                mode: "production",
                resources,
                template
            });
            if (injectFaviconTag) {
                html = injectFaviconTag(html);
            }
            return html;
        }
    });
    resources.forEach((resource)=>{
        files.set(resource.filename, resource.source);
    });
    _fs.default.mkdirSync(_path.default.join(outputDir), {
        recursive: true
    });
    _log.Log.log("");
    _log.Log.log(_chalk.default.bold`Exporting ${files.size} files:`);
    await Promise.all([
        ...files.entries()
    ].sort(([a], [b])=>a.localeCompare(b)
    ).map(async ([file, contents])=>{
        const length = Buffer.byteLength(contents, "utf8");
        _log.Log.log(file, _chalk.default.gray`(${(0, _prettyBytes).default(length)})`);
        const outputPath = _path.default.join(outputDir, file);
        await _fs.default.promises.mkdir(_path.default.dirname(outputPath), {
            recursive: true
        });
        await _fs.default.promises.writeFile(outputPath, contents);
    }));
    _log.Log.log("");
}
function getHtmlFiles({ manifest  }) {
    const htmlFiles = new Set();
    function traverseScreens(screens, basePath = "") {
        for (const value of Object.values(screens)){
            if (typeof value === "string") {
                let filePath = basePath + value;
                if (value === "") {
                    filePath = basePath === "" ? "index" : basePath.endsWith("/") ? basePath + "index" : basePath.slice(0, -1);
                }
                // TODO: Dedupe requests for alias routes.
                addOptionalGroups(filePath);
            } else if (typeof value === "object" && (value == null ? void 0 : value.screens)) {
                const newPath = basePath + value.path + "/";
                traverseScreens(value.screens, newPath);
            }
        }
    }
    function addOptionalGroups(path) {
        const variations = getPathVariations(path);
        for (const variation of variations){
            htmlFiles.add(variation);
        }
    }
    traverseScreens(manifest.screens);
    return Array.from(htmlFiles).map((value)=>{
        const parts = value.split("/");
        // Replace `:foo` with `[foo]` and `*foo` with `[...foo]`
        const partsWithGroups = parts.map((part)=>{
            if (part.startsWith(":")) {
                return `[${part.slice(1)}]`;
            } else if (part.startsWith("*")) {
                return `[...${part.slice(1)}]`;
            }
            return part;
        });
        return partsWithGroups.join("/") + ".html";
    });
}
function getPathVariations(routePath) {
    const variations = new Set([
        routePath
    ]);
    const segments1 = routePath.split("/");
    function generateVariations(segments, index) {
        if (index >= segments.length) {
            return;
        }
        const newSegments = [
            ...segments
        ];
        while(index < newSegments.length && matchGroupName(newSegments[index]) && newSegments.length > 1){
            newSegments.splice(index, 1);
            variations.add(newSegments.join("/"));
            generateVariations(newSegments, index + 1);
        }
        generateVariations(segments, index + 1);
    }
    generateVariations(segments1, 0);
    return Array.from(variations);
}

//# sourceMappingURL=exportStaticAsync.js.map