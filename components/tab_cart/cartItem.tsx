import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

import CartButtons from "./cartButtons";
import { OrderLine } from "../../src/interface";
import formatNumber from "../../utils/formatNumber";

interface Order {
  activeOrder: {
    total: number;
    totalWithTax: number;
    taxSummary: {
      description: string;
      taxRate: number;
      taxBase: number;
      taxTotal: number;
    };
    lines: OrderLine[];
  };
  refetchCart: () => void;
}

function CartItem({ item, refetchCart }: { item: OrderLine; refetchCart: () => void; }) {
  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  const totalPriceWithDiscountAndQuantity = ((item.productVariant.priceWithTax ?? 0) * item.quantity) + ((item.discounts[0]?.amountWithTax ?? 0));

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { width: imageWidth }]}>
        <Image
          source={{
            uri: item.featuredAsset?.source || "",
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.cartButtonsContainer}>
          <CartButtons
            itemID={item.id}
            quantity={item.quantity}
            refetchCart={refetchCart}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { textAlign: "right" }]}>
              {item.productVariant.name}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { color: "green" }]}>In stock</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              Price: {formatNumber((item.productVariant.priceWithTax ?? 0) * item.quantity)}
            </Text>
            <Text>€</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              Discounts:{" "}
              {formatNumber(item.discounts[0]?.amountWithTax ?? 0)}
            </Text>
            <Text>€</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              Total:{" "}
              {formatNumber(totalPriceWithDiscountAndQuantity)}
            </Text>
            <Text>€</Text>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  imageContainer: {
    marginRight: 16,
    flex: 1,
    position: "relative",
  },
  image: {
    width: "80%",
    height: "70%",
    borderRadius: 10,
  },
  specialSellContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  cartButtonsContainer: {
    marginTop: 8,
  },
  name: {
    marginBottom: 12,
    fontSize: 14,
  },
  infoContainer: {
    flex: 1,
  },
  info: {
    marginBottom: 12,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  infoRow: {
    flexDirection: "row",

    marginBottom: 8,
  },
  colorBadge: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },
  icon: {
    marginRight: 8,
  },
  skyIcon: {
    color: "#00B4D8",
  },
  infoText: {
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    color: "#4B5563",
  },
});

export default CartItem;
