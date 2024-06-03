import React from 'react';
import {Text, View, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters';

interface DescriptionProps {
  product: {
    description: string;
  };
}

const Description: React.FC<DescriptionProps> = ({ product }) => {

  return (
    <View>
      <Text style={styles.header}>Description</Text>
      <View style={styles.container}>
        <Text style={styles.text}>{product?.description}</Text>
      </View>
    </View>
  )
}

export default Description;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(3),
  },
  header: {
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(8),
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  text: {
    marginBottom: moderateScale(7),
    borderBottomWidth: moderateScale(2),
    borderColor: 'red',
    alignSelf: 'flex-start',
  },
  sectionDivideY: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: 'black', 
    marginBottom: moderateScale(10),
  },
});

