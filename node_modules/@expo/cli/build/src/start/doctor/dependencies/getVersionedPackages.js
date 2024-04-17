"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCombinedKnownVersionsAsync = getCombinedKnownVersionsAsync;
exports.getRemoteVersionsForSdkAsync = getRemoteVersionsForSdkAsync;
exports.getVersionedPackagesAsync = getVersionedPackagesAsync;
exports.getOperationLog = getOperationLog;
var _npmPackageArg = _interopRequireDefault(require("npm-package-arg"));
var _getVersions = require("../../../api/getVersions");
var _log = require("../../../log");
var _env = require("../../../utils/env");
var _errors = require("../../../utils/errors");
var _bundledNativeModules = require("./bundledNativeModules");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:doctor:dependencies:getVersionedPackages");
/** Adds `react-dom`, `react`, and `react-native` to the list of known package versions (`relatedPackages`) */ function normalizeSdkVersionObject(version) {
    if (!version) {
        return {};
    }
    const { relatedPackages , facebookReactVersion , facebookReactNativeVersion  } = version;
    const reactVersion = facebookReactVersion ? {
        react: facebookReactVersion,
        "react-dom": facebookReactVersion
    } : undefined;
    return {
        ...relatedPackages,
        ...reactVersion,
        "react-native": facebookReactNativeVersion
    };
}
async function getCombinedKnownVersionsAsync({ projectRoot , sdkVersion , skipCache  }) {
    const bundledNativeModules = sdkVersion ? await (0, _bundledNativeModules).getVersionedNativeModulesAsync(projectRoot, sdkVersion) : {};
    const versionsForSdk = await getRemoteVersionsForSdkAsync({
        sdkVersion,
        skipCache
    });
    return {
        ...versionsForSdk,
        ...bundledNativeModules
    };
}
async function getRemoteVersionsForSdkAsync({ sdkVersion , skipCache  } = {}) {
    if (_env.env.EXPO_OFFLINE) {
        _log.Log.warn("Dependency validation is unreliable in offline-mode");
        return {};
    }
    try {
        const { sdkVersions  } = await (0, _getVersions).getVersionsAsync({
            skipCache
        });
        // We only want versioned dependencies so skip if they cannot be found.
        if (!sdkVersion || !(sdkVersion in sdkVersions)) {
            debug(`Skipping versioned dependencies because the SDK version is not found. (sdkVersion: ${sdkVersion}, available: ${Object.keys(sdkVersions).join(", ")})`);
            return {};
        }
        const version = sdkVersions[sdkVersion];
        return normalizeSdkVersionObject(version);
    } catch (error) {
        if (error instanceof _errors.CommandError && error.code === "OFFLINE") {
            return getRemoteVersionsForSdkAsync({
                sdkVersion,
                skipCache
            });
        }
        throw error;
    }
}
async function getVersionedPackagesAsync(projectRoot, { packages , sdkVersion , pkg  }) {
    const versionsForSdk = await getCombinedKnownVersionsAsync({
        projectRoot,
        sdkVersion,
        skipCache: true
    });
    let nativeModulesCount = 0;
    let othersCount = 0;
    const excludedNativeModules = [];
    const versionedPackages = packages.map((arg)=>{
        const { name , type , raw  } = (0, _npmPackageArg).default(arg);
        if ([
            "tag",
            "version",
            "range"
        ].includes(type) && name && versionsForSdk[name]) {
            var ref, ref1, ref2;
            // Unimodule packages from npm registry are modified to use the bundled version.
            // Some packages have the recommended version listed in https://exp.host/--/api/v2/versions.
            if (pkg == null ? void 0 : (ref = pkg.expo) == null ? void 0 : (ref1 = ref.install) == null ? void 0 : (ref2 = ref1.exclude) == null ? void 0 : ref2.includes(name)) {
                othersCount++;
                excludedNativeModules.push({
                    name,
                    bundledNativeVersion: versionsForSdk[name]
                });
                return raw;
            }
            nativeModulesCount++;
            return `${name}@${versionsForSdk[name]}`;
        } else {
            // Other packages are passed through unmodified.
            othersCount++;
            return raw;
        }
    });
    const messages = getOperationLog({
        othersCount,
        nativeModulesCount,
        sdkVersion
    });
    return {
        packages: versionedPackages,
        messages,
        excludedNativeModules
    };
}
function getOperationLog({ nativeModulesCount , sdkVersion , othersCount  }) {
    return [
        nativeModulesCount > 0 && `${nativeModulesCount} SDK ${sdkVersion} compatible native ${nativeModulesCount === 1 ? "module" : "modules"}`,
        othersCount > 0 && `${othersCount} other ${othersCount === 1 ? "package" : "packages"}`, 
    ].filter(Boolean);
}

//# sourceMappingURL=getVersionedPackages.js.map