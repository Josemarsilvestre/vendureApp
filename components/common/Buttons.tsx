import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import Loading from '../loading/Loading'
import { ScaledSheet, moderateScale, scale } from "react-native-size-matters";

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
  isRounded?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ isLoading = false, children, style, isRounded = false, ...restProps }) => {
  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    isRounded && styles.roundedButton,
    style,
  ];

  return (
    <TouchableOpacity
      disabled={isLoading}
      style={buttonStyle}
      {...restProps}
    >
      {isLoading ? <Loading /> : <Text style={styles.buttonText}>{children}</Text>}
    </TouchableOpacity>
  );
};

interface LoginBtnProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const LoginBtn: React.FC<LoginBtnProps> = ({ children, ...restProps }) => (
  <Button style={styles.loginButton} {...restProps}>
    {children}
  </Button>
);

interface SubmitModalBtnProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const SubmitModalBtn: React.FC<SubmitModalBtnProps> = ({ children, ...restProps }) => (
  <Button style={styles.submitButton} {...restProps}>
    {children}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#212B36",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  roundedButton: {
    borderRadius: 20,
  },
  loginButton: {
    marginHorizontal: 'auto',
    borderRadius: 24,
    width: 120,
  },
  submitButton: {
    width: '100%',
    maxWidth: 280,
    marginHorizontal: 'auto',
    borderRadius: 12,
  },
});

export { Button, LoginBtn, SubmitModalBtn };
