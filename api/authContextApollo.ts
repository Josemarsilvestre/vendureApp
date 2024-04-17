// authContextApollo.ts

import { createContext, useContext } from 'react';

type AuthContextType = {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
};

const AuthContextApollo = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContextApollo);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextApollo Provider');
  }
  return context;
};

export default AuthContextApollo;
