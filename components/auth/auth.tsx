import React, { useContext, useEffect} from 'react';
import LoginScreen from './login';
import { Context } from '../../src/context/context';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";

interface AuthWrapper {
  children: React.ReactNode;
}


export default function AuthScreen({ children }: AuthWrapper) {
  const { state } = useContext(Context);
  const navigation = useNavigation()

  return (
    <>
      {state.isLogged ? <>{children}</> : <LoginScreen navigation={navigation}/>}
    </>
  );
}
