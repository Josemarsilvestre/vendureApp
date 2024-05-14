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
    minHeight: moderateScale(29),
    marginTop: moderateScale(7),
    marginLeft: moderateScale(2),
    marginBottom: moderateScale(-7)
  },
  errorContainer: {
    minWidth: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  errorText: {
    color: '#ff0000',
    fontSize: moderateScale(13),
  },
});

export default DisplayError;
