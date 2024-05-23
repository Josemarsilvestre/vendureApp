import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  //BigLoading
  container_Big: {
    display: 'flex',
    alignItems: 'center',
    padding: moderateScale(16),
    marginHorizontal: 'auto',
    marginBottom: moderateScale(16),
    textAlign: 'center', 
    borderRadius: moderateScale(8),
    backgroundColor: '#1F2937',
    maxWidth: 9999,
  },
  //Loading
  constainer_Loading:{
    width: moderateScale(80), 
    height: moderateScale(24), 
    position: 'relative'
  },
  AnimatedStyle:{
    width: moderateScale(13), 
    height: moderateScale(13), 
    backgroundColor: 'white', 
    borderRadius: moderateScale(13/2), 
    position: 'absolute', 
    top: '15%'
  },
  //PageLoading
  container_PageLoading: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  }
});
