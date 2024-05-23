import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  label: {
    fontSize: moderateScale(15),
    marginBottom: moderateScale(5),
  },
  dropdownButton: {
    backgroundColor: "#fff",
    padding: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: "#ccc",
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(20),
  },
  option: {
    padding: moderateScale(10),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "#ccc",
  },
});
