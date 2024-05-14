import React from "react";
import { Text, View, StyleSheet } from "react-native";
import formatNumber from "../../../utils/formatNumber";

interface TaxSummary {
  description: string;
  taxRate: number;
  taxBase: number;
  taxTotal: number;
}

interface Order {
  taxSummary: TaxSummary[];
}

const CartInfo: React.FC<Order> = ({ taxSummary }) => {
  return (
    <View style={styles.container}>
      {taxSummary.map((summary, index) => (
        <View key={index}>
          <View style={styles.infoRow}>
            <Text>Description</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>{summary.description}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text>Tax Rate</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>{summary.taxRate}%</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text>Taxe Base</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>{formatNumber(summary.taxBase)}</Text>
              <Text style={styles.currency}>€</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Total Taxes</Text>
            <View style={styles.priceContainer}>
              <Text>{formatNumber(summary.taxTotal)}</Text>
              <Text style={styles.currency}>€</Text>
            </View>
          </View>
        </View>
      ))}

      <Text style={styles.infoText}>
        Shipping is calculated based on your item's address, delivery time,
        weight, and volume.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    marginBottom: 100,
  },
  infoRow: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    marginLeft: 2,
  },
  infoText: {
    paddingBottom: 8,
    fontSize: 14,
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
    fontSize: 14,
    marginRight: 2,
  },
});

export default CartInfo;
