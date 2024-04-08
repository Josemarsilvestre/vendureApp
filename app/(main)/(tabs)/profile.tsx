import React from 'react';
import { Link, Stack } from 'expo-router';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from '../../../components/common/Icons';
import BoxLink from '../../../components/common/BoxLink';
import AuthWrapper from '../../../components/common/AuthWrapper';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const profilePaths = [
    {
      name: 'Pedidos',
      Icon: Icons.SimpleLineIcons,
      IconName: 'handbag',
      path: '/profile/orders',
    },
    {
      name: 'Favoritos',
      Icon: Icons.Feather,
      IconName: 'heart',
      path: '/profile/lists',
    },
    {
      name: 'Comentários',
      Icon: Icons.FontAwesome5,
      IconName: 'comment',
      path: '/profile/reviews',
    },
    {
      name: 'Gerenciamento de Endereços',
      Icon: Icons.MaterialIcons,
      IconName: 'location-city',
      path: '/profile/addresses',
    },
    {
      name: 'Histórico',
      Icon: Icons.AntDesign,
      IconName: 'clockcircleo',
      path: '/profile/user-history',
    },
    {
      name: 'Informações da Conta',
      Icon: Icons.AntDesign,
      IconName: 'user',
      path: '/profile/personal-info',
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <AuthWrapper tips="Desfrute das Compras">
        <ScrollView style={styles.container}>
          <View style={[styles.mainContainer, { paddingTop: insets.top + 60 }]}>
            <View style={styles.userInfoContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>Josemar Silvestre</Text>
                <Text style={styles.platform}>IOS</Text>
              </View>
              <Link href="/profile/personal-info">
                <Icons.Feather
                  name="edit"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
              </Link>
            </View>

            <View style={styles.linkContainer}>
              {profilePaths.map((item, index) => (
                <BoxLink key={index} path={item.path} name={item.name}>
                  <item.Icon name={item.IconName} size={24} style={styles.icon} />
                </BoxLink>
              ))}
            </View>
          </View>
        </ScrollView>
      </AuthWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  platform: {
    fontSize: 16,
    color: 'gray',
  },
  linkContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  icon: {
    color: 'gray',
    marginRight: 8,
  },
});
