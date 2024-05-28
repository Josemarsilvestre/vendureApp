import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function PaymentConfirmationScreen({ navigation }) {

  const handleContinueShopping = () => {
    navigation.navigate("Index")
  };

  return (
    <ScrollView>
      <View style={styles.scrollViewContainer}>
      <Text style={styles.TouchableOpacitybtnText}>Continue Shopping</Text>
        <TouchableOpacity
          style={styles.TouchableOpacitybtn}
          onPress={handleContinueShopping}
        >
          <Text style={styles.TouchableOpacitybtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    margin: moderateScale(18),
    justifyContent: "center",
    marginTop: moderateScale(200),
  },
  TouchableOpacitybtn: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(24),
    backgroundColor: "#212B36",
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(15),
  },
  TouchableOpacitybtnText: {
    fontSize: moderateScale(16),
    color: "#fff",
  },
});
