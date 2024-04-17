import React, { useContext} from 'react';
import LoginScreen from '../auth/login';
import { Context } from '../../src/context/authContext';
import { useNavigation } from '@react-navigation/native';

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
