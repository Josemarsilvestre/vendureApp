import React, { useContext} from 'react';
import LoginScreen from '../../app/(auth)/login';
import { Context } from "../../src/context/authContext";

interface AuthWrapper {
  children: React.ReactNode;
}

export default function AuthScreen({ children }: AuthWrapper) {
  const { state } = useContext(Context);

  return (
    <>{state.isLogged ? <>{children}</> : <LoginScreen />}</>
  );
}