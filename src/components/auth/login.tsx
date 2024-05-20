import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@apollo/client";
import { moderateScale } from "react-native-size-matters";
import * as SecureStore from "expo-secure-store";

import { LOGIN_MUTATION } from "../../api/mutation/auth";
import { Button } from "../common/Buttons";
import TextField from "../common/TextField";
import { logInSchema } from "../../../utils/validation";
import { Context } from "../../context/context";
import styles from "./Styles.Auth";
import { GET_CUSTOMER } from "../../api/mutation/profile";
import { SHOW_ORDER } from "../../api/mutation/cart";

type LoginFormData = {
  username: string;
  password: string;
};

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { dispatch } = useContext(Context);
  const { refetch: refetchProfile } = useQuery(GET_CUSTOMER);
  const { refetch: refetchCart } = useQuery(SHOW_ORDER);

  const setIsLogged = (boolean: boolean) => {
    dispatch({ type: "isLogged", payload: boolean });
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
    resolver: yupResolver(logInSchema),
    defaultValues: { username: "", password: "" },
  });

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async (data) => {
      try {
        const { login } = data;
        if (login.__typename === "CurrentUser") {
          await refetchProfile();
          await refetchCart();
          setIsLogged(true);
          navigation.navigate("Profile");
          await makeAuthenticatedRequest('http://192.168.1.70:3000/shop-api/');
        } else {
          Alert.alert("Erro", "Utilizador ou senha inválidos.");
        }
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Erro",
          "Ocorreu um erro ao fazer login. Por favor, tente novamente."
        );
      }
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { username, password } = data;

      const response = await loginMutation({ variables: { username, password } });

      if (response.data && response.data.login && response.data.login.__typename === "CurrentUser") {
        const channels = response.data.login.channels;

        if (channels && channels.length > 0) {
          const token = channels[0].token;

          // Armazena o token e a senha de forma segura
          await updateAuthToken(token);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function getAuthToken() {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      console.error("Erro ao obter o token:", error);
      throw error;
    }
  }

  async function updateAuthToken(newToken: string) {
    try {
      await SecureStore.setItemAsync("token", newToken);
    } catch (error) {
      console.error("Erro ao atualizar o token:", error);
      throw error;
    }
  }
  
  async function makeAuthenticatedRequest(url: string, options: RequestInit = {}) {
    try {
      const authToken = await getAuthToken();
      const headers = {
        ...options.headers,
        Authorization: `Bearer ${authToken}`,
      };
      const response = await fetch(url, { ...options, headers });
      return response.json();
    } catch (error) {
      console.error("Erro ao fazer a solicitação autenticada:", error);
      throw error;
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.scroolViewContainer}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: moderateScale(60),
              marginTop: moderateScale(60)
            }}
          >
            <Text variant="titleLarge" style={styles.title}>
              Vendure App
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Text variant="titleMedium" style={styles.title}>
              Sign in
            </Text>
            <View style={styles.fieldsContainer}>
              <TextField
                errors={errors.username?.message}
                placeholder="Email"
                name="username"
                control={control as any}
              />
              <TextField
                errors={errors.password?.message}
                type="password"
                placeholder="Password"
                name="password"
                control={control as any}
              />
              <Button onPress={handleSubmit(onSubmit)}>Login</Button>
              <TouchableOpacity
                style={styles.TouchableOpacitybtn}
                onPress={() => {
                  navigation.setOptions({
                    name: "Register",
                    params: { navigation },
                  });
                  navigation.navigate("Register");
                }}
              >
                <Text style={styles.TouchableOpacitybtnText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}