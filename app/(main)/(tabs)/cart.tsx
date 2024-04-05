import { View, Text } from 'react-native'
import tw from 'tailwind-react-native-classnames';

export default function CartScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <Text>Página do carrinho</Text>
    </View>
  )
}

