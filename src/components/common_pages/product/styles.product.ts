import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: moderateScale(16, 0.1),
  },
  content: {
    padding: moderateScale(16, 0.1),
  },
  title: {
    fontSize: moderateScale(20, 0.1),
    fontWeight: "bold",
    marginTop: moderateScale(16, 0.1),
  },
  header: {
    marginRight: moderateScale(5, 0.1),
    fontWeight: "bold",
    fontSize: moderateScale(16, 0.1),
    color: "green",
  },
  priceContainer: {
    marginTop: moderateScale(-1, 0.1),
    flexDirection: "row",
  },
  divider: {
    height: moderateScale(2, 0.1),
    backgroundColor: "lightgray",
    marginVertical: moderateScale(8, 0.1),
  },
  infoContainer: {
    marginBottom: moderateScale(16, 0.1),
  },
  sliderText: {
    marginTop: moderateScale(16, 0.1),
  },
  reviewText: {
    marginTop: moderateScale(16, 0.1),
  }, 
  addToCartButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: moderateScale(28, 0.1),
    left: moderateScale(20, 0.1),
    right: moderateScale(68, 0.1),
    backgroundColor: "#1F2937",
    borderRadius: moderateScale(8, 0.1),
    padding: moderateScale(16, 0.1),
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartButtonText: {
    color: "#FFF",
    fontSize: moderateScale(16, 0.1),
    fontWeight: "bold",
    marginRight: moderateScale(5, 0.1),
  },
  addedButton: {
    backgroundColor: "green",
    flexDirection: "row",
    position: "absolute",
    bottom: moderateScale(28, 0.1),
    left: moderateScale(15, 0.1),
    right: moderateScale(68, 0.1),
    borderRadius: moderateScale(8, 0.1),
    padding: moderateScale(16, 0.1),
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    position: "absolute",
    right: moderateScale(3, 0.1),
    bottom: moderateScale(41, 0.1),
    flexDirection: "row",
  },
  icon: {
    marginRight: moderateScale(16, 0.1),
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(70, 0.1), 
    borderTopLeftRadius: moderateScale(30, 0.1),
    borderTopRightRadius: moderateScale(30, 0.1),
    borderTopWidth: moderateScale(1, 0.1),
    borderTopColor: "#e0e0e0",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3, 0.1),
    elevation: moderateScale(5, 0.1),
  },
});
