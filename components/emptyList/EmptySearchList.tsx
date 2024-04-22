import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const EmptySearchList: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text>Nenhum resultado encontrado</Text>
        </View>
        <Text style={styles.text}>Use mais palavras-chave ou verifique os atributos de entrada</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateScale(20),
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: moderateScale(60),
    width: moderateScale(60),
  },
  infoContainer: {
    maxWidth: moderateScale(300),
    padding: moderateScale(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: moderateScale(8),
    marginBottom: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: '#CBD5E0',
    borderRadius: moderateScale(8),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  text: {
    color: '#718096',
  },
});

export default EmptySearchList;
