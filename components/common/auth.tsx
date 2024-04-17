import React from 'react';
import LoginScreen from '../auth/login';
import { useAuth } from "../../api/authContextApollo";

interface AuthWrapper {
  children: React.ReactNode;
}

export default function AuthScreen({ children }: AuthWrapper) {
  const { isLogged, setIsLogged } = useAuth();

  return (
    <>
      {isLogged ? <>{children}</> : <LoginScreen />}
    </>
  );
}
