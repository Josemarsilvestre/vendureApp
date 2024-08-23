import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { moderateScale } from "react-native-size-matters";

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
    minHeight: moderateScale(29, 0.1),
    marginTop: moderateScale(7, 0.1),
    marginLeft: moderateScale(2, 0.1),
    marginBottom: moderateScale(-7, 0.1)
  },
  errorContainer: {
    minWidth: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  errorText: {
    color: '#ff0000',
    fontSize: moderateScale(13, 0.1),
  },
});

export default DisplayError;
