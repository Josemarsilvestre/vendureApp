import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  //CartScreen
  scroolViewContainer: {
    margin: moderateScale(20, 0.1),
    justifyContent: "center",
    alignItems: "center",
  },
  text_view: {
    justifyContent: "center",
    alignItems: "center",
  },
  text_: {
    fontSize: moderateScale(16, 0.1),
  },
  scrollView: {
    backgroundColor: "white",
    paddingHorizontal: moderateScale(10, 0.1),
  },
  cartItemsContainer: {
    paddingVertical: moderateScale(10, 0.1),
    marginBottom: moderateScale(1, 0.1),
  },
  cartTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10, 0.1),
    paddingBottom: moderateScale(10, 0.1),
  },
  cartTitleText: {
    marginBottom: moderateScale(2, 0.1),
    fontSize: moderateScale(14, 0.1),
    fontWeight: "bold",
  },
  cartItems: {
    borderTopWidth: moderateScale(1, 0.1),
    borderTopColor: "#E5E7EB",
  },
  bottomContainer: {
    position: "absolute",
    bottom: moderateScale(0, 0.1),
    left: moderateScale(0, 0.1),
    right: moderateScale(0, 0.1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(10, 0.1),
    paddingVertical: moderateScale(5, 0.1),
    backgroundColor: "white",
    borderTopWidth: moderateScale(1, 0.1),
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: moderateScale(0, 0.1),
      height: -moderateScale(3, 0.1),
    },
    shadowOpacity: moderateScale(0.1, 0.1),
    shadowRadius: moderateScale(3, 0.1),
    elevation: moderateScale(5, 0.1),
  },
  totalText: {
    fontWeight: "400",
    marginTop: -moderateScale(17, 0.1),
  },
  totalPriceContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  totalPriceWithTax: {
    fontSize: moderateScale(14.5, 0.1),
    marginRight: moderateScale(2, 0.1),
  },
  totalPrice: {
    fontSize: moderateScale(12, 0.1),
    marginRight: moderateScale(2, 0.1),
    color: "#97979A",
  },
  continueButton: {
    width: "50%",
    marginTop: moderateScale(5, 0.1),
    marginBottom: moderateScale(5, 0.1),
  },
  //CartItem
  containerItem: {
    flexDirection: "row",
    paddingVertical: moderateScale(20, 0.1),
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: "#E5E7EB",
  },
  imageContainer: {
    marginRight: moderateScale(30, 0.9), 
    marginLeft: moderateScale(4, 0.1),
    flex: 1,
    position: "relative",
  },
  image: {
    width: moderateScale(120, 0.5),
    height: moderateScale(110, 0.1),
    borderRadius: moderateScale(10, 0.1),
  },
  specialSellContainer: {
    marginTop: moderateScale(8, 0.1),
    alignItems: "center",
  },
  name: {
    marginBottom: moderateScale(12, 0.1),
    fontSize: moderateScale(14, 0.1),
  },
  infoContainer: {
    flex: 1,
  },
  info: {
    marginBottom: moderateScale(12, 0.1),
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: moderateScale(8, 0.1),
  },
  colorBadge: {
    width: moderateScale(20, 0.1),
    height: moderateScale(20, 0.1),
    borderRadius: moderateScale(4, 0.1),
    marginRight: moderateScale(8, 0.1),
  },
  icon: {
    marginRight: moderateScale(8, 0.1),
  },
  skyIcon: {
    color: "#00B4D8",
  },
  infoText: {
    fontSize: moderateScale(14, 0.1),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: moderateScale(14, 0.1),
    color: "#4B5563",
  },
  //CartInfo
  container: {
    marginTop: moderateScale(8, 0.1),
    marginBottom: moderateScale(75, 0.1),
  },
  infoRow_CartInfo: {
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
  currency: {
    marginLeft: moderateScale(2, 0.1),
  },
  discountText: {
    color: "red",
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountPercentage: {
    color: "red",
    fontSize: moderateScale(14, 0.1),
    marginRight: moderateScale(2, 0.1),
  },
  //CartButtons
  container_CartButtons: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(8, 0.1),
    paddingHorizontal: moderateScale(1, 0.1),
    borderRadius: moderateScale(4, 0.1),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: moderateScale(0, 0.1),
      height: moderateScale(1, 0.1),
    },
    shadowOpacity: moderateScale(0.22, 0.1),
    shadowRadius: moderateScale(2.22, 0.1),
    elevation: moderateScale(3, 0.1),
    justifyContent: "space-evenly",
    marginTop: moderateScale(8, 0.1),
    marginRight: moderateScale(25, 4),
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon_CartButtons: {
    color: "red",
  },
  quantity: {
    minWidth: moderateScale(22, 0.1),
    textAlign: "center",
    fontSize: moderateScale(14, 0.1),
  },
});
