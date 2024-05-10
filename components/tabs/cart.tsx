import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

import { Context } from "../../src/context/context";
import { Button } from "../common/Buttons";

export default function CartScreen({ navigation }) {
  const { state } = useContext(Context);

  const content = () => {
    return (
      <View style={styles.scroolViewContainer}>
        <View style={styles.text_view}>
          <Text style={styles.text_}>
            Make purchases to get the best out of the app
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      {state.isLogged ? (
        content()
      ) : (
        <View style={styles.scroolViewContainer}>
          <View style={styles.text_view}>
            <Text style={styles.text_}>Log in to access the cart</Text>
          </View>
          <View style={{ marginTop: moderateScale(40) }}>
            <Button onPress={() => navigation.navigate("Profile")}>
              Login
            </Button>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroolViewContainer: {
    margin: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(250),
  },
  TouchableOpacitybtn: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(24),
    backgroundColor: "#fff",
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(15),
  },
  TouchableOpacitybtnText: {
    fontSize: moderateScale(16),
    color: "#212B36",
  },
  text_view: {
    justifyContent: "center",
    alignItems: "center",
  },
  text_: {
    fontSize: moderateScale(16),
  },
});
