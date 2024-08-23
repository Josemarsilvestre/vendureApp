import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10, 0.1),
    marginBottom: moderateScale(30, 0.1),
  },
  orderContainer: {
    paddingVertical: moderateScale(10, 0.1),
    paddingHorizontal: moderateScale(8, 0.1),
    marginBottom: moderateScale(10, 0.1),
    backgroundColor: "#fff",
    borderRadius: moderateScale(10, 0.1),
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(5, 0.1),
  },
  orderID: {
    fontSize: moderateScale(14, 0.1),
    flex: 1,
  },
  orderCode: {
    fontSize: moderateScale(14, 0.1),
    flex: 1,
  },
  total: {
    fontSize: moderateScale(14, 0.1),
    flex: 1,
  },
  createdAt: {
    fontSize: moderateScale(12, 0.1),
    color: "#666",
    flex: 1,
  },
  state: {
    fontSize: moderateScale(12, 0.1),
    color: "green",
    fontWeight: "bold",
    flex: 1,
  },
  menu: {
    marginTop: moderateScale(-20, 0.1),
    marginBottom: moderateScale(10, 0.1),
    padding: moderateScale(10, 0.1),
    backgroundColor: "#fff",
    borderBottomLeftRadius: moderateScale(10, 0.1),
    borderBottomRightRadius: moderateScale(10, 0.1),
    borderWidth: moderateScale(1, 0.1),
    borderColor: "#ccc",
  },
  productItem: {
    paddingVertical: moderateScale(10, 0.1),
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: "#f0f0f0",
    marginBottom: moderateScale(10, 0.1),
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: moderateScale(133, 0.1),
    aspectRatio: 1,
    marginRight: moderateScale(10, 0.1),
  },
  image: {
    width: moderateScale(125, 0.1),
    height: moderateScale(100, 0.1),
    borderRadius: moderateScale(10, 0.1),
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: moderateScale(10, 0.1),
    marginTop: -moderateScale(30, 0.1),
  },
  title: {
    fontSize: moderateScale(14, 0.1),
    paddingBottom: moderateScale(5, 0.1),
    color: "#333",
    textAlign: "right",
  },
});
