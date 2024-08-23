import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useMutation } from "@apollo/client";

import { ADJUST_ORDER, REMOVE_ONLY_ORDER_LINE } from "../../api/mutation/order";
import styles from "./style/styles.cart";

import Icons from "../common/Icons";
import { moderateScale } from "react-native-size-matters";

interface CartButtonsProps {
  itemID: string;
  quantity: number;
  refetchCart: () => void;
}

const CartButtons: React.FC<CartButtonsProps> = ({ itemID, quantity, refetchCart }) => {
  const [adjustOrderLine] = useMutation(ADJUST_ORDER, {
    onCompleted: () => refetchCart(),
  });
  const [removeOrderLine] = useMutation(REMOVE_ONLY_ORDER_LINE, {
    onCompleted: () => refetchCart(),
  });

  const increase = () => {
    adjustOrderLine({
      variables: { id_: itemID, quantity_: quantity + 1 },
    });
  };

  const decrease = () => {
    if (quantity > 1) {
      adjustOrderLine({
        variables: { id_: itemID, quantity_: quantity - 1 },
      });
    }
  };

  const removeFromCart = () => {
    removeOrderLine({
      variables: { id_: itemID },
    });
  };

  return (
    <View style={styles.container_CartButtons}>
      <TouchableOpacity onPress={increase} style={styles.pressable}>
        <Icons.AntDesign name="plus" size={moderateScale(20, 0.1)} style={styles.icon_CartButtons} />
      </TouchableOpacity>

      <Text style={styles.quantity}>{quantity}</Text>

      {quantity === 1 ? (
        <TouchableOpacity onPress={removeFromCart} style={styles.pressable}>
          <Icons.AntDesign name="delete" size={moderateScale(20, 0.1)} style={styles.icon_CartButtons} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={decrease} style={styles.pressable}>
          <Icons.AntDesign name="minus" size={moderateScale(20, 0.1)} style={styles.icon_CartButtons} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CartButtons;
