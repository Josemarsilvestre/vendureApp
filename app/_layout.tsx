import { Stack } from 'expo-router/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
      <Stack.Screen
          name="(main)/(tabs)"
          options={{
            headerShown: false
          }}
      />
      </Stack>
    </SafeAreaProvider>
  )
}
