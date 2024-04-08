import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';


export default function SigninPromoRenderer(){

  const handleJumpLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Ainda não tem sessão iniciada!</Text>
        <Text style={styles.subtitle}>Faça login para ver o carrinho</Text>
      </View>
      <TouchableOpacity
        onPress={handleJumpLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Ir para login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 15,
    color: '#333',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f00',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
});

