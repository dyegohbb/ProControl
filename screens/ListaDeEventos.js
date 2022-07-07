import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Button, Image, Dialog, Text, Icon } from "react-native-elements";
import styles from "../assets/styles/main";
import Axios from "axios";

export default function ListaDeEventos({ route, navigation }) {

  const [isOpenDialog, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [cred, setCred] = useState({});

  useEffect(() => {

    async function listarEventos(credentials) {
      console.log(credentials)
      await Axios.post("http://localhost:8080/eventos", {
        login: credentials.login,
      }, {
        headers: {
          'token': credentials.token,
        }
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        });
    }
    if (route.params) {
      const { credentials } = route.params;
      setCred(credentials);

      listarEventos(credentials);
    } else {
      // setDialogText("OPS! Tivemos um problema, contate um administrador do sistema.");
      // setDialogTitle("Problemas no carregamento")
      // toggleDialog();
    }


  }, []);

  const toggleDialog = () => {
    setDialogOpen(!isOpenDialog);
  };

  return (
    <View style={styles.listaDeEventos}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          source={require("../assets/img/logo.jpg")}
          style={styles.logoImage}
        />
        <Text style={[styles.white, styles.logoText]}>Lista de eventos</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Icon
          color="white"
          containerStyle={{ marginStart: 20 }}
          disabledStyle={{}}
          iconProps={{}}
          iconStyle={{}}
          name="account-multiple-plus"
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
          size={35}
          type="material-community"
        />
        <Icon
          color="white"
          containerStyle={{ marginEnd: 20 }}
          disabledStyle={{}}
          iconProps={{}}
          iconStyle={{}}
          name="calendar-plus"
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
          size={35}
          type="material-community"
        />
      </View>
      <ScrollView style={{ marginHorizontal: 20, marginTop: 12 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/img/hiper.jpg")}
            style={styles.eventoLogo}
          />
          <Text style={{ fontSize: 45 }}>
            PROCONTROL
          </Text>
        </View>
      </ScrollView>
      <Dialog
        isVisible={isOpenDialog}
        onBackdropPress={toggleDialog}
      >
        <Dialog.Title title={dialogTitle} />
        <Text>{dialogText}</Text>
        <Dialog.Actions>
          <Dialog.Button title="Voltar" onPress={() => navigation.navigate("Login")} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
