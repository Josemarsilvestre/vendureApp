import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";

import Icons from "../../common/Icons";
import styles from "./style/style.productCard";

interface ProductFiltersProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  priceRange: { start: number; end: number };
  setPriceRange: (range: { start: number; end: number }) => void;
  applyPriceFilter: (start: number, end: number) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  modalVisible,
  setModalVisible,
  priceRange,
  setPriceRange,
  applyPriceFilter,
}) => {
  const [localPriceRange, setLocalPriceRange] = React.useState(priceRange);

  const handleApplyFilter = () => {
    setModalVisible(false);
    applyPriceFilter(localPriceRange.start, localPriceRange.end);
  };

  const handleSliderChange = (value: number) => {
    setLocalPriceRange((prevRange) => ({ ...prevRange, end: value }));
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      backdropOpacity={0.5}
      style={{
        margin: 0,
        justifyContent: "flex-end",
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Price Range</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Icons.AntDesign name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>
          <View style={styles.rangeContainer}>
            <Text style={styles.rangeText}>${localPriceRange.start}</Text>
            <Text style={styles.rangeText}>${localPriceRange.end}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5000}
            step={10}
            minimumTrackTintColor="#1F2937"
            maximumTrackTintColor="#CCCCCC"
            thumbTintColor="#1F2937"
            value={localPriceRange.end}
            onValueChange={handleSliderChange}
          />
          <TouchableOpacity onPress={handleApplyFilter} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductFilters;
