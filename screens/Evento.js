import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Input, Button, Image, Dialog, Text } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import styles from "../assets/styles/main";
import FloatingButton from "../FloatingButton";

export default function ListaDeEventos({ route, navigation }) {
  const [evento, setEvento] = useState({});
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
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
    }
  }, []);
  console.log(endereco);
  return (
    <View style={[styles.eventoPrincipal]}>
      <View style={[styles.fRowSpaceBtw, styles.mt10, styles.zindex1]}>
        <FloatingButton
          onPressUsers={() => console.log("teste")}
          onPressEvent={() => console.log("teste")}
          onPressRefresh={() => console.log("teste")}
          onPressLogout={() => console.log("teste")}
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
          <MapView
            style={maps.map}
            initialRegion={{
              latitude: -7.90398923,
              longitude: -34.91774261,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: -7.90398923,
                longitude: -34.91774261,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,
              }}
            />
          </MapView>
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

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
