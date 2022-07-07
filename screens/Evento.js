import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';

export default function ListaDeEventos() {

    return (
        <View style={maps.container}>
            <MapView
                style={maps.map}
                initialRegion={{
                    latitude: -7.90398923,
                    longitude: -34.91774261,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                <Marker coordinate={{
                    latitude: -7.90398923,
                    longitude: -34.91774261,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,
                }} />
            </MapView>
        </View>
    );
}

const maps = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})