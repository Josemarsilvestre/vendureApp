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
  applyPriceFilter: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  modalVisible,
  setModalVisible,
  priceRange,
  setPriceRange,
  applyPriceFilter,
}) => {
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
            <Text style={styles.rangeText}>${priceRange.start}</Text>
            <Text style={styles.rangeText}>${priceRange.end}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1000}
            step={10}
            minimumTrackTintColor="#1F2937"
            maximumTrackTintColor="#CCCCCC"
            thumbTintColor="#1F2937"
            value={priceRange.end}
            onValueChange={(value) => setPriceRange({ ...priceRange, end: value })}
          />
          <TouchableOpacity onPress={applyPriceFilter} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ProductFilters;
