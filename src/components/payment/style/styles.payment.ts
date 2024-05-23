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
    padding: moderateScale(10),
  },
  divider: {
    height: moderateScale(1),
    backgroundColor: "lightgray",
    marginVertical: moderateScale(8),
  },
  header: {
    paddingVertical: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: "#e0e0e0",
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerLink: {
    alignItems: "center",
  },
  headerIconInactive: {
    color: "#878787",
  },
  headerTextInactive: {
    color: "#878787",
    fontSize: moderateScale(14),
  },
  headerDivider: {
    height: moderateScale(1),
    width: moderateScale(40),
    backgroundColor: "#878787",
  },
  headerActive: {
    alignItems: "center",
  },
  headerIconActive: {
    color: "green",
  },
  headerTextActive: {
    color: "green",
    fontSize: moderateScale(14),
  },
  contact: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    marginBottom: moderateScale(5),
  },
  fullName: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "#414141",
  },
  addressContainer: {
    marginRight: moderateScale(10),
    padding: moderateScale(15),
    backgroundColor: "#f1f1f1",
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  selectedAddressContainer: {
    backgroundColor: "#d3d3d3",
  },
  addressText: {
    color: "black",
    fontSize: moderateScale(16),
  },
  productsContainer: {
    marginTop: moderateScale(10),
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    marginBottom: moderateScale(10),
  },
  cartItems: {
    borderTopWidth: moderateScale(1),
    borderTopColor: "#E5E7EB",
  },
  shippingMethod: {
    marginBottom: moderateScale(10),
    marginRight: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: "#f1f1f1",
    borderRadius: moderateScale(10),
  },
  selectedShippingMethod: {
    backgroundColor: "#d3d3d3",
  },
  methodName: {
    fontSize: moderateScale(13),
    marginTop: moderateScale(5),
  },
  methodPrice: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(5),
  },
  paymentMethodContainer: {
    padding: moderateScale(10),
  },
  infoRow: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(8),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: moderateScale(14),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    marginLeft: moderateScale(2),
  },
  infoText: {
    paddingBottom: moderateScale(8),
    fontSize: moderateScale(14),
  },
  bottomContainer: {
    alignItems: "center",
    padding: moderateScale(10),
    borderTopWidth: moderateScale(1),
    borderRadius: moderateScale(30),
    borderTopColor: "#e0e0e0",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: moderateScale(5),
  },
  payButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: moderateScale(28),
    left: moderateScale(20),
    right: moderateScale(20),
    backgroundColor: "#1F2937",
    borderRadius: moderateScale(8),
    padding: moderateScale(14),
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartButtonText: {
    color: "#FFF",
    fontSize: moderateScale(16),
    marginLeft: moderateScale(5),
  },
});
