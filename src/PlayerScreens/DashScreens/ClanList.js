import FadingEdge from 'react-native-fading-edge';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet, PermissionsAndroid, Dimensions, Image, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from '../../Utils/HelperFunctions';
import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';
import Slider from "@react-native-community/slider";
import axios from 'axios';
import { AuthContext } from '../../AuthStuff/AuthProvider';
import { FlatList } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('screen');




export const ClanList = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [myLocation, setMyLocation] = useState({
        lat: "",
        lon: ""
    });

    const [sliderValue, setSliderValue] = useState(2)
    const [clans, setClans] = useState()

    const mapStyles = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c9c9c9"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        }
    ]

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setMyLocation({ lat: position.coords.latitude, lon: position.coords.longitude })
                setLoading(false)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000 }
        );
    }


    const getClans = () => {
        axios
            .post(`http://${"10.0.2.2"}:3000/clan/getclans`, { myLatitude: myLocation.lat, myLongitude: myLocation.lon, miles: sliderValue })
            .then(res => {
                setClans(res.data)
            })
            .catch(err => console.log(err));
        console.log("YURRRR")
    }

    const createClan = () => {
        axios
            .post(`http://${"10.0.2.2"}:3000/clan/createClan`, { latitude: myLocation.lat, longitude: myLocation.lon, id: user._id, name: "Fnatic" })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }


    const onSliderValueChange = (value) => {
        setSliderValue(Math.round(value * 10) / 10)
    }

    useEffect(() => {
        // requestLocationPermission()
        getLocation()
    }, []);



    loading && (
        <View style={styles.mapContainer}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )



    const _renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    margin: 10,
                    alignSelf: "center",
                    height: 200,
                    width: width * .89

                }}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }


    return (
        <View>
            <View style={styles.header}>
                <Slider minimumValue={2} maximumValue={20} step={.1} value={sliderValue} onValueChange={onSliderValueChange} onSlidingComplete={getClans} />
                <Text>{sliderValue}</Text>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    loadingEnabled={true}
                    customMapStyle={mapStyles}
                    region={{
                        latitude: myLocation.lat,
                        longitude: myLocation.lon,
                        latitudeDelta: sliderValue / 25,
                        longitudeDelta: sliderValue / 25,
                    }}
                >

                    <Marker
                        coordinate={{
                            latitude: myLocation.lat,
                            longitude: myLocation.lon,
                        }}
                        title={"fake marker"}
                        description={"fake marker"}
                    >
                        <Image source={require('../../assets/PNGS/location.png')} style={{ width: 20, height: 20 }} />
                    </Marker>


                    <Circle
                        center={{
                            latitude: myLocation.lat,
                            longitude: myLocation.lon,
                        }}
                        radius={sliderValue * 1609.34}
                        strokeColor={"rgba(221,221,255, 1)"}
                        fillColor={"rgba(221,221,255, 0.6)"}
                    />

                    {clans && clans.map((item, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                            }}
                            title={"fake marker"}
                            description={"fake marker"}
                        />
                    ))}

                </MapView>
            </View>




            <View style={styles.clanScrollContainer}>
                <Button onPress={createClan} title='MARK LOCATION' />
                <Button onPress={getClans} title='GETMARKERS IN RANGE' />

            </View>

            <View >
                <FlatList
                    data={clans}
                    keyExtractor={item => item._id}
                    renderItem={_renderItem}
                />
            </View>

        </View >
    )

}


const styles = StyleSheet.create({
    mapContainer: {
        height: height * 0.25,
        width: width * 0.9,
        alignSelf: "center",
        marginTop: 20,

    },
    map: {
        width: "100%",
        height: "100%",
    },

    divv: {
        borderWidth: 1,
        width: "100%",
        height: 50,
        position: "absolute",
        bottom: 0

    },
});
