import React, { useState, useEffect } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text, Input, Button, Image, Dialog } from "react-native-elements";
import styles from "../assets/styles/main";
import Axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CadastroLoginSenha({ route, navigation }) {
  const [isOpenDialog, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [tipo, setTipo] = useState("");
  const [empresa, setEmpresa] = useState({
    cnpj: "",
    razao: "",
    telefone: "",
    email: "",
    cep: "",
    end: "",
    representante: "",
  });
  const [promotor, setPromotor] = useState({
    cpf: "",
    nome: "",
    telefone: "",
    email: "",
    cep: "",
    end: "",
  });
  const [inputs, setInputs] = useState({
    login: "",
    senha: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (route.params) {
      const { tipo } = route.params;
      const { campos } = route.params;
      const { empresa } = route.params;
      if (tipo == "empresa") {
        setEmpresa(campos);
      } else if (tipo == "promotor") {
        setPromotor(campos);
        setEmpresa(campos);
      }
      setTipo(tipo);
    }
  }, []);

  const voltar = () => {
    if(tipo == "empresa"){
      navigation.navigate("CadastroEmpresa")
    } else if(tipo == "promotor"){
      navigation.navigate("CadastroPromotor")
    } else{
      navigation.navigate("Home")
    }
  }
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
    setErrors({});

    if (inputs.senha.length < 8) {
      error = true;
      gerarError("* Min. 8 caracteres", "senha");
    }

    if (inputs.login.length < 5) {
      error = true;
      gerarError("* Min. 5 caracteres", "login");
    }

    Object.keys(inputs).forEach(function (input) {
      if (!inputs[input]) {
        error = true;
        gerarError("* Campo obrigatório", input);
      }
    });

    if (!error) {
      let cadastro = {};
      let url = "http://localhost:8080/";
      if (tipo == "empresa") {
        cadastro = {
          login: inputs.login,
          senha: inputs.senha,
        };
        url = url + "empresa/cadastro";
      } else if (tipo == "promotor") {
        cadastro = {
          login: inputs.login,
          senha: inputs.senha,
          promotor: promotor,
          empresa: empresa,
        };
        url = url + "promotor/cadastro";
      }
      await Axios.post(url, cadastro)
        .then((response) => {
          navigation.navigate("Login");
        })
        .catch((error) => {
          setDialogTitle("Erro");
          setDialogText(
            "OOPS! Ocorreu algum erro ao cadastrar " +
              tipo +
              ", entre em contato com um administrador do sistema."
          );
          toggleDialog();
          console.log(error);
        });
    }
  }

  return (
    <View style={styles.eventoPrincipal}>
      <TouchableOpacity
        style={[styles.mt50, styles.mStart20]}
        onPress={() => voltar()}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={30}
          color="white"
        />
      </TouchableOpacity>
      <View style={styles.principal}>
        <View style={[styles.alignItemsCenter, styles.mt25]}>
          <Image
            source={require("../assets/img/logo.jpg")}
            style={styles.logoImage}
          />
          <Text style={[styles.white, styles.logoText]}>
            Preencha seu login e senha
          </Text>
        </View>
        <View style={[styles.formLogin]}>
          <Input
            style={[styles.mt10, styles.white]}
            errorMessage={errors.login}
            placeholder="Login"
            onChangeText={(text) => OnChangeInput(text, "login")}
          />
          <Input
            style={[styles.mt10, styles.white]}
            errorMessage={errors.senha}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={(text) => OnChangeInput(text, "senha")}
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
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
