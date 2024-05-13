import React, { useState, useEffect, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";

import { REGISTER_MUTATION } from "../../src/api/graphql/auth";
import { Button } from "../common/Buttons";
import TextField from "../common/TextField";
import { registerSchema } from "../../utils/validation";
import { Context } from "../../src/context/context";
import client from "../../src/api/client";
import styles from "./Styles.Auth";

type RegisterFormData = {
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

interface RegisterScreenProps {
  navigation: any;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { dispatch } = useContext(Context);

  const setIsLogged = (boolean: boolean) => {
    dispatch({ type: "isLogged", payload: boolean });
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      emailAddress: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [registerCustomerAccount, { loading, error }] = useMutation(
    REGISTER_MUTATION,
    {
      client: client,
      onError: (error) => {
        Alert.alert("Erro", error.message);
      },
      onCompleted: async (data) => {
        const { registerCustomerAccount } = data;

        if (registerCustomerAccount.__typename === "Success") {
          setIsLogged(true);
          navigation.navigate("Profile");
        } else {
          switch (registerCustomerAccount.__typename) {
            case "MissingPasswordError":
              Alert.alert(
                "Erro ao registrar cliente:",
                "Por favor, insira uma senha."
              );
              break;
            case "PasswordValidationError":
              Alert.alert(
                "Erro ao registrar cliente:",
                "Senha inválida. Por favor, escolha uma senha mais segura."
              );
              break;
            case "NativeAuthStrategyError":
              Alert.alert(
                "Erro ao registrar cliente:",
                "Erro na estratégia de autenticação."
              );
              break;
            default:
              Alert.alert(
                "Erro ao registrar cliente:",
                "Ocorreu um erro ao registrar. Por favor, tente novamente."
              );
          }
        }
      },
    }
  );

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { emailAddress, firstName, lastName, password } = data;
      await registerCustomerAccount({
        variables: {
          emailAddress,
          firstName,
          lastName,
          password,
        },
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao fazer login. Por favor, tente novamente."
      );
    }
  };

  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.scroolViewContainer}>
          <Text variant="titleLarge" style={styles.title}>
            Sign up
          </Text>
          <View style={styles.fieldsContainer}>
            <TextField
              errors={errors.emailAddress?.message}
              placeholder="Email"
              name="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              control={control}
            />
            <TextField
              errors={errors.firstName?.message}
              placeholder="First name"
              name="firstName"
              control={control}
            />
            <TextField
              errors={errors.lastName?.message}
              placeholder="Last name"
              name="lastName"
              control={control}
            />
            <TextField
              errors={errors.password?.message}
              type="password"
              placeholder="Password"
              name="password"
              control={control}
            />
            <TextField
              errors={errors.confirmPassword?.message}
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              control={control}
            />
            <Button onPress={handleSubmit(onSubmit)}>Register</Button>
          </View>
          <TouchableOpacity
            style={styles.TouchableOpacitybtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.TouchableOpacitybtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
