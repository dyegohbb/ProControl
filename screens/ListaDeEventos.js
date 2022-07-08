import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Image, Dialog, Text, Icon } from "react-native-elements";
import styles from "../assets/styles/main";
import FloatingButton from "../FloatingButton";
import Axios from "axios";


const eventos = [{
  id: 1,
  titulo: "Extra - Jaboatão dos guararapes",
  data: "21/08/2022",
  imgUrl: require("../assets/img/hiper.jpg"),
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
},
{
  id: 2,
  titulo: "Assaí - Abreu e Lima",
  data: "22/08/2022",
  imgUrl: require("../assets/img/assai.jpeg"),
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
},
{
  id: 3,
  titulo: "Carrefour - Ibura",
  data: "23/08/2022",
  imgUrl: require("../assets/img/carrefour.jpg"),
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
},
{
  id: 4,
  titulo: "Americanas - Shopping Patteo",
  data: "23/08/2022",
  imgUrl: require("../assets/img/americanas.jpg"),
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
}];


export default function ListaDeEventos({ route, navigation }) {
  const [isOpenDialog, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [cred, setCred] = useState({});


  const onPress = () => {
    console.log("amigo estou aqui");
  };

  useEffect(() => {
    async function listarEventos(credentials) {
      console.log(credentials);
      await Axios.post(
        "http://localhost:8080/eventos",
        {
          login: credentials.login,
        },
        {
          headers: {
            token: credentials.token,
          },
        }
      )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
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
      <View style={{ zIndex: 1 }}>
        <FloatingButton
          onPressFacebook={() => alert('facebook icon pressed')}
          onPressTwitter={() => alert('Twitter icon pressed')}
          onPressInstagram={() => alert('instagram icon pressed')}
          position={{ top: 140, right: 30 }}
        />
      </View>
      <View style={[styles.alignItemsCenter, styles.mt25]}>
        <Image
          source={require("../assets/img/logo.jpg")}
          style={styles.logoImage}
        />
        <Text style={[styles.white, styles.logoText]}>Lista de eventos</Text>
      </View>
      <View style={[styles.fRowSpaceBtw, styles.mt10]}>
        <Icon
          color="white"
          containerStyle={styles.mStart20}
          name="calendar-plus"
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
          size={35}
          type="material-community"
        />
        <Icon
          color="white"
          containerStyle={styles.mEnd20}
          name="refresh"
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
          size={35}
          type="material-community"
        />
        <Icon
          color="white"
          containerStyle={styles.mEnd20}
          name="account-multiple-plus"
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
          size={35}
          type="material-community"
        />
      </View>
      <ScrollView style={styles.eventScrollBody}>
        <View style={[styles.alignItemsCenter, styles.mb20]}>

        </View>
        {eventos.map(e =>
          <TouchableOpacity key={e.id} style={[styles.eventCard, styles.mb20]} onPress={onPress}>
            <Text style={[styles.white, styles.fontSize20, styles.mb4]}>
              {e.titulo}
            </Text>
            <Image source={e.imgUrl} style={styles.eventoLogo} />
            <Text style={[styles.white, styles.fontSize20, styles.mt4]}>{e.data}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.alignItemsCenter}>
        <Text style={[styles.fontSize10, styles.white, styles.mb4]}>
          Empresa: Quality Promotores
        </Text>
      </View>
      <Dialog isVisible={isOpenDialog} onBackdropPress={toggleDialog}>
        <Dialog.Title title={dialogTitle} />
        <Text>{dialogText}</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="Voltar"
            onPress={() => navigation.navigate("Login")}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
