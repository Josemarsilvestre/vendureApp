import React from "react";
import {
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";

import CartButtons from "./cartButtons";
import { OrderLine } from "../../../utils/interface";
import formatNumber from "../../../utils/formatNumber";
import styles from "./style/styles.cart";

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

export default function CartItem({ item, refetchCart }: { item: OrderLine; refetchCart: () => void; }) {
  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  const totalPriceWithDiscountAndQuantity = ((item.productVariant.priceWithTax ?? 0) * item.quantity) + ((item.discounts[0]?.amountWithTax ?? 0));

  return (
    <View style={styles.containerItem}>
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