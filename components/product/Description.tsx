import React from 'react';
import {Text, View, StyleSheet } from 'react-native'

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
        <Text style={styles.text}>{product.description}</Text>
      </View>
      <View style={styles.sectionDivideY}/>
    </View>
  )
}

export default Description;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 3,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 7,
    borderBottomWidth: 2,
    borderColor: 'red',
    alignSelf: 'flex-start',
  },
  sectionDivideY: {
    borderBottomWidth: 1,
    borderBottomColor: 'black', 
    marginBottom: 10,
  },
});

