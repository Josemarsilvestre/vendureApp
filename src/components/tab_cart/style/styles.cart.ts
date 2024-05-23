import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  //CartScreen
  scroolViewContainer: {
    margin: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  text_view: {
    justifyContent: "center",
    alignItems: "center",
  },
  text_: {
    fontSize: moderateScale(16),
  },
  scrollView: {
    backgroundColor: "white",
    paddingHorizontal: moderateScale(10),
  },
  cartItemsContainer: {
    paddingVertical: moderateScale(10),
    marginBottom: moderateScale(1),
  },
  cartTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(10),
  },
  cartTitleText: {
    marginBottom: moderateScale(2),
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  cartItems: {
    borderTopWidth: moderateScale(1),
    borderTopColor: "#E5E7EB",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    backgroundColor: "white",
    borderTopWidth: moderateScale(1),
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -moderateScale(3),
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: moderateScale(5),
  },
  totalText: {
    fontWeight: "400",
    marginTop: -moderateScale(17),
  },
  totalPriceContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  totalPriceWithTax: {
    fontSize: moderateScale(14.5),
    marginRight: moderateScale(2),
  },
  totalPrice: {
    fontSize: moderateScale(12),
    marginRight: moderateScale(2),
    color: "#97979A",
  },
  continueButton: {
    width: "50%",
    marginTop: moderateScale(5),
    marginBottom: moderateScale(5),
  },
  //CartItem
  containerItem: {
    flexDirection: "row",
    paddingVertical: moderateScale(20),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "#E5E7EB",
  },
  imageContainer: {
    marginRight: moderateScale(16), 
    flex: 1,
    position: "relative",
  },
  image: {
    width: "80%",
    height: "65%",
    borderRadius: moderateScale(10),
  },
  specialSellContainer: {
    marginTop: moderateScale(8),
    alignItems: "center",
  },
  cartButtonsContainer: {
    marginTop: moderateScale(8),
  },
  name: {
    marginBottom: moderateScale(12),
    fontSize: moderateScale(14),
  },
  infoContainer: {
    flex: 1,
  },
  info: {
    marginBottom: moderateScale(12),
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: moderateScale(8),
  },
  colorBadge: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(4),
    marginRight: moderateScale(8),
  },
  icon: {
    marginRight: moderateScale(8),
  },
  skyIcon: {
    color: "#00B4D8",
  },
  infoText: {
    fontSize: moderateScale(14),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: moderateScale(14),
    color: "#4B5563",
  },
  //CartInfo
  container: {
    marginTop: moderateScale(8),
    marginBottom: moderateScale(75),
  },
  infoRow_CartInfo: {
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
  currency: {
    marginLeft: moderateScale(2),
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
    fontSize: moderateScale(14),
    marginRight: moderateScale(2),
  },
  //CartButtons
  container_CartButtons: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(1),
    borderRadius: moderateScale(4),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateScale(1),
    },
    shadowOpacity: 0.22,
    shadowRadius: moderateScale(2.22),
    elevation: moderateScale(3),
    justifyContent: "space-evenly",
    marginRight: moderateScale(30)
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon_CartButtons: {
    color: "red",
  },
  quantity: {
    minWidth: moderateScale(22),
    textAlign: "center",
    fontSize: moderateScale(14),
  },
});
