import React, { useContext, useEffect} from 'react';
import LoginScreen from './login';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";

import { Context } from '../../src/context/context';

interface AuthScreenProps {
  children: React.ReactNode;
}

export default function AuthScreen({ children }: AuthScreenProps) {
  const { state, dispatch} = useContext(Context);
  const navigation = useNavigation()

  const setIsLogged = (boolean: boolean) => {
    dispatch({ type: "isLogged", payload: boolean });
  };

  const checkTokenExpiration = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        setIsLogged(false);
        return;
      }
    } catch (error) {
      console.error("Erro ao verificar a expiração do token:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkTokenExpiration();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      {state.isLogged ? <>{children}</> : <LoginScreen navigation={navigation}/>}
    </>
  );
}
