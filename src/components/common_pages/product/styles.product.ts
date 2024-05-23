import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: moderateScale(16),
  },
  content: {
    padding: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    marginTop: moderateScale(16),
  },
  header: {
    marginRight: moderateScale(5),
    fontWeight: "bold",
    fontSize: moderateScale(16),
    color: "green",
  },
  priceContainer: {
    marginTop: -1,
    flexDirection: "row",
  },
  divider: {
    height: moderateScale(2),
    backgroundColor: "lightgray",
    marginVertical: moderateScale(8),
  },
  infoContainer: {
    marginBottom: moderateScale(16),
  },
  sliderText: {
    marginTop: moderateScale(16),
  },
  reviewText: {
    marginTop: moderateScale(16),
  },
  addToCartButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: moderateScale(28),
    left: moderateScale(20),
    right: moderateScale(68),
    backgroundColor: "#1F2937",
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartButtonText: {
    color: "#FFF",
    fontSize: moderateScale(16),
    fontWeight: "bold",
    marginRight: moderateScale(5),
  },
  addedButton: {
    backgroundColor: "green",
    flexDirection: "row",
    position: "absolute",
    bottom: moderateScale(28),
    left: moderateScale(15),
    right: moderateScale(68),
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    position: "absolute",
    right: moderateScale(3),
    bottom: moderateScale(41),
    flexDirection: "row",
  },
  icon: {
    marginRight: moderateScale(16),
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(70),
    borderRadius: moderateScale(30),
    borderTopWidth: moderateScale(1),
    borderTopColor: "#e0e0e0",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: moderateScale(5),
  },
});
