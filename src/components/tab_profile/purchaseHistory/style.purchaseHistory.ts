import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
    marginBottom: moderateScale(30),
  },
  orderContainer: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    marginBottom: moderateScale(10),
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(5),
  },
  orderID: {
    fontSize: moderateScale(14),
    flex: 1,
  },
  orderCode: {
    fontSize: moderateScale(14),
    flex: 1,
  },
  total: {
    fontSize: moderateScale(14),
    flex: 1,
  },
  createdAt: {
    fontSize: moderateScale(12),
    color: "#666",
    flex: 1,
  },
  state: {
    fontSize: moderateScale(12),
    color: "green",
    fontWeight: "bold",
    flex: 1,
  },
  menu: {
    marginTop: moderateScale(-20),
    marginBottom: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  productItem: {
    paddingVertical: moderateScale(10),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "#f0f0f0",
    marginBottom: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: "40%",
    aspectRatio: 1,
    marginRight: moderateScale(10),
  },
  image: {
    width: "80%",
    height: "80%",
    borderRadius: moderateScale(10),
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: moderateScale(10),
    marginTop: -moderateScale(30),
  },
  title: {
    fontSize: moderateScale(14),
    paddingBottom: moderateScale(5),
    color: "#333",
    textAlign: "right",
  },
});
