import { ScaledSheet, moderateScale } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    paddingVertical: moderateScale(20),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "#E5E7EB",
    position: "relative",
    marginBottom: moderateScale(9),
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  cardContent: { 
    flexDirection: "row",
    paddingHorizontal: moderateScale(12),
    gap: moderateScale(12),
  },
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "80%",
    aspectRatio: 1,
    borderRadius: moderateScale(10),
  },
  colorContainer: {
    position: "absolute",
    bottom: moderateScale(8),
    left: moderateScale(8),
    flexDirection: "row",
    gap: moderateScale(6),
  },
  color: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: "#D1D5DB",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: moderateScale(16),
    color: "#374151",
    lineHeight: moderateScale(17),
    height: moderateScale(42),
    textAlign: "right",
  },
  AddContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: moderateScale(3),
  },
  addButton: {
    flexDirection: "row",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: "#334255",
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(1),
  },
  addButtonText: {
    fontSize: moderateScale(14),
    color: "#fff",
  },
  addButtonIcon: {
    color: "#F59E0B",
  },
  addedButton: {
    flexDirection: "row",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: "green",
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(1),
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: moderateScale(2),
  },
  notAvailableText: {
    fontSize: moderateScale(14),
    color: "#6B7280",
    height: moderateScale(24),
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 40,
    paddingBottom: 200,
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  closeButton: {
    padding: 5,
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  rangeText: {
    fontSize: 16,
    color: "#1F2937",
  },
  slider: {
    width: "80%",
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: "#1F2937",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
