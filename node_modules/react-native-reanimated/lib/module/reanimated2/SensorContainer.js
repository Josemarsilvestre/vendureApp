function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import Sensor from './Sensor';
export class SensorContainer {
  constructor() {
    _defineProperty(this, "nativeSensors", new Map());
  }
  getSensorId(sensorType, config) {
    return sensorType * 100 + config.iosReferenceFrame * 10 + Number(config.adjustToInterfaceOrientation);
  }
  initializeSensor(sensorType, config) {
    const sensorId = this.getSensorId(sensorType, config);
    if (!this.nativeSensors.has(sensorId)) {
      const newSensor = new Sensor(sensorType, config);
      this.nativeSensors.set(sensorId, newSensor);
    }
    const sensor = this.nativeSensors.get(sensorId);
    return sensor.getSharedValue();
  }
  registerSensor(sensorType, config, handler) {
    const sensorId = this.getSensorId(sensorType, config);
    if (!this.nativeSensors.has(sensorId)) {
      return -1;
    }
    const sensor = this.nativeSensors.get(sensorId);
    if (sensor && sensor.isAvailable() && (sensor.isRunning() || sensor.register(handler))) {
      sensor.listenersNumber++;
      return sensorId;
    }
    return -1;
  }
  unregisterSensor(sensorId) {
    if (this.nativeSensors.has(sensorId)) {
      const sensor = this.nativeSensors.get(sensorId);
      if (sensor && sensor.isRunning()) {
        sensor.listenersNumber--;
        if (sensor.listenersNumber === 0) {
          sensor.unregister();
        }
      }
    }
  }
}
//# sourceMappingURL=SensorContainer.js.map