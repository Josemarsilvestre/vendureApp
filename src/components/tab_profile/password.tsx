import { useMutation, useQuery } from '@apollo/client';
import { View, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet } from 'react-native'
import { moderateScale } from "react-native-size-matters";
import { yupResolver } from '@hookform/resolvers/yup';
import * as SecureStore from 'expo-secure-store';
import { Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';

import { UPDATE_CUSTOMER_PASSWORD } from '../../api/mutation/updateCustomer';
import { GET_CUSTOMER } from '../../api/mutation/profile';
import { changePasswordSchema } from '../../../utils/validation';
import TextField from '../common/TextField';
import { useState } from 'react';

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
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
        setButtonColor("#00FF00");
        navigation.goBack()
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
      newPassword: ""
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      const { currentPassword, newPassword } = data;

      const savedPassword = await SecureStore.getItemAsync("password");
      if (savedPassword === currentPassword) {
        if (currentPassword === newPassword) {
          Alert.alert("Erro", "A nova palavra-passe não pode ser igual à atual.");
        } else {
          await updateCustomerPassword({
            variables: { currentPassword, newPassword },
          });
          
          await SecureStore.setItemAsync("password", newPassword);
        }
      } else {
        Alert.alert("Erro", "A palavra-passe atual não corresponde à guardada.");
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
              style={{ marginBottom: moderateScale(15) }}
            >
              Your password must be at least 4 characters long.
            </Text>
            <View style={styles.fieldsContainer}>
              <TextField
                label="Current password"
                control={control as any}
                errors={errors.currentPassword?.message}
                name="currentPassword"
              />
              <TextField
                label="New password"
                control={control as any}
                errors={errors.newPassword?.message}
                name="newPassword"
              />

              <TouchableOpacity
                style={[styles.TouchableOpacitybtn, { backgroundColor: buttonColor }]}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.TouchableOpacitybtnText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  scroolViewContainer: {
    margin: moderateScale(18),
    justifyContent: "center",
    marginTop: moderateScale(60),
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(6),
  },
  title: {
    color: "#212B36",
    fontWeight: "bold",
    fontSize: moderateScale(16),
    marginBottom: moderateScale(10),
  },
  fieldsContainer: {
    marginTop: moderateScale(5),
  },
  TouchableOpacitybtn: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(24),
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