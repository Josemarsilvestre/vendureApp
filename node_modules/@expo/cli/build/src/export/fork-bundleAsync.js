"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bundleAsync = bundleAsync;
var _config = require("@expo/config");
var _hermesBundler = require("@expo/dev-server/build/HermesBundler");
var _importMetroFromProject = require("@expo/dev-server/build/metro/importMetroFromProject");
var _chalk = _interopRequireDefault(require("chalk"));
var _getCssModulesFromBundler = require("../start/server/metro/getCssModulesFromBundler");
var _instantiateMetro = require("../start/server/metro/instantiateMetro");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let nextBuildID = 0;
// Fork of @expo/dev-server bundleAsync to add Metro logging back.
async function assertEngineMismatchAsync(projectRoot, exp, platform) {
    const isHermesManaged = (0, _hermesBundler).isEnableHermesManaged(exp, platform);
    const paths = (0, _config).getConfigFilePaths(projectRoot);
    var _dynamicConfigPath, ref;
    const configFilePath = (ref = (_dynamicConfigPath = paths.dynamicConfigPath) != null ? _dynamicConfigPath : paths.staticConfigPath) != null ? ref : "app.json";
    await (0, _hermesBundler).maybeThrowFromInconsistentEngineAsync(projectRoot, configFilePath, platform, isHermesManaged);
}
async function bundleAsync(projectRoot, expoConfig, options, bundles) {
    // Assert early so the user doesn't have to wait until bundling is complete to find out that
    // Hermes won't be available.
    await Promise.all(bundles.map(({ platform  })=>assertEngineMismatchAsync(projectRoot, expoConfig, platform)
    ));
    const metro = (0, _importMetroFromProject).importMetroFromProject(projectRoot);
    const Server = (0, _importMetroFromProject).importMetroServerFromProject(projectRoot);
    const { config , reporter  } = await (0, _instantiateMetro).loadMetroConfigAsync(projectRoot, options, {
        exp: expoConfig
    });
    const metroServer = await metro.runMetro(config, {
        watch: false
    });
    const buildAsync = async (bundle)=>{
        const buildID = `bundle_${nextBuildID++}_${bundle.platform}`;
        const isHermes = (0, _hermesBundler).isEnableHermesManaged(expoConfig, bundle.platform);
        var _dev, _minify;
        const bundleOptions = {
            ...Server.DEFAULT_BUNDLE_OPTIONS,
            bundleType: "bundle",
            platform: bundle.platform,
            entryFile: bundle.entryPoint,
            dev: (_dev = bundle.dev) != null ? _dev : false,
            minify: !isHermes && ((_minify = bundle.minify) != null ? _minify : !bundle.dev),
            inlineSourceMap: false,
            sourceMapUrl: bundle.sourceMapUrl,
            createModuleIdFactory: config.serializer.createModuleIdFactory,
            onProgress: (transformedFileCount, totalFileCount)=>{
                if (!options.quiet) {
                    reporter.update({
                        buildID,
                        type: "bundle_transform_progressed",
                        transformedFileCount,
                        totalFileCount
                    });
                }
            }
        };
        const bundleDetails = {
            ...bundleOptions,
            buildID
        };
        reporter.update({
            buildID,
            type: "bundle_build_started",
            bundleDetails
        });
        try {
            const { code , map  } = await metroServer.build(bundleOptions);
            const [assets, css] = await Promise.all([
                metroServer.getAssets(bundleOptions),
                (0, _getCssModulesFromBundler).getCssModulesFromBundler(config, metroServer.getBundler(), bundleOptions), 
            ]);
            reporter.update({
                buildID,
                type: "bundle_build_done"
            });
            return {
                code,
                map,
                assets: assets,
                css
            };
        } catch (error) {
            reporter.update({
                buildID,
                type: "bundle_build_failed"
            });
            throw error;
        }
    };
    const maybeAddHermesBundleAsync = async (bundle, bundleOutput)=>{
        const { platform  } = bundle;
        const isHermesManaged = (0, _hermesBundler).isEnableHermesManaged(expoConfig, platform);
        if (isHermesManaged) {
            const platformTag = _chalk.default.bold({
                ios: "iOS",
                android: "Android",
                web: "Web"
            }[platform] || platform);
            reporter.terminal.log(`${platformTag} Building Hermes bytecode for the bundle`);
            var _minify;
            const hermesBundleOutput = await (0, _hermesBundler).buildHermesBundleAsync(projectRoot, bundleOutput.code, bundleOutput.map, (_minify = bundle.minify) != null ? _minify : !bundle.dev);
            bundleOutput.hermesBytecodeBundle = hermesBundleOutput.hbc;
            bundleOutput.hermesSourcemap = hermesBundleOutput.sourcemap;
        }
        return bundleOutput;
    };
    try {
        const intermediateOutputs = await Promise.all(bundles.map((bundle)=>buildAsync(bundle)
        ));
        const bundleOutputs = [];
        for(let i = 0; i < bundles.length; ++i){
            // hermesc does not support parallel building even we spawn processes.
            // we should build them sequentially.
            bundleOutputs.push(await maybeAddHermesBundleAsync(bundles[i], intermediateOutputs[i]));
        }
        return bundleOutputs;
    } catch (error) {
        // New line so errors don't show up inline with the progress bar
        console.log("");
        throw error;
    } finally{
        metroServer.end();
    }
}

//# sourceMappingURL=fork-bundleAsync.js.map