import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(2, 0.1),
    marginBottom: moderateScale(10, 0.1),
  },
  productsContainer: {
    flex: 1,
    paddingVertical: moderateScale(2, 0.1),
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(2, 0.1),
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: moderateScale(2, 0.1),
    marginLeft: moderateScale(10, 0.1),
    marginRight: moderateScale(5, 0.1),
    marginTop: moderateScale(10, 0.1),
    borderBottomWidth: moderateScale(2, 0.1),
    borderBottomColor: "#E5E7EB",
  },
  infoText: {
    fontSize: moderateScale(16, 0.1),
    color: "#6B7280",
  },
  notFoundText: {
    textAlign: "center",
    color: "red",
  },
  divider: {
    height: moderateScale(2, 0.1),
    backgroundColor: "lightgray",
    marginVertical: moderateScale(8, 0.1),
  },
  categoryList: {
    backgroundColor: "#f0f0f0",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  categoryItem: {
    alignItems: "center",
    paddingVertical: moderateScale(10, 0.1),
    paddingHorizontal: moderateScale(5, 0.1),
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: "#ddd",
  },
  categoryImageContainer: {
    marginBottom: moderateScale(5, 0.1),
    width: "100%",
    aspectRatio: 1,
    borderRadius: moderateScale(10, 0.1),
    overflow: "hidden",
  },
  categoryImage: {
    width: "100%",
    aspectRatio: moderateScale(1, 0.1),
    borderRadius: moderateScale(10, 0.1),
  },
  categoryText: {
    fontSize: moderateScale(16, 0.1),
    color: "#333",
    textAlign: "center",
  },
});
