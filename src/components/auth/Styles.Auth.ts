import { ScaledSheet, moderateScale, scale} from "react-native-size-matters";

export default ScaledSheet.create({
  scroolViewContainer: {
    margin: moderateScale(18),
    justifyContent: "center",
    marginTop: moderateScale(100)
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(6),
  },
  title:{
    color: "#212B36", 
    fontWeight: "bold", 
    marginBottom: moderateScale(10)
  },
  fieldsContainer: {
    marginTop: moderateScale(5),
  },
  SpaceInput: {
    marginBottom: moderateScale(-7),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(8),
    borderColor: '#ccc',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    backgroundColor: '#f9f9f9',
  },
  View_img: {
    marginBottom: moderateScale(30),
    marginTop: moderateScale(-60),
    alignItems: "center"
  },
  img: {
    width: scale(150),
    height: scale(150)
  },
  TouchableOpacitybtn: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(24),
    backgroundColor: "#fff",
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(15),
  },
  TouchableOpacitybtnText: {
    fontSize: moderateScale(16),
    color: '#212B36',
  },
});