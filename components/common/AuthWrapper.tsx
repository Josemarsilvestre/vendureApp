import React from 'react';
//import { useUserInfo } from '@/hooks';
//import SigninPromoRenderer from '../renderer/SigninPromoRenderer';
import LoginScreen from '../../app/(auth)/login';

interface AuthWrapperProps {
  children: React.ReactNode;
  tips: string;
}

export default function AuthWrapper({ children, tips }: AuthWrapperProps) {
  //const { userInfo, isVerify, isLoading } = useUserInfo();

  return (
    <LoginScreen />
  );
}
//<>{isLoading ? null : !isVerify || !userInfo ? <LoginScreen /> : <>{children}</>}</>