import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import ConfettiCannon from "react-native-confetti-cannon";

export default function AccountCreatedScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const confettiRef = useRef(null);

  const handleContinueShopping = () => {
    navigation.goBack(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="check-circle" size={moderateScale(24)} color="#4CAF50" />
          <Text style={[styles.title, {marginTop: moderateScale(-10)}]}>Account Created Successfully</Text>
        </View>

        <View>
          <Text
            style={[
              styles.title,
              { fontSize: moderateScale(17), marginTop: moderateScale(50) },
            ]}
          >
            Check the email to access the account.
          </Text>
        </View>
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
          { paddingBottom: insets.bottom, paddingTop: 65 },
        ]}
      >
        <TouchableOpacity
          style={styles.TouchableOpacitybtn}
          onPress={handleContinueShopping}
        >
          <Text style={styles.TouchableOpacitybtnText}>Go to Login</Text>
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
    flexDirection: "column",
    padding: moderateScale(18),
  },
  title: {
    color: "#000",
    textAlign: "center",
    fontSize: moderateScale(24),
    marginLeft: moderateScale(10),
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(70),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    borderTopWidth: moderateScale(1),
    borderTopColor: "#e0e0e0",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: moderateScale(5),
  },
  TouchableOpacitybtn: {
    flexDirection: "row",
    position: "absolute",
    bottom: moderateScale(28),
    left: moderateScale(20),
    right: moderateScale(20),
    backgroundColor: "#1F2937",
    borderRadius: moderateScale(8),
    padding: moderateScale(14),
    alignItems: "center",
    justifyContent: "center",
  },
  TouchableOpacitybtnText: {
    color: "#FFF",
    fontSize: moderateScale(16),
    marginLeft: moderateScale(5),
  },
});
