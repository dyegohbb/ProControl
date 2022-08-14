import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  EventSubscriptionVendor,
} from "react-native";
import { Input, Button, Image, Dialog, Text } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import styles from "../assets/styles/main";
import FloatingButton from "../FloatingButton";
import * as Location from "expo-location";
import Axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ListaDeEventos({ route, navigation }) {
  const [evento, setEvento] = useState({});
  const [endereco, setEndereco] = useState("");
  const [eventLocation, setEventLocation] = useState({});
  const [loadingE, setLoadingE] = useState(true);
  const [login, setLogin] = useState({});
  const [geoCodeError, setGeoCodeError] = useState(false);
  const [ type, setType] = useState('');
  

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
    let currentDate = new Date();
    let dataFormatada = currentDate.getDate().toString().padStart(2, "0") + "/" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "/" + currentDate.getFullYear()
    let horaFormatada = currentDate.getHours().toString().padStart(2,"0") + ":" + currentDate.getMinutes().toString().padStart(2,"0")

    let objMock= {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      dataRealizacaoEvento: dataFormatada,
      horarioRealizacaoEvento: horaFormatada,
      imgEventoRealizado: "url",
      codigoEvento: evento.id
    }
    console.log(objMock)
    await Axios.post("http://192.168.0.200:8080/api/v1/evento/promotor", {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      dataRealizacaoEvento: dataFormatada,
      horarioRealizacaoEvento: horaFormatada,
      imgEventoRealizado: "url",
      codigoEvento: evento.id
    })
      .then((response) => {
        navigation.navigate("ListaDeEventos", {refresh: true});
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    _getLocationAsync();
    if (route.params) {
      const { evento } = route.params;
      const { login } = route.params
      const { type } = route.params
      
      setType(type)
      setLogin(login);
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
          setGeoCodeError(true)
          setLoadingE(false)
        }
      };
      attempGeocode().catch(console.error);
    }
  }, []);

  return (
    <View style={[styles.eventoPrincipal]}>
      <TouchableOpacity
        style={[styles.mt50, styles.mStart20]}
        onPress={() => navigation.navigate("ListaDeEventos", {
          login:login,
          refresh: true,
          type: "empresa"
        })}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={30}
          color="white"
        />
      </TouchableOpacity>
      <View style={[styles.alignItemsCenter]}>
        <Image
          source={require("../assets/img/logo.jpg")}
          style={styles.logoImage}
        />
      </View>
      <ScrollView>
        <View style={[{ flex: 3 }, styles.alignItemsCenter]}>
          <Text style={[styles.white, styles.logoText]}>{evento.titulo}</Text>
          <Image source={evento.imgUrl} style={styles.eventoImage} />
          <Text
            style={[
              styles.white,
              styles.logoText,
              styles.mt10,
              styles.fontSize20,
            ]}
          >
            {evento.data}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.mStart10,
              styles.mEnd10,
              styles.white,
              styles.logoText,
              styles.mt10,
              styles.fontSize20,
              { textAlign: "center" },
            ]}
          >
            {evento.details}
          </Text>
        </View>
        <View style={[{ flex: 1 }, styles.alignItemsCenter]}>
          <Text
            style={[
              styles.mStart10,
              styles.mEnd10,
              styles.white,
              styles.logoText,
              styles.mt10,
              styles.fontSize20,
              { textAlign: "center" },
            ]}
          >
            {evento.rua}, {evento.numero}, {evento.bairro}, {evento.cidade} -{" "}
            {evento.estado}
          </Text>
        </View>
        <View style={[{ flex: 3.7 }, styles.alignItemsCenter]}>
          {!loadingE ? (
            !geoCodeError && 
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
          {geoCodeError && <Text style={{color: 'red', fontSize: 20}}>Erro ao localizar endereço {type}</Text>}
        </View>
        
        {!evento.eventoRealizado && type == 'promotor' &&
          <View style={[styles.groupHomeButtons, styles.fRowSpaceCenter]}>
          <Button
            title="Entregar"
            buttonStyle={styles.homeButton}
            containerStyle={styles.width100}
            titleStyle={styles.grey}
            onPress={() => entregarEvento()}
          />
        </View>}

        {evento.eventoRealizado && 
        <View style={styles.alignItemsCenter}>
          <Text style={{color: 'green', fontSize: 20, marginTop: 25}}>Evento realizado na data: {evento.dataRealizacaoEvento}</Text>
          <Text style={{color: 'green', fontSize: 18, marginTop: 0}}>Local de entrega:</Text>
          <MapView
              style={maps.map}
              showsUserLocation={true}
              initialRegion={{
                latitude: Number(evento.latitude),
                longitude: Number(evento.longitude),
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
            >
              <Marker
                coordinate={{
                  latitude: Number(evento.latitude),
                  longitude: Number(evento.longitude),
                  latitudeDelta: 0.0022,
                  longitudeDelta: 0.0021,
                }}
              />
            </MapView>
        </View>
        }
      </ScrollView>
      {!evento.eventoRealizado && type == 'empresa' && 
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.iconsFooter}
          onPress={() => console.log("abacate")}
        >
          <MaterialCommunityIcons
            name="calendar-edit"
            size={30}
            color="white"
          />
          <Text style={styles.white}>Editar Evento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconsFooter}
          onPress={() => console.log("abacate")}
        >
          <MaterialCommunityIcons
            name="account-switch-outline"
            size={30}
            color="white"
          />
          <Text style={styles.white}>Trocar Promotor</Text>
        </TouchableOpacity>
      </View>}
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
