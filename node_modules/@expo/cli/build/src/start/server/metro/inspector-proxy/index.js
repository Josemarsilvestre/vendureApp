"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExpoInspectorProxy", {
    enumerable: true,
    get: function() {
        return _proxy.ExpoInspectorProxy;
    }
});
exports.createInspectorProxy = createInspectorProxy;
var _resolveFromProject = require("../resolveFromProject");
var _device = require("./device");
var _proxy = require("./proxy");
const debug = require("debug")("expo:metro:inspector-proxy");
function createInspectorProxy(metroBundler, projectRoot) {
    debug("Expo inspector proxy enabled");
    // Import the installed `metro-inspector-proxy` from the project
    // We use these base classes to extend functionality
    const { InspectorProxy: MetroInspectorProxy  } = (0, _resolveFromProject).importMetroInspectorProxyFromProject(projectRoot);
    // The device is slightly more complicated, we need to extend that class
    const ExpoInspectorDevice = (0, _device).createInspectorDeviceClass(metroBundler, (0, _resolveFromProject).importMetroInspectorDeviceFromProject(projectRoot));
    const inspectorProxy = new _proxy.ExpoInspectorProxy(new MetroInspectorProxy(projectRoot), ExpoInspectorDevice);
    return inspectorProxy;
}

//# sourceMappingURL=index.js.map