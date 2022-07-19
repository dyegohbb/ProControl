import React, { useState, useEffect } from "react";
import { Keyboard, ScrollView } from "react-native";
import { View } from "react-native";
import { Input, Button, Image, Dialog, Text } from "react-native-elements";
import styles from "../assets/styles/main";
import Axios from "axios";
import MaskInput, {Masks} from "react-native-mask-input";

export default function CadastroPromotor({ route, navigation }) {
  const [isOpenDialog, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [empresa, setEmpresa] = useState({});
  const [login, setLogin] = useState("");
  const [inputs, setInputs] = useState({
    cpf: "",
    nome: "",
    telefone: "",
    email: "",
    cep: "",
    end: "",
  });
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    if(route.params){
      const { empresa } = route.params;
      const { login } = route.params;

      setEmpresa(empresa);
      setLogin(login);
      console.log(login)
      console.log(empresa)
    }else{
      setDialogText("OPS! Tivemos um problema, contate um administrador do sistema.");
      setDialogTitle("Problemas no carregamento")
      toggleDialog();
    }

  }, []);

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
      navigation.navigate("CadastroLoginSenha", {
        tipo: "promotor",
        campos: inputs,
        empresa: empresa,
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
        <Text style={[styles.white, styles.logoText]}>Cadastro de promotor</Text>
      </View>
      <ScrollView>
        <View style={[styles.formLogin]}>
          <MaskInput
            style={[styles.mt10, styles.white]}
            errorMessage={errors.cpf}
            value={inputs.cpf}
            onChangeText={(text) => OnChangeInput(text, "cpf")}
            mask={Masks.BRL_CPF}
          />
          <Input
            style={[styles.mt10, styles.white]}
            errorMessage={errors.nome}
            placeholder="Nome"
            onChangeText={(text) => OnChangeInput(text, "nome")}
          />
         <MaskInput
              style={[styles.mt10, styles.white]}
              errorMessage={errors.telefone}
              value={inputs.telefone}
              onChangeText={(text) => OnChangeInput(text, "telefone")}
              mask={Masks.BRL_PHONE}
            />
          <Input
            style={[styles.mt10, styles.white]}
            errorMessage={errors.email}
            placeholder="Email"
            onChangeText={(text) => OnChangeInput(text, "email")}
          />
          <MaskInput
            style={[styles.mt10, styles.white]}
            errorMessage={errors.cep}
            value={inputs.cep}
            onChangeText={(text) => OnChangeInput(text, "cep")}
            mask={Masks.ZIP_CODE}
          />
          <Input
            style={[styles.mt10, styles.white]}
            errorMessage={errors.end}
            placeholder="Endereço"
            onChangeText={(text) => OnChangeInput(text, "end")}
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
              onPress={() => navigation.navigate("ListaDeEventos", { login: login, refresh: false})}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
