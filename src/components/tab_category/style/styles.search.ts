import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(10),
    backgroundColor: "#f0f0f0",
    paddingHorizontal: moderateScale(10),
  },
  searchIcon: {
    marginRight: moderateScale(10),
  },
  input: {
    flex: 1,
    paddingVertical: moderateScale(10),
    fontSize: moderateScale(16),
    color: "#333",
  },
  closeIcon: {
    marginLeft: moderateScale(10),
  },
  productList: {
    flex: 1,
    paddingTop: moderateScale(20),
  },
  innerList: {
    flex: 1,
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
    width: "90%",
    height: "90%",
    borderRadius: moderateScale(10),
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: moderateScale(10),
    marginTop: -moderateScale(40),
  },
  title: {
    fontSize: moderateScale(16),
    paddingBottom: moderateScale(5),
    color: "#333",
    textAlign: "right",
  },
  rating: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: moderateScale(14),
    color: "#6B7280",
  },
  starIcon: {
    color: "#F59E0B",
    marginTop: moderateScale(2),
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
    marginLeft: moderateScale(10),
  },
  categoryItem: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: moderateScale(15),
    marginTop: moderateScale(10),
  },
  imageContainer_Sub: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    borderWidth: moderateScale(2),
    borderColor: "#d6d6d6",
    overflow: "hidden",
  },
  image_Sub: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#4d4d4d",
    maxWidth: moderateScale(90),
    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
  },
});
