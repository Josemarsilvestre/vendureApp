import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    paddingVertical: moderateScale(20, 0.1),
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: "#E5E7EB",
    position: "relative",
    marginBottom: moderateScale(9, 0.1),
  },
  absolute: {
    position: "absolute",
    top: moderateScale(0, 0.1),
    left: moderateScale(0, 0.1),
    zIndex: moderateScale(10, 0.1),
  },
  cardContent: { 
    flexDirection: "row",
    paddingHorizontal: moderateScale(12, 0.1),
    gap: moderateScale(12, 0.1),
  },
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: moderateScale(133, 0.1),
    aspectRatio: moderateScale(1, 0.1),
    borderRadius: moderateScale(10, 0.1),
  },
  colorContainer: {
    position: "absolute",
    bottom: moderateScale(8, 0.1),
    left: moderateScale(8, 0.1),
    flexDirection: "row",
    gap: moderateScale(6, 0.1),
  },
  color: {
    width: moderateScale(10, 0.1),
    height: moderateScale(10, 0.1),
    borderRadius: moderateScale(5, 0.1),
    borderWidth: moderateScale(1, 0.1),
    borderColor: "#D1D5DB",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: moderateScale(16, 0.1),
    color: "#374151",
    lineHeight: moderateScale(17, 0.1),
    height: moderateScale(42, 0.1),
    textAlign: "right",
  },
  AddContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: moderateScale(3, 0.1),
  },
  addButton: {
    flexDirection: "row",
    paddingVertical: moderateScale(10, 0.1),
    paddingHorizontal: moderateScale(15, 0.1),
    backgroundColor: "#334255",
    borderRadius: moderateScale(8, 0.1),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(1, 0.1),
  },
  addButtonText: {
    fontSize: moderateScale(14, 0.1),
    color: "#fff",
  },
  addButtonIcon: {
    color: "#F59E0B",
  },
  addedButton: {
    flexDirection: "row",
    paddingVertical: moderateScale(10, 0.1),
    paddingHorizontal: moderateScale(15, 0.1),
    backgroundColor: "green",
    borderRadius: moderateScale(8, 0.1),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(1, 0.1),
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: moderateScale(2, 0.1),
  },
  notAvailableText: {
    fontSize: moderateScale(14, 0.1),
    color: "#6B7280",
    height: moderateScale(24, 0.1),
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: moderateScale(20, 0.1),
    borderTopRightRadius: moderateScale(20, 0.1),
    padding: moderateScale(40, 0.1),
    paddingBottom: moderateScale(20, 0.1),
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(20, 0.1),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(20, 0.1),
  },
  modalHeaderText: {
    fontSize: moderateScale(18, 0.1),
    fontWeight: "bold",
    color: "#1F2937",
  },
  closeButton: {
    padding: moderateScale(5, 0.1),
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: moderateScale(20, 0.1),
  },
  rangeText: {
    fontSize: moderateScale(16, 0.1),
    color: "#1F2937",
  },
  slider: {
    width: "80%",
    marginBottom: moderateScale(20, 0.1),
  },
  applyButton: {
    backgroundColor: "#1F2937",
    paddingVertical: moderateScale(20, 0.1),
    paddingHorizontal: moderateScale(20, 0.1),
    borderRadius: moderateScale(5, 0.1),
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(16, 0.1),
  },
});
