import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from "@apollo/client";
import { Text } from "react-native-paper";
import Dropdown from "../common/Dropdown";

import { GET_CUSTOMER } from "../../api/mutation/profile";
import { addressSchema } from "../../../utils/validation";
import {
  COUNTRY_CODE,
  CREATE_CUSTOMER_ADDRESS,
} from "../../api/mutation/updateCustomer";
import TextField from "../common/TextField";
import PageLoading from "../loading/PageLoading";
import DropdownController from "../common/DropdownController";

type AddressFormData = {
  fullName: string;
  company?: string;
  streetLine1: string;
  city: string;
  province: string;
  postalCode: string;
  countryCode: string;
  phoneNumber: string;
};

const AddressEdition = ({ navigation }) => {
  const { refetch: refetchProfile } = useQuery(GET_CUSTOMER);
  const {
    data: countryData,
    loading: countryLoading,
    error: countryError,
  } = useQuery(COUNTRY_CODE);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const [buttonColor, setButtonColor] = useState("#212B36");
  const [buttonText, setButtonText] = useState("Update");

  const [createCustomerAddress] = useMutation(CREATE_CUSTOMER_ADDRESS, {
    onError: (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async () => {
      try {
        await refetchProfile();

        setButtonColor("green");
        setButtonText("Updated");

        navigation.goBack();
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "An error has occurred. Please try again.");
      }
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      fullName: "",
      company: "",
      streetLine1: "",
      city: "",
      province: "",
      postalCode: "",
      countryCode: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: AddressFormData) => {
    try {
      const {
        fullName,
        company,
        streetLine1,
        city,
        province,
        postalCode,
        countryCode,
        phoneNumber,
      } = data;

      if (selectedCountry) {
        await createCustomerAddress({
          variables: {
            fullName,
            company,
            streetLine1,
            city,
            province,
            postalCode,
            countryCode,
            phoneNumber,
          },
        });
      } else {
        Alert.alert("Erro", "Please select a country.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "An error has occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (countryData?.availableCountries.length && !selectedCountry) {
      setSelectedCountry(countryData.availableCountries[0].code);
    }
  }, [countryData]);

  if (countryLoading) return <PageLoading />;
  if (countryError) return <Text>Error loading countries</Text>;

  const countryOptions =
    countryData?.availableCountries?.map((country) => ({
      label: country.name,
      value: country.code,
    })) || [];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Address</Text>
          <Text style={styles.subtitle}>
            This is the address that will be used when you make in-app
            purchases.
          </Text>
          <View style={styles.fieldsContainer}>
            <TextField
              label="Fullname"
              control={control}
              errors={errors.fullName?.message}
              name="fullName"
            />
            <TextField
              label="Enterprise"
              control={control}
              errors={errors.company?.message}
              name="company"
            />
            <TextField
              label="Address"
              control={control}
              errors={errors.streetLine1?.message}
              name="streetLine1"
            />
            <TextField
              label="City"
              control={control}
              errors={errors.city?.message}
              name="city"
            />
            <TextField
              label="Council/Province"
              control={control}
              errors={errors.province?.message}
              name="province"
            />
            <TextField
              label="Postal code"
              control={control}
              errors={errors.postalCode?.message}
              name="postalCode"
            />
            <Text style={styles.label}>Country</Text>
            <DropdownController
              name="countryCode"
              control={control}
              options={countryOptions}
              placeholder="Select a country..."
            />
            <TextField
              label="Phone"
              control={control}
              errors={errors.phoneNumber?.message}
              name="phoneNumber"
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: buttonColor }]}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    margin: 18,
    justifyContent: "center",
    marginTop: 20,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  title: {
    color: "#212B36",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 15,
  },
  fieldsContainer: {
    marginTop: 5,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#212B36",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 110,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
});

export default AddressEdition;
