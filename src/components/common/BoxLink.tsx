import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Icons from './Icons';

interface BoxLinkProps {
  children: React.ReactNode;
  path: string;
  name: string;
  style?: ViewStyle;
  navigation: any;
}

const BoxLink: React.FC<BoxLinkProps> = ({ children, name, style, path, navigation }) => {
  return (
      <TouchableOpacity style={[styles.container, style]} onPress={() => navigation.navigate(path)}>
        {children} 
        <Text style={styles.name}>{name}</Text> 
        <Icons.MaterialIcons name="keyboard-arrow-right" size={moderateScale(24, 0.1)} style={styles.icon} />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: moderateScale(13, 0.1),
    paddingHorizontal: moderateScale(16, 0.1),
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: '#ccc',
  },
  name: {
    flex: 1,
    marginLeft: moderateScale(40, 0.1),
    marginTop: moderateScale(-24, 0.1),
    fontSize: moderateScale(16.5, 0.1),
    color: '#333',
  },
  icon: {
    flex: 1,
    color: '#333',
    textAlign: 'right',
    marginTop: moderateScale(-24, 0.1),
  },
});

export default BoxLink;
