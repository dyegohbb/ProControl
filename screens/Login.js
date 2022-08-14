import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Input, Button, Image, Dialog } from "react-native-elements";
import styles from "../assets/styles/main";
import Axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Login({ route, navigation }) {
  const [isOpenDialog, setDialogOpen] = useState(false);
  const [inputs, setInputs] = useState({
    login: "",
    pw: "",
  });
  const [errors, setErrors] = useState({});
  const[type, setType] = useState('');

  useEffect(() => {
    if (route.params) {
      const { type } = route.params;
      setType(type);
    }else{
      navigation.navigate('Home')
    }
  }, []);

  const OnChangeInput = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const gerarError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const toggleDialog = () => {
    setDialogOpen(!isOpenDialog);
  };

  async function CheckPw(inputs, navigation) {
    let error = false;
    Object.keys(inputs).forEach(function (input) {
      if (!inputs[input]) {
        error = true;
        gerarError("* Campo obrigatório", input);
      }
    });

    if (!error) {
      if(type == 'empresa'){
        await Axios.post("http://192.168.0.200:8080/api/v1/auth/empresa", {
          login: inputs.login,
          password: inputs.pw,
        })
          .then((response) => {
            navigation.navigate("ListaDeEventos", {
              login: response.data,
              refresh: true,
              type: "empresa"
            });
          })
          .catch((error) => {
            toggleDialog();
          });
      } else if(type == 'promotor'){
        await Axios.post("http://192.168.0.200:8080/api/v1/auth/promotor", {
          login: inputs.login,
          password: inputs.pw,
        })
          .then((response) => {
            navigation.navigate("ListaDeEventos", {
              login: response.data,
              refresh: true,
              type: "promotor"
            });
          })
          .catch((error) => {
            toggleDialog();
          });
      }
    }
  }

  return (
    <View style={[styles.eventoPrincipal]}>
      <TouchableOpacity
        style={[styles.mt50, styles.mStart20]}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={30}
          color="white"
        />
      </TouchableOpacity>
      <View style={styles.principal}>
      <View>
        <Image
          source={require("../assets/img/logo.jpg")}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.formLogin}>
        <Input
          style={styles.white}
          errorMessage={errors.login}
          placeholder="E-mail"
          onChangeText={(text) => OnChangeInput(text, "login")}
        />
        <Input
          errorMessage={errors.pw}
          style={[styles.mt10, styles.white]}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(text) => OnChangeInput(text, "pw")}
        />
        <Dialog isVisible={isOpenDialog} onBackdropPress={toggleDialog}>
          <Dialog.Title title="Erro de Login" />
          <Text>E-mail ou senha incorreto.</Text>
        </Dialog>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <View style={[styles.groupHomeButtons, styles.fRowSpaceAround]}>
            <Button
              title="Entrar"
              buttonStyle={{
                borderColor: "#f4f4f4",
                backgroundColor: "#f4f4f4",
                borderRadius: 3,
              }}
              containerStyle={{
                width: 100,
              }}
              titleStyle={{ color: "grey" }}
              onPress={() => CheckPw(inputs, navigation)}
            />
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: "aqua", alignItems: "center" }}></View>
      </View>
    </View>
  );
}

export default Login;
