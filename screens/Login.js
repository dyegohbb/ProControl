import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import styles from "../assets/styles/main";

function Login({ route, navigation }) {
  const { error } = route.params;
  const [login, setLogin] = useState("");
  const [pw, setPw] = useState("");

  return (
    <View style={[styles.principal, styles.pb100]}>
      <View style={!error ? stylesOld.A : stylesOld.B}>
        <Text>ERRO DE LOGIN</Text>
      </View>
      <View>
        <Image
          source={require("../assets/logo.jpg")}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.formLogin}>
        <Input placeholder="E-mail" onChangeText={(login) => setLogin(login)} />
        <Input
          style={{ marginTop: 10 }}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(pw) => setPw(pw)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
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
            onPress={() => CheckPw(login, pw, navigation)}
          />
        </View>
      </View>
      <View style={{ backgroundColor: "aqua", alignItems: "center" }}></View>
    </View>
  );
}

function CheckPw(login, pw, navigation) {
  users.forEach((user) => {
    if (user.login == login && user.pw == pw) {
      navigation.navigate("UserList");
    } else {
      navigation.navigate("Login", { error: true });
    }
  });
}

const stylesOld = StyleSheet.create({
  A: { display: "none" },
  B: { display: "flex" },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default Login;
