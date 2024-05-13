import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useMutation } from "@apollo/client";
import { ADJUST_ORDER, REMOVE_ONLY_ORDER_LINE } from "../../src/api/graphql/cart";

import Icons from "../common/Icons";

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
    <View style={styles.container}>
      <TouchableOpacity onPress={increase} style={styles.pressable}>
        <Icons.AntDesign name="plus" size={16} style={styles.icon} />
      </TouchableOpacity>

      <Text style={styles.quantity}>{quantity}</Text>

      {quantity === 1 ? (
        <TouchableOpacity onPress={removeFromCart} style={styles.pressable}>
          <Icons.AntDesign name="delete" size={16} style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={decrease} style={styles.pressable}>
          <Icons.AntDesign name="minus" size={16} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 1,
    borderRadius: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: "space-evenly",
    marginRight: 30
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "red",
  },
  quantity: {
    minWidth: 22,
    textAlign: "center",
    fontSize: 14,
  },
});

export default CartButtons;
