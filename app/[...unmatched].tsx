import { Stack } from 'expo-router'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';

export default function NotFoundPage() {
  //? Render(s)
  return (
    <>
      <Stack.Screen
        options={{
          title: '404 Not Found!',
          headerBackTitleVisible: false,
        }}
      />
      <View style={tw`flex h-full flex-col items-center justify-center py-8 gap-y-6 bg-white`}>
        <Text style={tw`text-base font-semibold text-black`}>404 Not Found!</Text>
      </View>
    </>
  )
}
