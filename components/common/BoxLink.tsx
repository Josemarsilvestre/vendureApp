import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Icons from './Icons';

interface BoxLinkProps {
  children: React.ReactNode;
  path: string;
  name: string;
  style?: ViewStyle;
}

const BoxLink: React.FC<BoxLinkProps> = ({ children, name, style, path }) => {
  return (
      <TouchableOpacity style={[styles.container, style]} onPress={() => path}>
        {children} 
        <Text style={styles.name}>{name}</Text> 
        <Icons.MaterialIcons name="keyboard-arrow-right" size={24} style={styles.icon} />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: moderateScale(13),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#ccc',
  },
  name: {
    flex: 1,
    marginLeft: moderateScale(40),
    marginTop: moderateScale(-24),
    fontSize: moderateScale(16.5),
    color: '#333',
  },
  icon: {
    flex: 1,
    color: '#333',
    marginLeft: moderateScale(290),
    marginTop: moderateScale(-24),
  },
});

export default BoxLink;
