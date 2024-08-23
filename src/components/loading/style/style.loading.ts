import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  //BigLoading
  container_Big: {
    display: 'flex',
    alignItems: 'center',
    padding: moderateScale(16, 0.1),
    marginHorizontal: 'auto',
    marginBottom: moderateScale(16, 0.1),
    textAlign: 'center', 
    borderRadius: moderateScale(8, 0.1),
    backgroundColor: '#1F2937',
    maxWidth: 9999,
  },
  //Loading
  constainer_Loading:{
    width: moderateScale(80, 0.1), 
    height: moderateScale(24, 0.1), 
    position: 'relative'
  },
  AnimatedStyle:{
    width: moderateScale(13, 0.1), 
    height: moderateScale(13, 0.1), 
    backgroundColor: 'white', 
    borderRadius: moderateScale(13/2, 0.1), 
    position: 'absolute', 
    top: '15%'
  },
  //PageLoading
  container_PageLoading: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: moderateScale(0, 0.1),
    left: moderateScale(0, 0.1),
    zIndex: moderateScale(40, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
  }
});
