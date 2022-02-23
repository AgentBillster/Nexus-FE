import React, { useContext, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, PermissionsAndroid, Dimensions, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../AuthStuff/AuthProvider';




export const Home = () => {

    const { logout } = useContext(AuthContext)


    return (
        <View>
            <TouchableOpacity onPress={logout}>

                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )

}
