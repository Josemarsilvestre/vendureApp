function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { NativeReanimated } from '../NativeReanimated/NativeReanimated';
import { SensorType } from '../commonTypes';
export default class JSReanimated extends NativeReanimated {
  constructor() {
    super(false);
    _defineProperty(this, "nextSensorId", 0);
    _defineProperty(this, "sensors", new Map());
  }
  makeShareableClone(value) {
    return {
      __hostObjectShareableJSRef: value
    };
  }
  installCoreFunctions(_callGuard, _valueUnpacker) {
    // noop
  }
  scheduleOnUI(worklet) {
    // @ts-ignore web implementation has still not been updated after the rewrite, this will be addressed once the web implementation updates are ready
    requestAnimationFrame(worklet);
  }
  registerEventHandler(_eventHash, _eventHandler) {
    // noop
    return '';
  }
  unregisterEventHandler(_) {
    // noop
  }
  enableLayoutAnimations() {
    console.warn('[Reanimated] Layout Animations are not supported on web yet.');
  }
  configureLayoutAnimation() {
    // no-op
  }
  registerSensor(sensorType, interval, iosReferenceFrame, eventHandler) {
    if (!(this.getSensorName(sensorType) in window)) {
      return -1;
    }
    const sensor = this.initializeSensor(sensorType, interval);
    let callback;
    if (sensorType === SensorType.ROTATION) {
      callback = () => {
        const [qw, qx, qy, qz] = sensor.quaternion;

        // reference: https://stackoverflow.com/questions/5782658/extracting-yaw-from-a-quaternion
        const yaw = Math.atan2(2.0 * (qy * qz + qw * qx), qw * qw - qx * qx - qy * qy + qz * qz);
        const pitch = Math.sin(-2.0 * (qx * qz - qw * qy));
        const roll = Math.atan2(2.0 * (qx * qy + qw * qz), qw * qw + qx * qx - qy * qy - qz * qz);
        eventHandler({
          qw,
          qx,
          qy,
          qz,
          yaw,
          pitch,
          roll,
          interfaceOrientation: 0
        });
      };
    } else {
      callback = () => {
        const {
          x,
          y,
          z
        } = sensor;
        eventHandler({
          x,
          y,
          z,
          interfaceOrientation: 0
        });
      };
    }
    sensor.addEventListener('reading', callback);
    sensor.start();
    this.sensors.set(this.nextSensorId, sensor);
    return this.nextSensorId++;
  }
  unregisterSensor(id) {
    const sensor = this.sensors.get(id);
    if (sensor !== undefined) {
      sensor.stop();
      this.sensors.delete(id);
    }
  }
  subscribeForKeyboardEvents(_) {
    console.warn('[Reanimated] useAnimatedKeyboard is not available on web yet.');
    return -1;
  }
  unsubscribeFromKeyboardEvents(_) {
    // noop
  }
  initializeSensor(sensorType, interval) {
    const config = interval <= 0 ? {
      referenceFrame: 'device'
    } : {
      frequency: 1000 / interval
    };
    switch (sensorType) {
      case SensorType.ACCELEROMETER:
        return new window.Accelerometer(config);
      case SensorType.GYROSCOPE:
        return new window.Gyroscope(config);
      case SensorType.GRAVITY:
        return new window.GravitySensor(config);
      case SensorType.MAGNETIC_FIELD:
        return new window.Magnetometer(config);
      case SensorType.ROTATION:
        return new window.AbsoluteOrientationSensor(config);
    }
  }
  getSensorName(sensorType) {
    switch (sensorType) {
      case SensorType.ACCELEROMETER:
        return 'Accelerometer';
      case SensorType.GRAVITY:
        return 'GravitySensor';
      case SensorType.GYROSCOPE:
        return 'Gyroscope';
      case SensorType.MAGNETIC_FIELD:
        return 'Magnetometer';
      case SensorType.ROTATION:
        return 'AbsoluteOrientationSensor';
    }
  }
}
//# sourceMappingURL=JSReanimated.js.map