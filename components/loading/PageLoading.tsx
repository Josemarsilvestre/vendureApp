import { View, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters';

import BigLoading from './BigLoading'

export default function PageLoading() {
  return (
    <View style={styles.container}>
      <BigLoading />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      zIndex: moderateScale(40),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
