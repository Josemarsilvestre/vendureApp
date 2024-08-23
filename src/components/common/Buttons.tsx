import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import Loading from '../loading/Loading'
import { moderateScale } from "react-native-size-matters";

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
    paddingVertical: moderateScale(12, 0.1),
    paddingHorizontal: moderateScale(24, 0.1),
    backgroundColor: "#212B36",
    borderRadius: moderateScale(8, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(15, 0.1)
  },
  buttonText: {
    fontSize: moderateScale(16, 0.1),
    color: '#fff',
  },
  roundedButton: {
    borderRadius: moderateScale(20, 0.1),
  },
  loginButton: {
    marginHorizontal: 'auto',
    borderRadius: moderateScale(24, 0.1),
    width: moderateScale(120, 0.1),
  },
  submitButton: {
    width: '100%',
    maxWidth: moderateScale(280, 0.1),
    marginHorizontal: 'auto',
    borderRadius: moderateScale(12, 0.1),
  },
});

export { Button, LoginBtn, SubmitModalBtn };
