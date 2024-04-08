import { ScaledSheet, moderateScale, scale } from "react-native-size-matters";

export default ScaledSheet.create({
  SpacebetweenWalls_Login: {
    margin: moderateScale(18),
    justifyContent: "center",
    marginTop: moderateScale(100)
  },
  title_login:{
    color: "#212B36", 
    fontWeight: "bold", 
    marginBottom: moderateScale(10)
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
  linkText:{
    backgroundColor: "#212B36",
    borderRadius: 5,
    padding: moderateScale(2),
    marginTop: moderateScale(15),
    fontSize: moderateScale(14)
  },
  link: {
    color: 'blue',
    fontSize: moderateScale(12),
  },
});