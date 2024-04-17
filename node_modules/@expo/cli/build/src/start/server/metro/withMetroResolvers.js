"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultMetroResolver = getDefaultMetroResolver;
exports.withMetroResolvers = withMetroResolvers;
var _metroErrors = require("./metroErrors");
var _resolveFromProject = require("./resolveFromProject");
const debug = require("debug")("expo:metro:withMetroResolvers");
function getDefaultMetroResolver(projectRoot) {
    const { resolve  } = (0, _resolveFromProject).importMetroResolverFromProject(projectRoot);
    return (context, moduleName, platform)=>{
        return resolve(context, moduleName, platform);
    };
}
function withMetroResolvers(config, projectRoot, resolvers) {
    debug(`Appending ${resolvers.length} custom resolvers to Metro config. (has custom resolver: ${!!config.resolver.resolveRequest})`);
    const originalResolveRequest = config.resolver.resolveRequest || getDefaultMetroResolver(projectRoot);
    return {
        ...config,
        resolver: {
            ...config.resolver,
            resolveRequest (context, moduleName, platform) {
                const universalContext = {
                    ...context,
                    preferNativePlatform: platform !== "web"
                };
                for (const resolver of resolvers){
                    try {
                        const resolution = resolver(universalContext, moduleName, platform);
                        if (resolution) {
                            return resolution;
                        }
                    } catch (error) {
                        // If no user-defined resolver, use Expo's default behavior.
                        // This prevents extraneous resolution attempts on failure.
                        if (!config.resolver.resolveRequest) {
                            throw error;
                        }
                        // If the error is directly related to a resolver not being able to resolve a module, then
                        // we can ignore the error and try the next resolver. Otherwise, we should throw the error.
                        const isResolutionError = (0, _metroErrors).isFailedToResolveNameError(error) || (0, _metroErrors).isFailedToResolvePathError(error);
                        if (!isResolutionError) {
                            throw error;
                        }
                        debug(`Custom resolver threw: ${error.constructor.name}. (module: ${moduleName}, platform: ${platform})`);
                    }
                }
                // If we haven't returned by now, use the original resolver or upstream resolver.
                return originalResolveRequest(universalContext, moduleName, platform);
            }
        }
    };
}

//# sourceMappingURL=withMetroResolvers.js.map