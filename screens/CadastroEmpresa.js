import React, { useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import { View } from "react-native";
import { Text, Input, Button, Image, Dialog } from "react-native-elements";
import styles from "../assets/styles/main";
import Axios from "axios";
import { TextInputMask } from "react-native-masked-text";

const codigoDeCadastro = "abc";

export default function CadastroEmpresa({ navigation }) {
  const [isOpenDialog, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [cod, setCod] = useState("");
  const [inputs, setInputs] = React.useState({
    cnpj: "",
    razao: "",
    telefone: "",
    email: "",
    cep: "",
    end: "",
    representante: "",
  });
  const [errors, setErrors] = useState({});

  const toggleDialog = () => {
    setDialogOpen(!isOpenDialog);
  };

  const OnChangeInput = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const gerarError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    console.log(errors)
  };

  async function validar(navigation) {
    Keyboard.dismiss();
    let error = false;
    if (!cod) {
      error = true;
      gerarError("* Campo obrigatório", "cod");
    }
    Object.keys(inputs).forEach(function (input) {
      if (!inputs[input]) {
        error = true;
        gerarError("* Campo obrigatório", input);
      }
    });
    if (!error) {
      if (codigoDeCadastro != cod) {
        setErrors({});
        setDialogTitle("Codigo de cadastro");
        setDialogText(
          "É necessário um código válido para estar completando o cadastro, solicite o código a um administrador do sistema."
        );
        toggleDialog();
      } else {
        navigation.navigate("CadastroLoginSenha", {
          tipo: "empresa",
          campos: inputs,
        });
      }
    }
  }

  return (
    <View style={styles.principal}>
      <View style={[styles.alignItemsCenter, styles.mt25]}>
        <Image
          source={require("../assets/img/logo.jpg")}
          style={styles.logoImage}
        />
        <Text style={[styles.white, styles.logoText]}>Cadastro de empresa</Text>
      </View>

      <ScrollView>
        <View>
          <View style={[styles.formLogin]}>
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.cod}
              placeholder="Código de cadastro"
              secureTextEntry={true}
              onChangeText={(cod) => setCod(cod)}
            />
            <TextInputMask
              style={[styles.mt10, styles.greyInput, styles.maskedInput]}
              type={"cnpj"}
              error
              value={inputs.cnpj}
              placeholder="CNPJ"
              onChangeText={(text) => OnChangeInput(text, "cnpj")}
              placeholderTextColor="#6a7280"
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.razao}
              placeholder="Razão Social"
              onChangeText={(text) => OnChangeInput(text, "razao")}
            />
            <TextInputMask
              style={[styles.mt10, styles.greyInput, styles.formLogin, styles.maskedInput]}
              type={"cel-phone"}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) ",
              }}
              errorMessage={errors.telefone}
              value={inputs.telefone}
              placeholder=" Telefone"
              onChangeText={(text) => OnChangeInput(text, "telefone")}
              placeholderTextColor="#6a7280"
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.email}
              placeholder="Email"
              onChangeText={(text) => OnChangeInput(text, "email")}
            />
            <TextInputMask
              style={[styles.mt10, styles.greyInput, styles.formLogin, styles.maskedInput]}
              type={"zip-code"}
              errorMessage={errors.cep}
              placeholder=" CEP"
              value={inputs.cep}
              onChangeText={(text) => OnChangeInput(text, "cep")}
              placeholderTextColor="#6a7280"
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.end}
              placeholder="Endereço"
              onChangeText={(text) => OnChangeInput(text, "end")}
            />
            <Input
              style={[styles.mt10, styles.white]}
              errorMessage={errors.representante}
              placeholder="Representante"
              onChangeText={(text) => OnChangeInput(text, "representante")}
            />
            <Dialog isVisible={isOpenDialog} onBackdropPress={toggleDialog}>
              <Dialog.Title title={dialogTitle} />
              <Text>{dialogText}</Text>
            </Dialog>
            <View style={[styles.groupHomeButtons, styles.fRowSpaceAround]}>
              <Button
                style={styles.mt25}
                title="Próximo"
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
      </ScrollView>
    </View>
  );
}
