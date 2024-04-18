import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { moderateScale } from "react-native-size-matters";

import { Context } from '../../src/context/authContext';
import { Button } from '../common/Buttons';

export default function CartScreen({ navigation }) {
  const { state } = useContext(Context);

  return (
    <ScrollView>
      {state.isLogged ?
        <View style={styles.scroolViewContainer}>
          <View style={styles.text_view}>
            <Text style={[styles.text_, { marginBottom: moderateScale(20), fontWeight: 'bold' }]}>Carrinho</Text>
            <Text style={styles.text_}>Faça compras para aproveitar o melhor da app</Text>
          </View>
        </View>
        :
        <View style={styles.scroolViewContainer}>
          <View style={styles.text_view}>
            <Text style={styles.text_}>Faça Login para aceder ao carrinho</Text>
          </View>
          <View style={{marginTop: moderateScale(40)}}>
            <Button onPress={() => navigation.navigate('Profile')}>
              Login
            </Button>
          </View>
        </View>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroolViewContainer: {
    margin: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(250)
  },
  TouchableOpacitybtn: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(24),
    backgroundColor: "#fff",
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(15),
  },
  TouchableOpacitybtnText: {
    fontSize: moderateScale(16),
    color: '#212B36',
  },
  text_view: {
    justifyContent: "center",
    alignItems: "center"
  },
  text_: {
    fontSize: moderateScale(16)
  }
});