import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    margin: moderateScale(18, 0.1),
    justifyContent: "center",
    marginTop: moderateScale(20, 0.1),
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: moderateScale(8, 0.1),
    paddingVertical: moderateScale(6, 0.1),
  },
  title: {
    color: "#212B36",
    fontWeight: "bold",
    fontSize: moderateScale(16, 0.1),
    marginBottom: moderateScale(10, 0.1),
  },
  subtitle: {
    marginBottom: moderateScale(15, 0.1),
  },
  fieldsContainer: {
    marginTop: moderateScale(5, 0.1),
  },
  button: {
    paddingVertical: moderateScale(12, 0.1),
    paddingHorizontal: moderateScale(24, 0.1),
    backgroundColor: "#212B36",
    borderRadius: moderateScale(8, 0.1),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(90, 0.1),
  },
  buttonText: {
    fontSize: moderateScale(16, 0.1),
    color: "#fff",
  },
  label: {
    fontSize: moderateScale(15, 0.1),
    marginBottom: moderateScale(5, 0.1),
  }
});