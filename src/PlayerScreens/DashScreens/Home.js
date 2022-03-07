import React, { useContext, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, PermissionsAndroid, Dimensions, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../AuthStuff/AuthProvider';
import { requestLocationPermission } from "../../Utils/HelperFunctions"



export const Home = () => {


    useEffect(() => {
        requestLocationPermission()
    }, []);

    const { logout, user } = useContext(AuthContext)

    console.log(user)
    return (
        <View>
            <TouchableOpacity onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )

}
