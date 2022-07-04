import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Image, Dialog, Text } from "react-native-elements";
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
      setDialogText("OPS! Tivemos um problema, contate um administrador do sistema.");
      setDialogTitle("Problemas no carregamento")
      toggleDialog();
    }


  }, []);

  const toggleDialog = () => {
    setDialogOpen(!isOpenDialog);
  };

  return (
    <View style={styles.principal}>
      <View>
        <Image
          source={require("../assets/logo.jpg")}
          style={styles.logoImage}
        />
      </View>
      <View style={[styles.groupHomeButtons, styles.fRowSpaceAround]}>
        <Button
          title="ASDASDASD"
          buttonStyle={styles.homeButton}
          containerStyle={styles.width100}
          titleStyle={styles.grey}
          onPress={() =>
            navigation.navigate("Login", {
              error: false,
            })
          }
        />
        <Button
          title="ASDASD"
          buttonStyle={styles.homeButton}
          containerStyle={styles.width100}
          titleStyle={styles.grey}
          onPress={() => navigation.navigate("CadastroPromotor")}
        />
      </View>
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
