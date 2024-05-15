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

  const [login] = useMutation(LOGIN_MUTATION, {
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

      const response = await login({ variables: { username, password } });

      if (
        response.data &&
        response.data.login &&
        response.data.login.__typename === "CurrentUser"
      ) {
        const channels = response.data.login.channels;

        if (channels && channels.length > 0) {
          const token = channels[0].token;
          const passw = password;

          await save(token, passw);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function save(token: string, password: string) {
    try {
      await SecureStore.setItemAsync("token", token);
      await SecureStore.setItemAsync("password", password);
    } catch (error) {
      console.error("Erro ao salvar o token e a senha:", error);
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
              marginBottom: moderateScale(50),
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
