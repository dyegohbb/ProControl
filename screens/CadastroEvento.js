import React, { useState, useEffect } from "react";
import { Keyboard, ScrollView } from "react-native";
import { View } from "react-native";
import { Text, Input, Button, Image, Dialog } from "react-native-elements";
import styles from "../assets/styles/main";
import Axios from "axios";
import Toast from '../SimpleToast';

const codigoDeCadastro = "abc";

export default function CadastroEvento({ route, navigation }) {
  const [isOpenDialog, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [login, setLogin] = useState("");
  const [inputs, setInputs] = useState({
    titulo: "",
    data: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    details: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (route.params) {
        const { login } = route.params;
        setLogin(login);
      }
  }, [])
  

  const toggleDialog = () => {
    setDialogOpen(!isOpenDialog);
  };

  const OnChangeInput = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const gerarError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  async function validar(navigation) {
    Keyboard.dismiss();
    let error = false;
    Object.keys(inputs).forEach(function (input) {
      if (!inputs[input]) {
        error = true;
        gerarError("* Campo obrigatório", input);
      }
    });
    if (!error) {
      await Axios.post("http://localhost:8080/eventos/cadastrar", inputs)
        .then((response) => {
          Toast.show("Evento cadastrado com sucesso", Toast.LONG);
          navigation.navigate("ListaDeEventos", { login: login, refresh: true });
        })
        .catch((error) => {
          Toast.show("Erro ao cadastrar evento", Toast.LONG);
          console.log(login)
          console.log(inputs)
          navigation.navigate("ListaDeEventos", { login: login, refresh: true });
          console.log(error);
        });
      
    }
  }

  return (
    <View style={styles.principal}>
      <View style={[styles.alignItemsCenter, styles.mt25]}>
        <Image
          source={require("../assets/img/logo.jpg")}
          style={styles.logoImage}
        />
        <Text style={[styles.white, styles.logoText]}>Cadastro de evento</Text>
      </View>

      <ScrollView>
        <View>
          <View style={[styles.formLogin]}>
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.titulo}
              placeholder="Titulo"
              onChangeText={(text) => OnChangeInput(text, "titulo")}
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.data}
              placeholder="Data"
              onChangeText={(text) => OnChangeInput(text, "data")}
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.rua}
              placeholder="Rua"
              onChangeText={(text) => OnChangeInput(text, "rua")}
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.numero}
              placeholder="Numero da casa"
              onChangeText={(text) => OnChangeInput(text, "numero")}
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.bairro}
              placeholder="Bairro"
              onChangeText={(text) => OnChangeInput(text, "bairro")}
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.cidade}
              placeholder="Cidade"
              onChangeText={(text) => OnChangeInput(text, "cidade")}
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.estado}
              placeholder="Estado"
              onChangeText={(text) => OnChangeInput(text, "estado")}
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.details}
              placeholder="Detalhes do evento"
              onChangeText={(text) => OnChangeInput(text, "details")}
            />

            <Dialog isVisible={isOpenDialog} onBackdropPress={toggleDialog}>
              <Dialog.Title title={dialogTitle} />
              <Text>{dialogText}</Text>
            </Dialog>
            <View style={[styles.groupHomeButtons, styles.fRowSpaceAround]}>
              <Button
                style={styles.mt25}
                title="Cadastrar"
                buttonStyle={{
                  borderColor: "#f4f4f4",
                  backgroundColor: "#f4f4f4",
                  borderRadius: 3,
                }}
                containerStyle={{
                  width: 100,
                }}
                titleStyle={{ color: "grey" }}
                onPress={() => validar(navigation)}
              />
              <Button
                style={styles.mt25}
                title="Cancelar"
                buttonStyle={{
                  borderColor: "#f4f4f4",
                  backgroundColor: "#f4f4f4",
                  borderRadius: 3,
                }}
                containerStyle={{
                  width: 100,
                }}
                titleStyle={{ color: "grey" }}
                onPress={() => navigation.navigate("ListaDeEventos")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
