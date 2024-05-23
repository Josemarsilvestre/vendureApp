import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    margin: moderateScale(18),
    justifyContent: "center",
    marginTop: moderateScale(20),
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(6),
  },
  title: {
    color: "#212B36",
    fontWeight: "bold",
    fontSize: moderateScale(16),
    marginBottom: moderateScale(10),
  },
  subtitle: {
    marginBottom: moderateScale(15),
  },
  fieldsContainer: {
    marginTop: moderateScale(5),
  },
  button: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(24),
    backgroundColor: "#212B36",
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(90),
  },
  buttonText: {
    fontSize: moderateScale(16),
    color: "#fff",
  },
  label: {
    fontSize: moderateScale(15),
    marginBottom: moderateScale(5),
  }
});