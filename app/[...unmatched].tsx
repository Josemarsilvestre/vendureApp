import { Stack, router } from 'expo-router'
import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { moderateScale } from "react-native-size-matters";
import { Ionicons } from '@expo/vector-icons';

export default function NotFoundPage() {
  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: '404 Not Found!',
          headerBackTitleVisible: false,
          headerTintColor: '#212B36',
            headerStyle: {
              backgroundColor: '#f0f0f0',
            },
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={25}
                color="#000"
                onPress={() => {
                  router.back()
                }}
              />
            ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Página não encontrada!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(8),
    marginTop: moderateScale(300)
  },
  text: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: '#000',
  },
});

