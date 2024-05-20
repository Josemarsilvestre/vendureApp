import React, { useContext, useEffect, useState } from "react";
import LoginScreen from "./login";
import * as SecureStore from "expo-secure-store";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGOUT } from "../../api/mutation/auth";
import { Context } from "../../context/context";
import { Alert } from "react-native";
import { GET_CUSTOMER } from "../../api/mutation/profile";
import { SHOW_ORDER } from "../../api/mutation/cart";
import PageLoading from "../loading/PageLoading";

interface AuthScreenProps {
  children: React.ReactNode;
  navigation: any;
}

export default function AuthScreen({ children, navigation }: AuthScreenProps) {
  const { state, dispatch } = useContext(Context);
  const [checkingToken, setCheckingToken] = useState(true);

  const [getCustomer, { data: customerData, loading: customerLoading }] = useLazyQuery(GET_CUSTOMER);
  const [getOrder, { refetch: refetchCart }] = useLazyQuery(SHOW_ORDER);

  const setIsLogged = (isLogged: boolean) => {
    dispatch({ type: "isLogged", payload: isLogged });
  };

  const [logoutMutation] = useMutation(LOGOUT, {
    onError: (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async () => {
      try {
        await refetchCart();
        await SecureStore.deleteItemAsync("token");
        setIsLogged(false);
        navigation.navigate("Profile");
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "An error has occurred. Please try again.");
      }
    },
  });

  useEffect(() => {
    checkTokenExistence();
  }, []);

  const checkTokenExistence = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        await getCustomer();
        await getOrder();
        setIsLogged(true);
      } else {
        await logoutMutation();
      }
    } catch (error) {
      await logoutMutation();
    } finally {
      setCheckingToken(false);
    }
  };

  if (customerLoading || checkingToken) {
    return <PageLoading />;
  }

  if (state.isLogged === false || customerData?.activeCustomer === null) {
    return <LoginScreen navigation={navigation} />;
  }

  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, {
        refetchProfile: getCustomer,
        refetchCart,
      })}
    </>
  );
}
