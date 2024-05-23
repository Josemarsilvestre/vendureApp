import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  //EmptyCustomerList
  containe_EmptyCustomerList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: moderateScale(14),
  },
  //EmptySearchList
  container: {
    paddingTop: moderateScale(20),
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: moderateScale(60),
    width: moderateScale(60),
  },
  infoContainer: {
    maxWidth: moderateScale(300),
    padding: moderateScale(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: moderateScale(8),
    marginBottom: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: '#CBD5E0',
    borderRadius: moderateScale(8),
  },
  textContainer_EmptySearch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  text_EmptySearch: {
    color: '#718096',
  },
});
