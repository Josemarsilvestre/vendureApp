import React, { memo } from "react";
import { Text, View, Image, useWindowDimensions } from "react-native";
import CartButtons from "./cartButtons";
import { OrderLine } from "../../../utils/interface";
import formatNumber from "../../../utils/formatNumber";
import styles from "./style/styles.cart";

interface CartItemProps {
  item: OrderLine;
  refetchCart: () => void;
}

const CartItem = memo(({ item, refetchCart }: CartItemProps) => {
  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  const unitPriceWithTax = item.productVariant.priceWithTax ?? 0;
  const discountAmountWithTax = item.discounts[0]?.amountWithTax ?? 0;
  const totalPriceWithDiscountAndQuantity =
    (unitPriceWithTax - discountAmountWithTax) * item.quantity;
  const priceWithDiscountAndQuantityFormatted = formatNumber(totalPriceWithDiscountAndQuantity);
  const totalPriceFormatted = formatNumber(
    (item.productVariant.priceWithTax ?? 0) * item.quantity
  );
  const discountFormatted = formatNumber(discountAmountWithTax);

  return (
    <View style={styles.containerItem}>
      <View style={[styles.imageContainer, { width: imageWidth }]}>
        <Image
          source={{ uri: item.featuredAsset?.source || "" }}
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
              Price: {totalPriceFormatted}
            </Text>
            <Text>€</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              Discounts: {discountFormatted}
            </Text>
            <Text>€</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              Total: {priceWithDiscountAndQuantityFormatted}
            </Text>
            <Text>€</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

export default CartItem;
