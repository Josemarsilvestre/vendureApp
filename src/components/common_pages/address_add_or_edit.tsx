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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from "@apollo/client";
import { Text } from "react-native-paper";

import { GET_CUSTOMER } from "../../api/mutation/profile";
import { addressSchema } from "../../../utils/validation";
import {
  COUNTRY_CODE,
  CREATE_CUSTOMER_ADDRESS,
} from "../../api/mutation/updateCustomer";
import TextField from "../common/TextField";
import PageLoading from "../loading/PageLoading";
import DropdownController from "../dropdown/DropdownController";

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

const AddressEdition = ({ route, navigation }) => {
  const {
    id,
    fullName_navigation,
    company_navigation,
    streetLine1_navigation,
    city_navigation,
    province_navigation,
    postalCode_navigation,
    countryCode_navigation,
    phoneNumber_navigation,
  } = route.params;

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

  const [formValues, setFormValues] = useState<AddressFormData>({
    fullName: fullName_navigation || "",
    company: company_navigation || "",
    streetLine1: streetLine1_navigation || "",
    city: city_navigation || "",
    province: province_navigation || "",
    postalCode: postalCode_navigation || "",
    countryCode: countryCode_navigation || "",
    phoneNumber: phoneNumber_navigation || "",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      fullName: formValues.fullName,
      company: formValues.company,
      streetLine1: formValues.streetLine1,
      city: formValues.city,
      province: formValues.province,
      postalCode: formValues.postalCode,
      countryCode: formValues.countryCode,
      phoneNumber: formValues.phoneNumber,
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

  const onChangeHandler = (value: string, fieldName: keyof AddressFormData) => {
    const updatedFormValues = { ...formValues, [fieldName]: value };
    setFormValues(updatedFormValues);
  };

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
              value={formValues.fullName}
              onChange={(value) => onChangeHandler(value, "fullName")}
              name="fullName"
            />
            <TextField
              label="Enterprise"
              control={control}
              errors={errors.company?.message}
              value={formValues.company}
              onChange={(value) => onChangeHandler(value, "company")}
              name="company"
            />
            <TextField
              label="Address"
              control={control}
              errors={errors.streetLine1?.message}
              value={formValues.streetLine1}
              onChange={(value) => onChangeHandler(value, "streetLine1")}
              name="streetLine1"
            />
            <TextField
              label="City"
              control={control}
              errors={errors.city?.message}
              value={formValues.city}
              onChange={(value) => onChangeHandler(value, "city")}
              name="city"
            />
            <TextField
              label="Council/Province"
              control={control}
              errors={errors.province?.message}
              value={formValues.province}
              onChange={(value) => onChangeHandler(value, "province")}
              name="province"
            />
            <TextField
              label="Postal code"
              control={control}
              errors={errors.postalCode?.message}
              value={formValues.postalCode}
              onChange={(value) => onChangeHandler(value, "postalCode")}
              name="postalCode"
            />
            <Text style={styles.label}>Country</Text>
            <DropdownController
              name="countryCode"
              control={control}
              options={countryOptions}
              value={formValues.countryCode}
              onChange={(value) => onChangeHandler(value, "countryCode")}
              placeholder="Select a country..."
            />
            <TextField
              label="Phone"
              control={control}
              errors={errors.phoneNumber?.message}
              value={formValues.phoneNumber}
              onChange={(value) => onChangeHandler(value, "phoneNumber")}
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
    marginBottom: 90,
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
