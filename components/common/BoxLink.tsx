import React from 'react';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import Icons from './Icons';

interface BoxLinkProps {
  children: React.ReactNode;
  path: string;
  name: string;
  style?: ViewStyle; // Adicionamos a propriedade de estilo opcional
}

const BoxLink: React.FC<BoxLinkProps> = ({ children, path, name, style }) => {
  return (
    <Link asChild href={path}>
      <TouchableOpacity style={[styles.container, style]}>
        {children}
        <Text style={styles.name}>{name}</Text>
        <Icons.MaterialIcons name="keyboard-arrow-right" size={24} style={styles.icon} />
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
  icon: {
    color: '#333',
  },
});

export default BoxLink;
