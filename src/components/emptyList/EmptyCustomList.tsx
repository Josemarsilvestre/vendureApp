import React from 'react';
import { Text, View } from 'react-native';

import styles from './style/style.empty';

const EmptyCustomList = () => {
  return (
    <View style={styles.containe_EmptyCustomerList}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Data isn't ready yet</Text>
      </View>
    </View>
  );
};

export default EmptyCustomList;
