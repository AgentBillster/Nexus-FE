import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';

const TopTab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('screen');


export const Clan = ({ user }) => {

    // extrapolate clan stuff into a 

    const [clanInfo, setClanInfo] = useState()
    const [loading, setLoading] = useState(true)


    console.log(clanInfo)

    const getMyClan = () => {
        axios
            .get(`http://${"10.0.2.2"}:3000/clan/getMyClan`, {
                params: {
                    clanID: user.clan
                }
            })
            .then(res => {
                setClanInfo(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getMyClan()
    }, []);


    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#00ff00" />
            </View >
        )
    }

    return (
        <View style={{ height, width }}>
            <TopTab.Navigator screenOptions={{
                tabBarPressColor: "white",
                swipeEnabled: true
            }}>
                <TopTab.Screen name="home" children={() => <Home clanInfo={clanInfo} />} />
                <TopTab.Screen name="history" children={() => <History clanInfo={clanInfo} />} />
                <TopTab.Screen name="members" children={() => <Members clanInfo={clanInfo} />} />
                <TopTab.Screen name="recruits" children={() => <Recruits clanInfo={clanInfo} />} />
            </TopTab.Navigator>
        </View>
    )
}


export const Home = ({ clanInfo }) => {

    return (
        <View>
            <Text>home</Text>
        </View>
    )
}

export const History = ({ clanInfo }) => {

    return (
        <View>
            <Text>history</Text>
        </View>
    )
}

export const Members = ({ clanInfo }) => {

    clanInfo

    return (
        <View>
            {clanInfo.members && clanInfo.members.map((members, index) => {
                return (
                    <View key={index}>
                        <Text>{members}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export const Recruits = ({ clanInfo }) => {

    const joinClan = (recruitID) => {
        axios
            .post(`http://${"10.0.2.2"}:3000/clan/joinClan`, { clanID: clanInfo._id, recruitID: recruitID })
            .then(res => {
                console.log(res)

            })
            .catch(err => console.log(err));
    }

    return (
        <View>
            {clanInfo.recruits.map((recruit, index) => {
                return (
                    <TouchableOpacity key={index}
                        onPress={() => { joinClan(recruit._id) }} style={{ width, height: 150, borderWidth: 1 }}>
                        <Text>{recruit.email}</Text>
                    </TouchableOpacity>
                )
            })}

        </View>
    )
}