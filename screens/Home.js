import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Input, Button, Image } from "react-native-elements";

function Login({ navigation }) {
  return (
    <View
      style={style.principal}
    >
      <View>
        <Image
          source={require('../assets/logo.jpg')}
          style={{ width: 300, height: 100 }}
        />
      </View>
      <View style={{ height: 150, width: 300, paddingTop: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Entrar"
            buttonStyle={{
              borderColor: "#f5f4f4",
              backgroundColor: "#f4f4f4",
              borderRadius: 3,
            }}
            containerStyle={{
              width: 100,
              marginHorizontal: 10,
              marginVertical: 10,
              marginLeft: 40,
            }}
            titleStyle={{ color: "grey" }}
            onPress={() => navigation.navigate('Login',
              {
                error: false,
              }
            )}
          />
          <Button
            title="Cadastrar"
            buttonStyle={{
              backgroundColor: "#f4f4f4",
              borderRadius: 3,
            }}
            containerStyle={{
              width: 100,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
            titleStyle={{ color: "grey" }}
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
      <View style={{ backgroundColor: "aqua", alignItems: "center" }}></View>
    </View>
  );
}

const style = StyleSheet.create({
  principal: {
    flex: 1,
    flexDirection: "collumn",
    backgroundColor: "#1f1c32",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
});


export default Login;