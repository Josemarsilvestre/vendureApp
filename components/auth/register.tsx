import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ScrollView, View, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { Text } from "react-native-paper"

import { REGISTER_MUTATION } from '../../api/mutation'
import { Button } from '../common/Buttons';
import TextField from '../common/TextField';
import { registerSchema } from '../../utils/validation';
import client from '../../api/client';
import styles from './Styles.Auth'
import { useNavigation } from '@react-navigation/native';

type RegisterFormData = {
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};


export default function RegisterScreen() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  //const { setIsLogged } = useLocalSearchParams()

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormData>({
    //resolver: yupResolver(registerSchema),
    defaultValues: { emailAddress: '', firstName: '', lastName: '', password: '', confirmPassword: '' },
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [registerCustomerAccount, { loading, error }] = useMutation(REGISTER_MUTATION, {
    client: client,
    onError: (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async (data) => {
      const { registerCustomerAccount } = data;

      if (registerCustomerAccount.__typename === "Success") {
        //setIsLogged(true);
        //router.push('/profile');
      } else {
        switch (registerCustomerAccount.__typename) {
          case "MissingPasswordError":
            Alert.alert("Erro ao registrar cliente:", "Por favor, insira uma senha.");
            break;
          case "PasswordValidationError":
            Alert.alert("Erro ao registrar cliente:", "Senha inválida. Por favor, escolha uma senha mais segura.");
            break;
          case "NativeAuthStrategyError":
            Alert.alert("Erro ao registrar cliente:", "Erro na estratégia de autenticação.");
            break;
          default:
            Alert.alert("Erro ao registrar cliente:", "Ocorreu um erro ao registrar. Por favor, tente novamente.");
        }
      }
    }
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { emailAddress, firstName, lastName, password } = data;

      if (isConnected !== null && isConnected) {
        await registerCustomerAccount({
          variables: {
            emailAddress,
            firstName,
            lastName,
            password
          }
        });
      } else {
        Alert.alert("Erro", "Sem conexão à Internet. Por favor, verifique sua conexão e tente novamente.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao fazer login. Por favor, tente novamente.");
    }
  };

  const handleJumpLogin = () => {
    const navigation = useNavigation()
  };

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <KeyboardAvoidingView
      behavior={keyboardBehavior}
      style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.scroolViewContainer}>
          <Text variant="titleLarge" style={styles.title}>Registar</Text>
          <View style={styles.fieldsContainer}>
            <TextField
              errors={errors.emailAddress?.message}
              placeholder="Email"
              name="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              control={control}
            />
            <TextField
              errors={errors.firstName?.message}
              placeholder="Primeiro nome"
              name="firstName"
              control={control}
            />
            <TextField
              errors={errors.lastName?.message}
              placeholder="Último nome"
              name="lastName"
              control={control}
            />
            <TextField
              errors={errors.password?.message}
              type="password"
              placeholder="Palavra-passe"
              name="password"
              control={control}
            />
            <TextField
              errors={errors.confirmPassword?.message}
              type="password"
              placeholder="Confirme a palavra-passe"
              name="confirmPassword"
              control={control}
            />
            <Button onPress={handleSubmit(onSubmit)}>
              Criar conta
            </Button>
          </View>
          <TouchableOpacity style={styles.TouchableOpacitybtn} onPress={handleJumpLogin}>
            <Text style={styles.TouchableOpacitybtnText}>Iniciar Sessão</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
