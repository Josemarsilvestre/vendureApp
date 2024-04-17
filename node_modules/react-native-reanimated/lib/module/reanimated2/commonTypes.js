// The below type is used for HostObjects retured by the JSI API that don't have
// any accessable fields or methods but can carry data that is accessed from the
// c++ side. We add a field to the type to make it possible for typescript to recognize
// which JSI methods accept those types as arguments and to be able to correctly type
// check other methods that may use them. However, this field is not actually defined
// nor should be used for anything else as assigning any data to those objects will
// throw an error.
export let SensorType = /*#__PURE__*/function (SensorType) {
  SensorType[SensorType["ACCELEROMETER"] = 1] = "ACCELEROMETER";
  SensorType[SensorType["GYROSCOPE"] = 2] = "GYROSCOPE";
  SensorType[SensorType["GRAVITY"] = 3] = "GRAVITY";
  SensorType[SensorType["MAGNETIC_FIELD"] = 4] = "MAGNETIC_FIELD";
  SensorType[SensorType["ROTATION"] = 5] = "ROTATION";
  return SensorType;
}({});
export let IOSReferenceFrame = /*#__PURE__*/function (IOSReferenceFrame) {
  IOSReferenceFrame[IOSReferenceFrame["XArbitraryZVertical"] = 0] = "XArbitraryZVertical";
  IOSReferenceFrame[IOSReferenceFrame["XArbitraryCorrectedZVertical"] = 1] = "XArbitraryCorrectedZVertical";
  IOSReferenceFrame[IOSReferenceFrame["XMagneticNorthZVertical"] = 2] = "XMagneticNorthZVertical";
  IOSReferenceFrame[IOSReferenceFrame["XTrueNorthZVertical"] = 3] = "XTrueNorthZVertical";
  IOSReferenceFrame[IOSReferenceFrame["Auto"] = 4] = "Auto";
  return IOSReferenceFrame;
}({});
export let InterfaceOrientation = /*#__PURE__*/function (InterfaceOrientation) {
  InterfaceOrientation[InterfaceOrientation["ROTATION_0"] = 0] = "ROTATION_0";
  InterfaceOrientation[InterfaceOrientation["ROTATION_90"] = 90] = "ROTATION_90";
  InterfaceOrientation[InterfaceOrientation["ROTATION_180"] = 180] = "ROTATION_180";
  InterfaceOrientation[InterfaceOrientation["ROTATION_270"] = 270] = "ROTATION_270";
  return InterfaceOrientation;
}({});
export let KeyboardState = /*#__PURE__*/function (KeyboardState) {
  KeyboardState[KeyboardState["UNKNOWN"] = 0] = "UNKNOWN";
  KeyboardState[KeyboardState["OPENING"] = 1] = "OPENING";
  KeyboardState[KeyboardState["OPEN"] = 2] = "OPEN";
  KeyboardState[KeyboardState["CLOSING"] = 3] = "CLOSING";
  KeyboardState[KeyboardState["CLOSED"] = 4] = "CLOSED";
  return KeyboardState;
}({});
//# sourceMappingURL=commonTypes.js.map