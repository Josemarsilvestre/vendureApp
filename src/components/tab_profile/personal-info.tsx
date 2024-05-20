import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from "@apollo/client";

import { GET_CUSTOMER } from "../../api/mutation/profile";
import { Customer } from "../../../utils/interface";
import { moderateScale } from "react-native-size-matters";
import TextField from "../common/TextField";
import { updateCustomerSchema } from "../../../utils/validation";
import { UPDATE_CUSTOMER } from "../../api/mutation/updateCustomer";
import { Text } from "react-native-paper";

type CustomerFormData = {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
};

const PersonalInfoScreen = ({navigation}) => {
  const { data, refetch: refetchProfile } = useQuery(GET_CUSTOMER);

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
    onError: (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async () => {
      try {
        await refetchProfile();
        setButtonPressed(true);
        
        setButtonText("Updated");

        navigation.goBack()
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Ocorreu um erro. Por favor, tente novamente.");
      }
    },
  });

  const activeCustomer: Customer | undefined = data?.activeCustomer || {
    id: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
  };

  const [formValues, setFormValues] = useState<CustomerFormData>({
    firstName: activeCustomer?.firstName || "",
    lastName: activeCustomer?.lastName || "",
    phoneNumber: activeCustomer?.phoneNumber || "",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: yupResolver(updateCustomerSchema),
    defaultValues: {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phoneNumber: formValues.phoneNumber,
    },
  });

  const [buttonPressed, setButtonPressed] = useState(false);
  const [buttonText, setButtonText] = useState("Update");

  const onSubmit = async (data: CustomerFormData) => {
    try {
      const { firstName, lastName, phoneNumber } = data;

      await updateCustomer({
        variables: { firstName, lastName, phoneNumber },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = (
    value: string,
    fieldName: keyof CustomerFormData
  ) => {
    const updatedFormValues = { ...formValues, [fieldName]: value };
    setFormValues(updatedFormValues);
    setButtonPressed(false);
    setButtonText("Update");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.scroolViewContainer}>
          <View style={styles.formContainer}>
            <Text variant="titleMedium" style={styles.title}>
              Information
            </Text>
            <Text
              variant="labelMedium"
              style={{ marginBottom: moderateScale(15) }}
            >
              This is the name and number that will be used when you make in-app
              purchases.
            </Text>
            <View style={styles.fieldsContainer}>
              <TextField
                label="Firstname"
                control={control as any}
                errors={errors.firstName?.message}
                value={formValues.firstName}
                onChange={(value) => onChangeHandler(value, "firstName")}
                name="firstName"
              />
              <TextField
                label="Lastname"
                control={control as any}
                errors={errors.lastName?.message}
                value={formValues.lastName}
                onChange={(value) => onChangeHandler(value, "lastName")}
                name="lastName"
              />

              <TextField
                label="Phone"
                control={control as any}
                errors={errors.phoneNumber?.message}
                value={formValues.phoneNumber}
                onChange={(value) => onChangeHandler(value, "phoneNumber")}
                name="phoneNumber"
              />
              <TouchableOpacity
                style={[
                  styles.TouchableOpacitybtn,
                  buttonPressed && styles.buttonPressed,
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
};

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
  buttonPressed: {
    backgroundColor: "green",
  },
});

export default PersonalInfoScreen;
