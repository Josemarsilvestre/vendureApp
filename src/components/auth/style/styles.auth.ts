import { ScaledSheet, moderateScale, scale} from "react-native-size-matters";

export default ScaledSheet.create({
  scroolViewContainer: {
    margin: moderateScale(18, 0.1),
    justifyContent: "center",
    marginTop: moderateScale(50, 0.1)
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: moderateScale(8, 0.1),
    paddingVertical: moderateScale(6, 0.1),
  },
  title:{
    color: "#212B36", 
    fontWeight: "bold", 
    marginBottom: moderateScale(10, 0.1)
  },
  fieldsContainer: {
    marginTop: moderateScale(5, 0.1),
  },
  SpaceInput: {
    marginBottom: moderateScale(-7, 0.1),
    paddingVertical: moderateScale(12, 0.1),
    paddingHorizontal: moderateScale(8, 0.1),
    borderColor: '#ccc',
    borderWidth: moderateScale(1, 0.1),
    borderRadius: moderateScale(6, 0.1),
    backgroundColor: '#f9f9f9',
  },
  View_img: {
    marginBottom: moderateScale(30, 0.1),
    marginTop: moderateScale(-60, 0.1),
    alignItems: "center"
  },
  img: {
    width: scale(150),
    height: scale(150)
  },
  TouchableOpacitybtn: {
    paddingVertical: moderateScale(12, 0.1),
    paddingHorizontal: moderateScale(24, 0.1),
    backgroundColor: "#fff",
    borderRadius: moderateScale(8, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(15, 0.1),
  },
  TouchableOpacitybtnText: {
    fontSize: moderateScale(16, 0.1),
    color: '#212B36',
  },
  label: {
    fontSize: moderateScale(15, 0.1),
    marginBottom: moderateScale(5, 0.1),
  }
});