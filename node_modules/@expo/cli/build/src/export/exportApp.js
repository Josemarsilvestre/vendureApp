"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exportAppAsync = exportAppAsync;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../log"));
var _resolveFromProject = require("../start/server/metro/resolveFromProject");
var _webTemplate = require("../start/server/webTemplate");
var _dir = require("../utils/dir");
var _env = require("../utils/env");
var _nodeEnv = require("../utils/nodeEnv");
var _createBundles = require("./createBundles");
var _exportAssets = require("./exportAssets");
var _exportStaticAsync = require("./exportStaticAsync");
var _favicon = require("./favicon");
var _getPublicExpoManifest = require("./getPublicExpoManifest");
var _printBundleSizes = require("./printBundleSizes");
var _writeContents = require("./writeContents");
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
async function exportAppAsync(projectRoot, { platforms , outputDir , clear , dev , dumpAssetmap , dumpSourcemap , minify  }) {
    var ref;
    (0, _nodeEnv).setNodeEnv(dev ? "development" : "production");
    require("@expo/env").load(projectRoot);
    const exp = await (0, _getPublicExpoManifest).getPublicExpoManifestAsync(projectRoot);
    const useWebSSG = ((ref = exp.web) == null ? void 0 : ref.output) === "static";
    const publicPath = _path.default.resolve(projectRoot, _env.env.EXPO_PUBLIC_FOLDER);
    const outputPath = _path.default.resolve(projectRoot, outputDir);
    const staticFolder = outputPath;
    const assetsPath = _path.default.join(staticFolder, "assets");
    const bundlesPath = _path.default.join(staticFolder, "bundles");
    await Promise.all([
        assetsPath,
        bundlesPath
    ].map(_dir.ensureDirectoryAsync));
    await copyPublicFolderAsync(publicPath, staticFolder);
    // Run metro bundler and create the JS bundles/source maps.
    const bundles = await (0, _createBundles).createBundlesAsync(projectRoot, {
        resetCache: !!clear
    }, {
        platforms,
        minify,
        // TODO: Breaks asset exports
        // platforms: useWebSSG ? platforms.filter((platform) => platform !== 'web') : platforms,
        dev
    });
    const bundleEntries = Object.entries(bundles);
    if (bundleEntries.length) {
        // Log bundle size info to the user
        (0, _printBundleSizes).printBundleSizes(Object.fromEntries(bundleEntries.map(([key, value])=>{
            if (!dumpSourcemap) {
                return [
                    key,
                    {
                        ...value,
                        // Remove source maps from the bundles if they aren't going to be written.
                        map: undefined
                    }, 
                ];
            }
            return [
                key,
                value
            ];
        })));
    }
    // Write the JS bundles to disk, and get the bundle file names (this could change with async chunk loading support).
    const { hashes , fileNames  } = await (0, _writeContents).writeBundlesAsync({
        bundles,
        outputDir: bundlesPath
    });
    Log.log("Finished saving JS Bundles");
    if (platforms.includes("web")) {
        if (useWebSSG) {
            await (0, _exportStaticAsync).unstable_exportStaticAsync(projectRoot, {
                outputDir: outputPath,
                // TODO: Expose
                minify
            });
            Log.log("Finished saving static files");
        } else {
            const cssLinks = await (0, _exportAssets).exportCssAssetsAsync({
                outputDir,
                bundles
            });
            let html = await (0, _webTemplate).createTemplateHtmlFromExpoConfigAsync(projectRoot, {
                scripts: [
                    `/bundles/${fileNames.web}`
                ],
                cssLinks
            });
            // Add the favicon assets to the HTML.
            const modifyHtml = await (0, _favicon).getVirtualFaviconAssetsAsync(projectRoot, outputDir);
            if (modifyHtml) {
                html = modifyHtml(html);
            }
            // Generate SPA-styled HTML file.
            // If web exists, then write the template HTML file.
            await _fs.default.promises.writeFile(_path.default.join(staticFolder, "index.html"), html);
        }
        // Save assets like a typical bundler, preserving the file paths on web.
        const saveAssets = (0, _resolveFromProject).importCliSaveAssetsFromProject(projectRoot);
        await Promise.all(Object.entries(bundles).map(([platform, bundle])=>{
            return saveAssets(bundle.assets, platform, staticFolder, undefined);
        }));
    }
    const { assets  } = await (0, _exportAssets).exportAssetsAsync(projectRoot, {
        exp,
        outputDir: staticFolder,
        bundles
    });
    if (dumpAssetmap) {
        Log.log("Dumping asset map");
        await (0, _writeContents).writeAssetMapAsync({
            outputDir: staticFolder,
            assets
        });
    }
    // build source maps
    if (dumpSourcemap) {
        Log.log("Dumping source maps");
        await (0, _writeContents).writeSourceMapsAsync({
            bundles,
            hashes,
            outputDir: bundlesPath,
            fileNames
        });
        Log.log("Preparing additional debugging files");
        // If we output source maps, then add a debug HTML file which the user can open in
        // the web browser to inspect the output like web.
        await (0, _writeContents).writeDebugHtmlAsync({
            outputDir: staticFolder,
            fileNames
        });
    }
    // Generate a `metadata.json` and the export is complete.
    await (0, _writeContents).writeMetadataJsonAsync({
        outputDir: staticFolder,
        bundles,
        fileNames
    });
}
/**
 * Copy the contents of the public folder into the output folder.
 * This enables users to add static files like `favicon.ico` or `serve.json`.
 *
 * The contents of this folder are completely universal since they refer to
 * static network requests which fall outside the scope of React Native's magic
 * platform resolution patterns.
 */ async function copyPublicFolderAsync(publicFolder, outputFolder) {
    if (_fs.default.existsSync(publicFolder)) {
        await (0, _dir).copyAsync(publicFolder, outputFolder);
    }
}

//# sourceMappingURL=exportApp.js.map