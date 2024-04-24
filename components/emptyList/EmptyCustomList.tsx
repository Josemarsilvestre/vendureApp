import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const EmptyCustomList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Data isn't ready yet</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: moderateScale(14),
  }
});

export default EmptyCustomList;
