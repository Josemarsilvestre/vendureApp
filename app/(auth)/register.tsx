import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { router, Stack } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ScrollView, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from "react-native-paper"

import { Button } from '../../components/common/Buttons';
import TextField from '../../components/common/TextField';
import { registerSchema } from '../../utils/validation';
import styles from './Styles.Auth'

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data); // Faça o que quiser com os dados do formulário
  };

  const handleJumpLogin = () => {
    router.back()
  };

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <KeyboardAvoidingView
      behavior={keyboardBehavior}
      style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.scroolViewContainer}>
          <Stack.Screen
            options={{
              title: 'Resgiste-se',
              headerBackTitleVisible: false,
              headerTintColor: '#212B36',
              headerStyle: {
                backgroundColor: '#f0f0f0',
              },
              headerLeft: () => (
                <Ionicons
                  name="arrow-back"
                  size={28}
                  color="#000"
                  onPress={() => {
                    router.back()
                  }}
                />
              ),
            }}
          />
          <View style={styles.View_img2}>
            <Image
              style={styles.img}
              source={require("../../assets/sign_up.png")}
              resizeMode="cover"
            />
          </View>
          <Text variant="titleLarge" style={styles.title}>Registar</Text>
          <View style={styles.fieldsContainer}>
            <TextField
              errors={errors.username?.message}
              placeholder="Nome de utilizador"
              name="username"
              control={control}
            />
            <TextField
              errors={errors.email?.message}
              placeholder="E-mail"
              name="email"
              keyboardType="email-address"
              autoCapitalize="none"
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
              control={control}
              errors={errors.confirmPassword?.message}
              type="password"
              placeholder="Confirme a palavra-passe"
              name="confirmPassword"
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