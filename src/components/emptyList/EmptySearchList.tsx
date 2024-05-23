import React from 'react';
import { Text, View } from 'react-native';

import styles from './style/style.empty';

const EmptySearchList: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer_EmptySearch}>
          <Text>No results found</Text>
        </View>
        <Text style={styles.text_EmptySearch}>Use more keywords or check input attributes</Text>
      </View>
    </View>
  );
};

export default EmptySearchList;
