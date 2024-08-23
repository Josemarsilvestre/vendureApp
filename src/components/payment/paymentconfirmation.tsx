import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import ConfettiCannon from "react-native-confetti-cannon";

export default function PaymentConfirmationScreen({ navigation }) {
  const confettiRef = useRef(null);

  const handleContinueShopping = () => {
    navigation.navigate("Index");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name="check-circle" size={moderateScale(24, 0.1)} color="#4CAF50" />
        <Text style={styles.title}>Successful purchase</Text>
      </View>
      
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: -10, y: 0 }}
        fadeOut
      />

      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: moderateScale(31, 0.1), paddingTop: moderateScale(65, 0.1) },
        ]}
      >
        <TouchableOpacity
          style={styles.TouchableOpacitybtn}
          onPress={handleContinueShopping}
        >
          <Text style={styles.TouchableOpacitybtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: moderateScale(18, 0.1),
  },
  title: {
    color: "#000",
    textAlign: "center",
    fontSize: moderateScale(24, 0.1),
    marginLeft: moderateScale(10, 0.1),
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(70, 0.1),
    borderTopLeftRadius: moderateScale(30, 0.1),
    borderTopRightRadius: moderateScale(30, 0.1),
    borderTopWidth: moderateScale(1, 0.1),
    borderTopColor: "#e0e0e0",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3, 0.1),
    elevation: moderateScale(5, 0.1),
  },
  TouchableOpacitybtn: {
    flexDirection: "row",
    position: "absolute",
    bottom: moderateScale(28, 0.1),
    left: moderateScale(20, 0.1),
    right: moderateScale(20, 0.1),
    backgroundColor: "#1F2937",
    borderRadius: moderateScale(8, 0.1),
    padding: moderateScale(14, 0.1),
    alignItems: "center",
    justifyContent: "center",
  },
  TouchableOpacitybtnText: {
    color: "#FFF",
    fontSize: moderateScale(16, 0.1),
    marginLeft: moderateScale(5, 0.1),
  },
});
