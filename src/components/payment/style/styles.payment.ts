import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
  },
  section: {
    padding: moderateScale(10, 0.1),
  },
  contact: {
    fontSize: moderateScale(14, 0.1),
    fontWeight: "bold",
    marginBottom: moderateScale(5, 0.1),
  },
  fullName: {
    fontSize: moderateScale(16, 0.1),
    fontWeight: "bold",
    color: "#414141",
  },
  addressContainer: {
    marginRight: moderateScale(10, 0.1),
    padding: moderateScale(15, 0.1),
    backgroundColor: "#f1f1f1",
    borderRadius: moderateScale(10, 0.1),
    marginBottom: moderateScale(10, 0.1),
  },
  selectedAddressContainer: {
    backgroundColor: "#d3d3d3",
  },
  addressText: {
    color: "black",
    fontSize: moderateScale(16, 0.1),
  },
  productsContainer: {
    marginTop: moderateScale(10, 0.1),
  },
  title: {
    fontSize: moderateScale(14, 0.1),
    fontWeight: "bold",
    marginBottom: moderateScale(10, 0.1),
  },
  cartItems: {
    flex: 1,
    borderTopWidth: moderateScale(1, 0.1),
    borderTopColor: "#E5E7EB",
    height: moderateScale(200, 0.1),
  },
  shippingMethod: {
    marginBottom: moderateScale(10, 0.1),
    marginRight: moderateScale(10, 0.1),
    padding: moderateScale(10, 0.1),
    backgroundColor: "#f1f1f1",
    borderRadius: moderateScale(10, 0.1),
  },
  selectedShippingMethod: {
    backgroundColor: "#d3d3d3",
  },
  methodName: {
    fontSize: moderateScale(13, 0.1),
    marginTop: moderateScale(5, 0.1),
  },
  methodPrice: {
    fontSize: moderateScale(14, 0.1),
    marginTop: moderateScale(5, 0.1),
  },
  paymentMethodContainer: {
    padding: moderateScale(10, 0.1),
  },
  infoRow: {
    paddingTop: moderateScale(5, 0.1),
    paddingBottom: moderateScale(8, 0.1),
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: moderateScale(14, 0.1),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    marginLeft: moderateScale(2, 0.1),
  },
  infoText: {
    paddingBottom: moderateScale(8, 0.1),
    fontSize: moderateScale(14, 0.1),
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
  payButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: moderateScale(28, 0.1),
    left: moderateScale(20, 0.1),
    right: moderateScale(20, 0.1),
    backgroundColor: "#1F2937",
    borderRadius: moderateScale(8, 0.1),
    padding: moderateScale(14, 0.1),
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartButtonText: {
    color: "#FFF",
    fontSize: moderateScale(16, 0.1),
    marginLeft: moderateScale(5, 0.1),
  },
  flashList: {
    flexGrow: 0,
  }
});
