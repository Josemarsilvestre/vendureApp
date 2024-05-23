import { View } from 'react-native'

import BigLoading from './BigLoading'
import styles from './style/style.loading';

export default function PageLoading() {
  return (
    <View style={styles.container_PageLoading}>
      <BigLoading />
    </View>
  )
}
