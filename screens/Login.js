import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Icon, Input, Button } from "react-native-elements";

const users = [{login: 'dyego', pw: '123'}, {login: 'root', pw: 'root'}]

function Login ({route, navigation}) {
  const {error}=route.params;
  const [login, setLogin] = useState('');
  const [pw, setPw] = useState('');

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "collumn",
          backgroundColor: "#dce9e7",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 100,
        }}
      >
        <View style={!error ? styles.A : styles.B}>
          <Text>ERRO DE LOGIN</Text>
        </View>
        <View style={{ alignItems: "center", paddingTop: 50 }}>
          <Icon
            style={{}}
            raised
            size={60}
            name="alien-outline"
            type="material-community"
            color="grey"
          />
        </View>
        <View style={{ height: 150, width: 300, paddingTop: 10 }}>
          <Input placeholder="E-mail" onChangeText={login => setLogin(login)} />
          <Input style={{ marginTop: 10 }} placeholder="Senha" secureTextEntry={true} onChangeText={pw => setPw(pw)} />
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15 }}>
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


function CheckPw(login, pw, navigation){
  users.forEach(user => {
    if(user.login == login && user.pw == pw){
      navigation.navigate('UserList')
    }else{
      navigation.navigate('Login', {error: true})
    }
  });
}

const styles = StyleSheet.create({
  A: { display:"none" }, 
  B:{ display:"flex" },
  container: {
    flex: 1,
    backgroundColor: "#000",
  }
});

export default Login;