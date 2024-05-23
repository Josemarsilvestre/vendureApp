import { View } from 'react-native'

import Loading from './Loading'
import styles from './style/style.loading';

export default function BigLoading() {
  return (
    <View style={styles.container_Big}>
      <Loading />
    </View>
  )
}
