import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface DisplayErrorProps {
  errors: string | undefined;
}

const DisplayError: React.FC<DisplayErrorProps> = ({ errors }) => {
  return (
    <View style={styles.container}>
      {!!errors && (
        <View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 29,
  },
  errorContainer: {
    minWidth: 'auto',
    marginTop: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
  },
});

export default DisplayError;
