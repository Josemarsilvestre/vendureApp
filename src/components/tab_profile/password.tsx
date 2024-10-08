import { useMutation, useQuery } from "@apollo/client";
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { yupResolver } from "@hookform/resolvers/yup";
import * as SecureStore from "expo-secure-store";
import { Text } from "react-native-paper";
import { useForm } from "react-hook-form";

import { UPDATE_CUSTOMER_PASSWORD } from "../../api/mutation/password";
import { GET_CUSTOMER } from "../../api/mutation/customer";
import { changePasswordSchema } from "../../../utils/validation";
import TextField from "../common/TextField";
import { useState } from "react";

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function PasswordScreen({ navigation }) {
  const { refetch: refetchProfile } = useQuery(GET_CUSTOMER);

  const [updateCustomerPassword] = useMutation(UPDATE_CUSTOMER_PASSWORD, {
    onError: (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async () => {
      try {
        await refetchProfile();
        setButtonText("Updated");
        setButtonColor("green");
        navigation.goBack();
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Ocorreu um erro. Por favor, tente novamente.");
      }
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      const { currentPassword, newPassword } = data;

      const savedPassword = await SecureStore.getItemAsync("password");
      if (savedPassword === currentPassword) {
        if (currentPassword === newPassword) {
          Alert.alert(
            "Erro",
            "A nova palavra-passe não pode ser igual à atual."
          );
        } else {
          await updateCustomerPassword({
            variables: { currentPassword, newPassword },
          });

          await SecureStore.setItemAsync("password", newPassword);
        }
      } else {
        Alert.alert(
          "Erro",
          "A palavra-passe atual não corresponde à guardada."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [buttonText, setButtonText] = useState("Update");
  const [buttonColor, setButtonColor] = useState("#212B36");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.scroolViewContainer}>
          <View style={styles.formContainer}>
            <Text variant="titleMedium" style={styles.title}>
              Change Password
            </Text>
            <Text
              variant="labelMedium"
              style={{ marginBottom: moderateScale(15, 0.1) }}
            >
              Your password must be at least 4 characters long.
            </Text>
            <View style={styles.fieldsContainer}>
              <TextField
                label="Current password"
                control={control as any}
                errors={errors.currentPassword?.message}
                type="password"
                name="currentPassword"
              />
              <TextField
                label="New password"
                control={control as any}
                errors={errors.newPassword?.message}
                type="password"
                name="newPassword"
              />

              <TextField
                label="Confirm password"
                errors={errors.confirmPassword?.message}
                type="password"
                name="confirmPassword"
                control={control}
              />

              <TouchableOpacity
                style={[
                  styles.TouchableOpacitybtn,
                  { backgroundColor: buttonColor },
                ]}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.TouchableOpacitybtnText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroolViewContainer: {
    margin: moderateScale(18, 0.1),
    justifyContent: "center",
    marginTop: moderateScale(60, 0.1),
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: moderateScale(8, 0.1),
    paddingVertical: moderateScale(6, 0.1),
  },
  title: {
    color: "#212B36",
    fontWeight: "bold",
    fontSize: moderateScale(16, 0.1),
    marginBottom: moderateScale(10, 0.1),
  },
  fieldsContainer: {
    marginTop: moderateScale(5, 0.1),
  },
  TouchableOpacitybtn: {
    paddingVertical: moderateScale(12, 0.1),
    paddingHorizontal: moderateScale(24, 0.1),
    borderRadius: moderateScale(8, 0.1),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(15, 0.1),
  },
  TouchableOpacitybtnText: {
    fontSize: moderateScale(16, 0.1),
    color: "#fff",
  },
});
