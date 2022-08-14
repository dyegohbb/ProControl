import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Image, Dialog, Text, Icon } from "react-native-elements";
import styles from "../assets/styles/main";
import FloatingButton from "../FloatingButton";
// import FloatingButton from "react-native-social-fab";
import Axios from "axios";
import Toast from "../SimpleToast";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LocationGeofencingEventType } from "expo-location";

const empresa = {
  cnpj: "15151",
  razao: "asdasd",
  telefone: "asdasd",
  email: "asdasd",
  cep: "454545",
  end: "asdasd",
  representante: "asdasd",
};

const eventosMock = [
  {
    id: 1,
    titulo: "Extra - Jaboatão dos guararapes",
    data: "21/08/2022",
    imgUrl: require("../assets/img/hiper.jpg"),
    rua: "Rua Sanharó",
    numero: "129",
    bairro: "Planalto",
    cidade: "Abreu e Lima",
    estado: "PE",
    details:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sagittis velit torquent class ornare",
    promotor: "teste teste",
    endEntrega: "",
    dataEntrega: "",
  },
  {
    id: 2,
    titulo: "Assaí - Abreu e Lima",
    data: "22/08/2022",
    imgUrl: require("../assets/img/assai.jpeg"),
    rua: "Rua Sapoti",
    numero: "11",
    bairro: "Planalto",
    cidade: "Abreu e Lima",
    estado: "PE",
    details:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sagittis velit torquent class ornare",
    promotor: "teste teste",
    endEntrega: "",
    dataEntrega: "",
  },
  {
    id: 3,
    titulo: "Carrefour - Ibura",
    data: "23/08/2022",
    imgUrl: require("../assets/img/carrefour.jpg"),
    rua: "Rua Marechal Costa e Silva",
    numero: "110",
    bairro: "Planalto",
    cidade: "Abreu e Lima",
    estado: "PE",
    details:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sagittis velit torquent class ornare",
    promotor: "teste teste",
    endEntrega: "",
    dataEntrega: "",
    eventoRealizado: true,
    promotor: 1,
    latitude: -7.9035673,
    longitude: -34.91780010000001,
    dataRealizacaoEvento: '28/02/2022',
    eventoRealizado: true,
  },
  {
    id: 4,
    titulo: "Americanas - Shopping Patteo",
    data: "23/08/2022",
    imgUrl: require("../assets/img/americanas.jpg"),
    rua: "Rua Sanharó",
    numero: "129",
    bairro: "Planalto",
    cidade: "Abreu e Lima",
    estado: "PE",
    details:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sagittis velit torquent class ornare",
    promotor: "teste teste",
    endEntrega: "",
    dataEntrega: "",
  },
];

export default function ListaDeEventos({ route, navigation }) {
  const [isOpenDialog, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [login, setLogin] = useState({});
  const [eventos, setEventos] = useState([]);
  const [isLogout, setLogout] = useState(false);
  const [type, setType] = useState('');

  var issRefresh = false;
  var idEmpresa = null;
  var loginType = null;
  var idPromotor = null;
  useEffect(() => {
    setEventos(eventosMock);
    setLogin({
      login: "dhbb",
    });

    if (route.params) {
      const { login } = route.params;
      const { type } = route.params;
      const { refresh } = route.params
      issRefresh = refresh;
      idEmpresa = login.codigoEmpresa;
      loginType = type
      idPromotor = login.codigoPromotor
      setLogin(login);
      setType(type);
    } else {
      setDialogText(
        "OPS! Tivemos um problema, contate um administrador do sistema."
      );
      setDialogTitle("Problemas no carregamento");
      toggleDialog();
    }
    if(issRefresh){
      if(loginType == 'empresa'){
        refresh(idEmpresa, loginType);
      }else if(loginType == 'promotor'){
        refresh(idPromotor, loginType);
      }
      
    }
  }, []);

  const toggleDialog = () => {
    setDialogOpen(!isOpenDialog);
  };

  async function logout() {
    //APAGAR STORAGE ANTES DE VOLTAR PRA LOGIN
    navigation.navigate("Login");
  }

  const toggleLogout = () => {
    setLogout(true);
    setDialogText("Deseja mesmo efetuar o logout?");
    setDialogTitle("Desconectar");
    toggleDialog();
  };

  async function refresh(id, type) {
    Toast.show("Atualizando lista de eventos...", Toast.LONG);
    let url = "http://192.168.0.200:8080/api/v1/eventos/" + type + "/"
    await Axios.get(url + id)
      .then((response) => {
        let data = response.data
        let eventosTemp = [];
        for (let index = 0; index < data.length; index++) {
          const evento = data[index];
          let eventoTemp = {
            id: evento.codigoEvento,
            titulo: evento.titulo,
            data: evento.data,
            imgUrl: require("../assets/img/carrefour.jpg"),
            cep: evento.endereco.cep,
            rua: evento.endereco.rua,
            numero: evento.endereco.numero,
            bairro: evento.endereco.bairro,
            cidade: evento.endereco.cidade,
            estado: evento.endereco.estado,
            details: evento.detalhe || "",
            promotor: evento.codigoPromotor,
            latitude: evento.latitude,
            longitude: evento.longitude,
            dataRealizacaoEvento: evento.dataRealizacaoEvento || "",
            eventoRealizado: evento.eventoRealizado || false,
          }
          eventosTemp.push(eventoTemp)
        }
        setEventos(eventosTemp)
        Toast.show("Lista atualizada com sucesso!", Toast.SHORT);
      })
      .catch((error) => {
        Toast.show("Erro ao atualizar.", Toast.LONG);
        console.log(error);
      });
  }

  const goToEvento = (evento) => {
    navigation.navigate("Evento", {
      evento: evento,
      login: login,
      type: type,
    });
  };

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
        <View style={[styles.alignItemsCenter, styles.mb20]}></View>
        {eventos.map((e) => (
          <TouchableOpacity
            key={e.id}
            style={[styles.eventCard, styles.mb20]}
            onPress={() => goToEvento(e)}
          >
            <Text style={[styles.white, styles.fontSize20, styles.mb4]}>
              {e.titulo}
            </Text>
            <Image source={e.imgUrl} style={styles.eventoLogo} />
            <Text style={[styles.white, styles.fontSize20, styles.mt4]}>
              {e.data}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        {type == 'empresa' &&
        <TouchableOpacity
          style={styles.iconsFooter}
          onPress={() => navigation.navigate('CadastroEvento', {login: login, edit: false})}
        >
          <MaterialCommunityIcons
            name="calendar-plus"
            size={30}
            color="white"
          />
          <Text style={styles.white}>Criar Evento</Text>
        </TouchableOpacity>}

        <TouchableOpacity
          style={styles.iconsFooter}
          onPress={() => {
            if(type == 'promotor'){
              refresh(login.codigoPromotor, type)
            }else if(type == 'empresa'){
              refresh(login.codigoEmpresa, type)
            }
          }}
        >
          <MaterialCommunityIcons
            name="calendar-sync"
            size={30}
            color="white"
          />
          <Text style={styles.white}>Atualizar</Text>
        </TouchableOpacity>

        {type =='empresa' &&
          <TouchableOpacity
          style={styles.iconsFooter}
          onPress={() => navigation.navigate('CadastroPromotor', {login: login})}
        >
          <Feather name="user-plus" size={30} color="white" />
          <Text style={styles.white}>Criar Promotor</Text>
        </TouchableOpacity>}

        <TouchableOpacity
          style={styles.iconsFooter}
          onPress={() => toggleLogout()}
        >
          <MaterialCommunityIcons name="logout" size={30} color="white" />
          <Text style={styles.white}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Dialog isVisible={isOpenDialog} onBackdropPress={toggleDialog}>
        <Dialog.Title title={dialogTitle} />
        <Text>{dialogText}</Text>
        <Dialog.Actions>
          {isLogout ? (
            <View style={styles.fRowSpaceAround}>
              <Dialog.Button title="Cancelar" onPress={() => toggleDialog()} />
              <Dialog.Button title="Sair" onPress={() => logout()} />
            </View>
          ) : (
            <Dialog.Button
              title="Voltar"
              onPress={() => navigation.navigate("Login")}
            />
          )}
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
