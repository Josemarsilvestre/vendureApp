import { View, Text, ScrollView } from 'react-native'
import { moderateScale } from "react-native-size-matters";

export default function FavoriteScreen() {
  return (
    <ScrollView>
      <View style={{alignItems: "center", justifyContent: "center", marginTop: moderateScale(300, 0.1)}}>
        <Text style={{ fontSize: moderateScale(16, 0.1) }}>Página de Favoritos</Text>
      </View>
    </ScrollView>
  )
}

