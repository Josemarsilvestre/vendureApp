import React from 'react';
//import { Link } from 'expo-router';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Icons from './Icons';

interface BoxLinkProps {
  children: React.ReactNode;
  path: string;
  name: string;
  style?: ViewStyle; // Propriedade de estilo opcional
}

const BoxLink: React.FC<BoxLinkProps> = ({ children, name, style }) => {
  return (
    //<Link asChild href={path}>
      <TouchableOpacity style={[styles.container, style]}>
        {children} 
        <Text style={styles.name}>{name}</Text> 
        <Icons.MaterialIcons name="keyboard-arrow-right" size={24} style={styles.icon} />
      </TouchableOpacity>
    //</Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#ccc',
  },
  name: {
    flex: 1,
    marginLeft: moderateScale(35),
    marginTop: moderateScale(-24.5),
    marginRight: moderateScale(50),
    fontSize: moderateScale(17),
    color: '#333',
  },
  icon: {
    flex: 1,
    color: '#333',
    marginLeft: moderateScale(304),
    marginTop: moderateScale(-24.5),
    marginBottom: moderateScale(35)
  },
});

export default BoxLink;
