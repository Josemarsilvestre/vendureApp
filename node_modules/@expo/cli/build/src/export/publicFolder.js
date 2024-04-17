"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserDefinedFile = getUserDefinedFile;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _env = require("../utils/env");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:public-folder");
function getUserDefinedFile(projectRoot, possiblePaths) {
    const publicPath = _path.default.join(projectRoot, _env.env.EXPO_PUBLIC_FOLDER);
    for (const possiblePath of possiblePaths){
        const fullPath = _path.default.join(publicPath, possiblePath);
        if (_fs.default.existsSync(fullPath)) {
            debug(`Found user-defined public file: ` + possiblePath);
            return fullPath;
        }
    }
    return null;
}

//# sourceMappingURL=publicFolder.js.map