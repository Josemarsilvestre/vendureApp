"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updatePackageJSONAsync = updatePackageJSONAsync;
exports.updatePkgDependencies = updatePkgDependencies;
exports.createDependenciesMap = createDependenciesMap;
exports.hashForDependencyMap = hashForDependencyMap;
exports.createFileHash = createFileHash;
var _config = require("@expo/config");
var _chalk = _interopRequireDefault(require("chalk"));
var _crypto = _interopRequireDefault(require("crypto"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _semver = require("semver");
var Log = _interopRequireWildcard(require("../log"));
var _isModuleSymlinked = require("../utils/isModuleSymlinked");
var _ora = require("../utils/ora");
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
async function updatePackageJSONAsync(projectRoot, { templateDirectory , pkg , skipDependencyUpdate  }) {
    const updatingPackageJsonStep = (0, _ora).logNewSection("Updating your package.json scripts, dependencies, and main file");
    const templatePkg = (0, _config).getPackageJson(templateDirectory);
    const results = modifyPackageJson(projectRoot, {
        templatePkg,
        pkg,
        skipDependencyUpdate
    });
    await _fs.default.promises.writeFile(_path.default.resolve(projectRoot, "package.json"), // Add new line to match the format of running yarn.
    // This prevents the `package.json` from changing when running `prebuild --no-install` multiple times.
    JSON.stringify(pkg, null, 2) + "\n");
    updatingPackageJsonStep.succeed("Updated package.json and added index.js entry point for iOS and Android");
    return results;
}
/**
 * Make required modifications to the `package.json` file as a JSON object.
 *
 * 1. Update `package.json` `scripts`.
 * 2. Update `package.json` `dependencies` and `devDependencies`.
 * 3. Update `package.json` `main`.
 *
 * @param projectRoot The root directory of the project.
 * @param props.templatePkg Template project package.json as JSON.
 * @param props.pkg Current package.json as JSON.
 * @param props.skipDependencyUpdate Array of dependencies to skip updating.
 * @returns
 */ function modifyPackageJson(projectRoot, { templatePkg , pkg , skipDependencyUpdate  }) {
    updatePkgScripts({
        pkg
    });
    // TODO: Move to `npx expo-doctor`
    return updatePkgDependencies(projectRoot, {
        pkg,
        templatePkg,
        skipDependencyUpdate
    });
}
function updatePkgDependencies(projectRoot, { pkg: pkg1 , templatePkg , skipDependencyUpdate =[]  }) {
    if (!pkg1.devDependencies) {
        pkg1.devDependencies = {};
    }
    const { dependencies , devDependencies  } = templatePkg;
    const defaultDependencies = createDependenciesMap(dependencies);
    const defaultDevDependencies = createDependenciesMap(devDependencies);
    const combinedDependencies = createDependenciesMap({
        ...defaultDependencies,
        ...pkg1.dependencies
    });
    // These dependencies are only added, not overwritten from the project
    const requiredDependencies = [
        "expo",
        "expo-splash-screen",
        "react",
        "react-native"
    ].filter((depKey)=>!!defaultDependencies[depKey]
    );
    const symlinkedPackages = [];
    const nonRecommendedPackages = [];
    for (const dependenciesKey of requiredDependencies){
        var ref;
        // If the local package.json defined the dependency that we want to overwrite...
        if ((ref = pkg1.dependencies) == null ? void 0 : ref[dependenciesKey]) {
            // Then ensure it isn't symlinked (i.e. the user has a custom version in their yarn workspace).
            if ((0, _isModuleSymlinked).isModuleSymlinked(projectRoot, {
                moduleId: dependenciesKey,
                isSilent: true
            })) {
                // If the package is in the project's package.json and it's symlinked, then skip overwriting it.
                symlinkedPackages.push(dependenciesKey);
                continue;
            }
            // Do not modify manually skipped dependencies
            if (skipDependencyUpdate.includes(dependenciesKey)) {
                continue;
            }
            // Warn users for outdated dependencies when prebuilding
            const hasRecommendedVersion = versionRangesIntersect(pkg1.dependencies[dependenciesKey], String(defaultDependencies[dependenciesKey]));
            if (!hasRecommendedVersion) {
                nonRecommendedPackages.push(`${dependenciesKey}@${defaultDependencies[dependenciesKey]}`);
            }
        }
    }
    if (symlinkedPackages.length) {
        Log.log(`\u203A Using symlinked ${symlinkedPackages.map((pkg)=>_chalk.default.bold(pkg)
        ).join(", ")} instead of recommended version(s).`);
    }
    if (nonRecommendedPackages.length) {
        Log.warn(`\u203A Using current versions instead of recommended ${nonRecommendedPackages.map((pkg)=>_chalk.default.bold(pkg)
        ).join(", ")}.`);
    }
    const combinedDevDependencies = createDependenciesMap({
        ...defaultDevDependencies,
        ...pkg1.devDependencies
    });
    // Only change the dependencies if the normalized hash changes, this helps to reduce meaningless changes.
    const hasNewDependencies = hashForDependencyMap(pkg1.dependencies) !== hashForDependencyMap(combinedDependencies);
    const hasNewDevDependencies = hashForDependencyMap(pkg1.devDependencies) !== hashForDependencyMap(combinedDevDependencies);
    // Save the dependencies
    if (hasNewDependencies) {
        var _dependencies;
        // Use Object.assign to preserve the original order of dependencies, this makes it easier to see what changed in the git diff.
        pkg1.dependencies = Object.assign((_dependencies = pkg1.dependencies) != null ? _dependencies : {}, combinedDependencies);
    }
    if (hasNewDevDependencies) {
        var _devDependencies;
        // Same as with dependencies
        pkg1.devDependencies = Object.assign((_devDependencies = pkg1.devDependencies) != null ? _devDependencies : {}, combinedDevDependencies);
    }
    return {
        hasNewDependencies,
        hasNewDevDependencies
    };
}
function createDependenciesMap(dependencies) {
    if (typeof dependencies !== "object") {
        throw new Error(`Dependency map is invalid, expected object but got ${typeof dependencies}`);
    } else if (!dependencies) {
        return {};
    }
    const outputMap = {};
    for (const key of Object.keys(dependencies)){
        const value = dependencies[key];
        if (typeof value === "string") {
            outputMap[key] = value;
        } else {
            throw new Error(`Dependency for key \`${key}\` should be a \`string\`, instead got: \`{ ${key}: ${JSON.stringify(value)} }\``);
        }
    }
    return outputMap;
}
/**
 * Update package.json scripts - `npm start` should default to `expo
 * start --dev-client` rather than `expo start` after ejecting, for example.
 */ function updatePkgScripts({ pkg  }) {
    var ref, ref1;
    if (!pkg.scripts) {
        pkg.scripts = {};
    }
    if (!((ref = pkg.scripts.android) == null ? void 0 : ref.includes("run"))) {
        pkg.scripts.android = "expo run:android";
    }
    if (!((ref1 = pkg.scripts.ios) == null ? void 0 : ref1.includes("run"))) {
        pkg.scripts.ios = "expo run:ios";
    }
}
function normalizeDependencyMap(deps) {
    return Object.keys(deps).map((dependency)=>`${dependency}@${deps[dependency]}`
    ).sort();
}
function hashForDependencyMap(deps = {}) {
    const depsList = normalizeDependencyMap(deps);
    const depsString = depsList.join("\n");
    return createFileHash(depsString);
}
function createFileHash(contents) {
    // this doesn't need to be secure, the shorter the better.
    return _crypto.default.createHash("sha1").update(contents).digest("hex");
}
/**
 * Determine if two semver ranges are overlapping or intersecting.
 * This is a safe version of `semver.intersects` that does not throw.
 */ function versionRangesIntersect(rangeA, rangeB) {
    try {
        return (0, _semver).intersects(rangeA, rangeB);
    } catch  {
        return false;
    }
}

//# sourceMappingURL=updatePackageJson.js.map