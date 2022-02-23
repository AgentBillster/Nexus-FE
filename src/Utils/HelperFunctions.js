import { PermissionsAndroid, } from 'react-native';


export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Example App',
                'message': 'Example App access to your location '
            }
        )
        if (granted) {
            console.log("You can use the location")
        } else {
            console.log("location permission denied")
            alert("Location permission denied");
        }
    } catch (err) {
        console.warn(err)
    }











    // import React, {useContext} from 'react';

    // import {TabNavigator} from '../PlayerScreens/DashScreens/TabNavigator';
    // import {AuthContext} from '../AuthStuff/AuthProvider';
    // import VenueFTS from '../VenueScreens/VenueFTS';
    // import AsyncStorage from '@react-native-async-storage/async-storage';
    // import {PlayerSetup} from '../PlayerScreens/SetupScreens/PlayerSetup';

    // export const Dispatch = () => {
    //   const {user} = useContext(AuthContext);

    //   const toSetup = {
    //     player: <PlayerSetup />,
    //     venue: <VenueFTS />,
    //   };

    //   const toDash = {
    //     player: <TabNavigator />,
    //     venue: <VenueFTS />,
    //   };

    //   if (user.setup === false) {
    //     return toSetup[user.role];
    //   } else {
    //     return toDash[user.role];
    //   }
    // };
}