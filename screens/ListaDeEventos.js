import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Image, Dialog, Text, Icon } from "react-native-elements";
import styles from "../assets/styles/main";
import FloatingButton from "../FloatingButton";
// import FloatingButton from "react-native-social-fab";
import Axios from "axios";
import Toast from '../SimpleToast';


const eventosMock = [{
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
  const [login, setLogin] = useState({});
  const [eventos, setEventos] = useState([]);
  const [isLogout, setLogout] = useState(false);


  const onPress = () => {
    console.log("amigo estou aqui");
  };

  useEffect(() => {
    setEventos(eventosMock)
    setLogin({
      login: "dhbb",
    })

    if (route.params) {
      const { login } = route.params;
      setLogin(login);
    } else {
      setDialogText("OPS! Tivemos um problema, contate um administrador do sistema.");
      setDialogTitle("Problemas no carregamento")
      toggleDialog();
    }
  }, []);

  const toggleDialog = () => {
    setDialogOpen(!isOpenDialog);
  };

  async function logout() {
    //APAGAR STORAGE ANTES DE VOLTAR PRA LOGIN
    navigation.navigate("Login")
  }

  const toggleLogout = () => {
    setLogout(true);
    setDialogText("Deseja mesmo efetuar o logout?");
    setDialogTitle("Desconectar")
    toggleDialog();
  }

  async function refresh() {
    Toast.show('Atualizando lista de eventos...', Toast.LONG)
    await Axios.post(
      "http://localhost:8080/eventos",
      {
        login: login,
      }
    )
      .then((response) => {
        Toast.show('Lista atualizada com sucesso!', Toast.LONG)
        setEventos(response)
      })
      .catch((error) => {
        Toast.show('Erro ao atualizar.', Toast.LONG)
        console.log(error)
      });
  }


  return (
    <View style={styles.listaDeEventos}>
      <View style={[styles.alignItemsCenter, styles.mt25]}>
        <Image
          source={require("../assets/img/logo.jpg")}
          style={styles.logoImage}
        />
        <Text style={[styles.white, styles.logoText]}>Lista de eventos</Text>
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
      <View style={[styles.fRowSpaceBtw, styles.mt10, styles.zindex1]}>
        <FloatingButton
          onPressUsers={() => console.log("teste")}
          onPressEvent={() => console.log("teste")}
          onPressRefresh={refresh}
          onPressLogout={toggleLogout}
          position={{ bottom: 100, right: 60 }}
        />
      </View>
      <View style={styles.alignItemsCenter}>
        <Text style={[styles.fontSize10, styles.white, styles.mb4]}>
          Empresa: Quality Promotores
        </Text>
      </View>
      <Dialog isVisible={isOpenDialog} onBackdropPress={toggleDialog}>
        <Dialog.Title title={dialogTitle} />
        <Text>{dialogText}</Text>
        <Dialog.Actions>
          {isLogout ?
            <View style={styles.fRowSpaceAround}>
              <Dialog.Button
              title="Cancelar"
              onPress={() => toggleDialog()}/>
              <Dialog.Button
              title="Sair"
              onPress={() => logout()}/>
            </View>
             :
            <Dialog.Button
              title="Voltar"
              onPress={() => navigation.navigate("Login")}
            />}
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
