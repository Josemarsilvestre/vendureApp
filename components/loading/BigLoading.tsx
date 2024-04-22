import { View, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters';

import Loading from './Loading'

export default function BigLoading() {
  return (
    <View style={styles.container}>
      <Loading />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: moderateScale(16),
    marginHorizontal: 'auto',
    marginBottom: moderateScale(16),
    textAlign: 'center', 
    borderRadius: moderateScale(8),
    backgroundColor: 'rgba(255, 0, 0, 0.9)',
    maxWidth: 9999,
  },
});
