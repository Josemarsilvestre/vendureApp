import { View, Text, ScrollView } from 'react-native'
import { moderateScale } from "react-native-size-matters";

export default function ProductScreen() {
  return (
    <ScrollView>
      <View style={{alignItems: "center", justifyContent: "center", marginTop: moderateScale(300)}}>
        <Text style={{ fontSize: moderateScale(16) }}>Product Page</Text>
      </View>
    </ScrollView>
  )
}