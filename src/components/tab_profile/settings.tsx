import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../../api/mutation/auth";
import { GET_CUSTOMER } from "../../api/mutation/customer";
import { SHOW_ORDER } from "../../api/mutation/order";
import { Context } from "../../context/context";
import * as SecureStore from "expo-secure-store";

export default function SettingScreen({ navigation }) {
  const { dispatch } = useContext(Context);
  const { refetch: refetchProfile } = useQuery(GET_CUSTOMER);
  const { refetch: refetchCart } = useQuery(SHOW_ORDER);

  const setIsLogged = (boolean: boolean) => {
    dispatch({ type: "isLogged", payload: boolean });
  };

  const [logoutMutation] = useMutation(LOGOUT, {
    onError: (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async () => {
      try {
        await refetchProfile();
        await refetchCart();
        await removeLogin();
        setIsLogged(false);
        navigation.navigate("Profile");
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Ocorreu um erro. Por favor, tente novamente.");
      }
    },
  });

  const handleLogout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.error(error);
    }
  };

  const removeLogin = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("password");
    } catch (error) {
      console.error("Erro ao remover token:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings Page</Text>
      </View>

      <View
        style={[
          styles.bottomContainer,
          {
            paddingBottom: moderateScale(31, 0.1),
            paddingTop: moderateScale(65, 0.1),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.TouchableOpacitybtn}
          onPress={handleLogout}
        >
          <Text style={styles.TouchableOpacitybtnText}>Logout</Text>
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
    fontSize: moderateScale(16, 0.1),
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
