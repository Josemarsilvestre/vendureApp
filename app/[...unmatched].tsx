import { Stack } from 'expo-router'
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function NotFoundPage() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '404 Not Found!',
          headerBackTitleVisible: false,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>404 Not Found!</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
});

