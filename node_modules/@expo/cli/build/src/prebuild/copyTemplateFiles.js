"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCopyFilesSuccessMessage = createCopyFilesSuccessMessage;
exports.copyTemplateFilesAsync = copyTemplateFilesAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _dir = require("../utils/dir");
var _mergeGitIgnorePaths = require("../utils/mergeGitIgnorePaths");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:prebuild:copyTemplateFiles");
/**
 * Return true if the given platforms all have an internal `.gitignore` file.
 *
 * @param projectRoot
 * @param platforms
 */ function hasAllPlatformSpecificGitIgnores(projectRoot, platforms) {
    return platforms.reduce((p, platform)=>p && _fs.default.existsSync(_path.default.join(projectRoot, platform, ".gitignore"))
    , true);
}
function createCopyFilesSuccessMessage(platforms, { skippedPaths , gitignore  }) {
    let message = `Created native project${platforms.length > 1 ? "s" : ""}`;
    if (skippedPaths.length) {
        message += _chalk.default.dim(` | ${skippedPaths.map((path)=>_chalk.default.bold(`/${path}`)
        ).join(", ")} already created`);
    }
    if (!gitignore) {
        message += _chalk.default.dim(` | gitignore skipped`);
    } else if (!gitignore.didMerge) {
        message += _chalk.default.dim(` | gitignore already synced`);
    } else if (gitignore.didMerge && gitignore.didClear) {
        message += _chalk.default.dim(` | synced gitignore`);
    }
    return message;
}
async function copyTemplateFilesAsync(projectRoot, { templateDirectory , platforms  }) {
    const copyResults = await copyPathsFromTemplateAsync(projectRoot, {
        templateDirectory,
        copyFilePaths: platforms
    });
    const hasPlatformSpecificGitIgnores = hasAllPlatformSpecificGitIgnores(templateDirectory, platforms);
    debug(`All platforms have an internal gitignore: ${hasPlatformSpecificGitIgnores}`);
    // TODO: Remove gitignore modifications -- maybe move to `npx expo-doctor`
    const gitignore = hasPlatformSpecificGitIgnores ? null : (0, _mergeGitIgnorePaths).mergeGitIgnorePaths(_path.default.join(projectRoot, ".gitignore"), _path.default.join(templateDirectory, ".gitignore"));
    return {
        ...copyResults,
        gitignore
    };
}
async function copyPathsFromTemplateAsync(/** File path to the project. */ projectRoot, { templateDirectory , copyFilePaths  }) {
    const copiedPaths = [];
    const skippedPaths = [];
    for (const copyFilePath of copyFilePaths){
        const projectPath = _path.default.join(projectRoot, copyFilePath);
        if (!await (0, _dir).directoryExistsAsync(projectPath)) {
            copiedPaths.push(copyFilePath);
            (0, _dir).copySync(_path.default.join(templateDirectory, copyFilePath), projectPath);
        } else {
            skippedPaths.push(copyFilePath);
        }
    }
    debug(`Copied files:`, copiedPaths);
    debug(`Skipped files:`, copiedPaths);
    return {
        copiedPaths,
        skippedPaths
    };
}

//# sourceMappingURL=copyTemplateFiles.js.map