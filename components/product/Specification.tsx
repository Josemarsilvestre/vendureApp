import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Specification = () => {

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Specification</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    maxWidth: '100%',
  },
  header: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  specList: {
    marginBottom: 12,
  },
  specItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  specTitle: {
    marginRight: 8,
    width: 120,
    fontSize: 14,
    color: '#666',
  },
  specValue: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  expandButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
  },
  expandButtonText: {
    fontSize: 14,
    color: '#008080',
  },
  expandButtonIcon: {
    color: '#008080',
  },
});

export default Specification;
