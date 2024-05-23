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
    <ScrollView>
      <View style={styles.scrollViewContainer}>
        <TouchableOpacity
          style={styles.TouchableOpacitybtn}
          onPress={handleLogout}
        >
          <Text style={styles.TouchableOpacitybtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    margin: moderateScale(18),
    justifyContent: "center",
    marginTop: moderateScale(600),
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
