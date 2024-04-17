function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import NativeReanimatedModule from './NativeReanimated';
import { SensorType } from './commonTypes';
import { makeMutable } from './mutables';
function initSensorData(sensorType) {
  if (sensorType === SensorType.ROTATION) {
    return makeMutable({
      qw: 0,
      qx: 0,
      qy: 0,
      qz: 0,
      yaw: 0,
      pitch: 0,
      roll: 0,
      interfaceOrientation: 0
    });
  } else {
    return makeMutable({
      x: 0,
      y: 0,
      z: 0,
      interfaceOrientation: 0
    });
  }
}
export default class Sensor {
  constructor(sensorType, config) {
    _defineProperty(this, "listenersNumber", 0);
    _defineProperty(this, "sensorId", null);
    _defineProperty(this, "sensorType", void 0);
    _defineProperty(this, "data", void 0);
    _defineProperty(this, "config", void 0);
    this.sensorType = sensorType;
    this.config = config;
    this.data = initSensorData(sensorType);
  }
  register(eventHandler) {
    const config = this.config;
    const sensorType = this.sensorType;
    this.sensorId = NativeReanimatedModule.registerSensor(sensorType, config.interval === 'auto' ? -1 : config.interval, config.iosReferenceFrame, eventHandler);
    return this.sensorId !== -1;
  }
  isRunning() {
    return this.sensorId !== -1 && this.sensorId !== null;
  }
  isAvailable() {
    return this.sensorId !== -1;
  }
  getSharedValue() {
    return this.data;
  }
  unregister() {
    if (this.sensorId !== null && this.sensorId !== -1) {
      NativeReanimatedModule.unregisterSensor(this.sensorId);
    }
    this.sensorId = null;
  }
}
//# sourceMappingURL=Sensor.js.map