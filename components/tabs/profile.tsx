import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from "react-native-size-matters";

import Icons from '../common/Icons';
import BoxLink from '../common/BoxLink';
import AuthScreen from '../auth/auth';

export default function ProfileScreen({navigation}) {
    const insets = useSafeAreaInsets();

    const profilePaths = [
    {
        name: 'Informações da conta',
        Icon: Icons.FontAwesome5,
        IconName: 'user',
        path: "Information_account",
    },
    {
        name: 'Histórico de compras',
        Icon: Icons.AntDesign,
        IconName: 'shoppingcart',
        path: "History",
    },
    {
        name: 'Moradas',
        Icon: Icons.MaterialIcons,
        IconName: 'location-city',
        path: "Address",
    },
    {
        name: 'Pedidos',
        Icon: Icons.SimpleLineIcons,
        IconName: 'handbag',
        path: "Orders",
    },
    {
        name: 'Favoritos',
        Icon: Icons.Feather,
        IconName: 'heart',
        path: "Favorite",
    },   
];


    return (
        <AuthScreen>
            <ScrollView style={styles.container}>
                <View style={[styles.mainContainer, { paddingTop: insets.top + 20 }]}>
                    <View style={styles.userInfoContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>Josemar Silvestre</Text>
                            <Text style={styles.platform}>beemote@vendure.io</Text>
                        </View>
                        <TouchableOpacity onPress={()=> navigation.navigate("Edit")}>
                            <Icons.Feather
                                name="edit"
                                size={30}
                                color="black"
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.linkContainer}>
                        {profilePaths.map((item, index) => (
                            <BoxLink key={index} path={item.path} name={item.name} navigation={navigation}>
                                <item.Icon name={item.IconName} size={24} style={styles.icon} />
                            </BoxLink>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </AuthScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
    },
    textContainer: {
        flex: 1,
        marginLeft: moderateScale(8),
    },
    name: {
        fontSize: moderateScale(20),
        fontWeight: 'bold'
    },
    platform: {
        fontSize: moderateScale(16),
        color: 'gray',
    },
    linkContainer: {
        marginTop: moderateScale(35),
        paddingHorizontal: moderateScale(10),
    },
    icon: {
        color: 'gray'
    },
});
