import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20, 0.1),
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(10, 0.1),
    backgroundColor: "#f0f0f0",
    paddingHorizontal: moderateScale(10, 0.1),
  },
  searchIcon: {
    marginRight: moderateScale(10, 0.1),
  },
  input: {
    flex: 1,
    paddingVertical: moderateScale(10, 0.1),
    fontSize: moderateScale(16, 0.1),
    color: "#333",
  },
  closeIcon: {
    marginLeft: moderateScale(10, 0.1),
  },
  productList: {
    flex: 1,
    paddingTop: moderateScale(20, 0.1),
  },
  innerList: {
    flex: 1,
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
    aspectRatio: moderateScale(1, 0.1),
    marginRight: moderateScale(10, 0.1),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: moderateScale(10, 0.1),
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: moderateScale(10, 0.1),
    marginTop: -moderateScale(40, 0.1),
  },
  title: {
    fontSize: moderateScale(16, 0.1),
    paddingBottom: moderateScale(5, 0.1),
    color: "#333",
    textAlign: "right",
  },
  rating: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: moderateScale(14, 0.1),
    color: "#6B7280",
  },
  starIcon: {
    color: "#F59E0B",
    marginTop: moderateScale(2, 0.1),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  //SubCategories
  container_Sub: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(10, 0.1),
  },
  categoryItem: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: moderateScale(15, 0.1),
    marginTop: moderateScale(10, 0.1),
  },
  imageContainer_Sub: {
    width: moderateScale(70, 0.1),
    height: moderateScale(70, 0.1),
    borderRadius: moderateScale(35, 0.1),
    borderWidth: moderateScale(2, 0.1),
    borderColor: "#d6d6d6",
    overflow: "hidden",
  },
  image_Sub: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#4d4d4d",
    maxWidth: moderateScale(90, 0.1),
    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
  },
});
