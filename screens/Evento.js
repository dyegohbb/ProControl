import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Input, Button, Image, Dialog, Text } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import styles from "../assets/styles/main";
import FloatingButton from "../FloatingButton";
import * as Location from "expo-location";
import Axios from "axios";

export default function ListaDeEventos({ route, navigation }) {
  const [evento, setEvento] = useState({});
  const [endereco, setEndereco] = useState("");
  const [eventLocation, setEventLocation] = useState({});
  const [loadingE, setLoadingE] = useState(true);

  const [userLocation, setUserLocation] = useState({});
  _getLocationAsync = async () => {
    console.log("teste");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Localização não permitida pelo usuário");
    }
  };

  async function entregarEvento() {
    let location = await Location.getCurrentPositionAsync({});

    await Axios.post("http://localhost:8080/evento/" + evento.id, {
      localizacao: location,
      dataDeEntrega: new Date(),
    })
      .then((response) => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error.message);
        console.log({
          localizacao: location,
          dataDeEntrega: new Date().toLocaleString("pt-BR", {
            timeZone: "America/Recife",
          }),
        });
      });
  }

  useEffect(() => {
    _getLocationAsync();
    if (route.params) {
      const { evento } = route.params;
      setEvento(evento);
      let end =
        evento.rua +
        ", " +
        evento.numero +
        " - " +
        evento.bairro +
        ", " +
        evento.cidade +
        " - " +
        evento.estado;
      setEndereco(end);
      const attempGeocode = async () => {
        try {
          const result = await Location.geocodeAsync(end);
          let location = {
            latitude: result[0].latitude,
            longitude: result[0].longitude,
          };
          setEventLocation(location);
          setLoadingE(false);
        } catch (e) {
          console.log(e.message);
        }
      };
      attempGeocode().catch(console.error);
    }
  }, []);

  return (
    <View style={[styles.eventoPrincipal]}>
      <View style={[styles.fRowSpaceBtw, styles.mt10, styles.zindex1]}>
        <FloatingButton
          onPressEditEvent={() => console.log("teste")}
          onPressAddPromotor={() => console.log("teste")}
          tipo={"evento"}
          orientacao={"down"}
          position={{ top: 5, right: 20 }}
        />
      </View>
      <View style={[styles.alignItemsCenter, styles.mt25]}>
        <Image
          source={require("../assets/img/logo.jpg")}
          style={styles.logoImage}
        />
      </View>
      <ScrollView>
        <View style={[{ flex: 3 }, styles.alignItemsCenter]}>
          <Text style={[styles.white, styles.logoText]}>{evento.titulo}</Text>
          <Image source={evento.imgUrl} style={styles.eventoImage} />
          <Text style={[styles.white, styles.logoText, styles.mt10]}>
            {evento.data}
          </Text>
        </View>
        <View>
          <Text style={[styles.white, styles.logoText, styles.mt10]}>
            {evento.details}
          </Text>
        </View>
        <View style={[{ flex: 1 }, styles.alignItemsCenter]}>
          <Text style={[styles.white, styles.logoText, styles.mt10]}>
            {evento.rua}, {evento.numero}
          </Text>
          <Text style={[styles.white, styles.logoText]}>{evento.bairro}</Text>
          <Text style={[styles.white, styles.logoText]}>
            {evento.cidade} - {evento.estado}
          </Text>
        </View>
        <View style={[{ flex: 3.7 }, styles.alignItemsCenter]}>
          {!loadingE ? (
            <MapView
              style={maps.map}
              showsUserLocation={true}
              initialRegion={{
                latitude: eventLocation.latitude,
                longitude: eventLocation.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
            >
              <Marker
                coordinate={{
                  latitude: eventLocation.latitude,
                  longitude: eventLocation.longitude,
                  latitudeDelta: 0.0022,
                  longitudeDelta: 0.0021,
                }}
              />
            </MapView>
          ) : (
            <View style={[styles.groupHomeButtons, styles.fRowSpaceAround]}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </View>
        <View style={[styles.groupHomeButtons, styles.fRowSpaceCenter]}>
          <Button
            title="Entregar"
            buttonStyle={styles.homeButton}
            containerStyle={styles.width100}
            titleStyle={styles.grey}
            onPress={() => entregarEvento()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const maps = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    width: 350,
    height: 200,
  },
});
