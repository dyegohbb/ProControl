import React from "react";
import { View } from "react-native";
import { Button, Image } from "react-native-elements";
import styles from "../assets/styles/main";

export default function Home({ navigation }) {
  return (
    <View style={styles.principal}>
      <View>
        <Image
          source={require("../assets/img/logo.jpg")}
          style={styles.logoImage}
        />
      </View>
      <View style={[styles.groupHomeButtons, styles.fRowSpaceAround]}>
        <Button
          title="Entrar"
          buttonStyle={styles.homeButton}
          containerStyle={styles.width100}
          titleStyle={styles.grey}
          onPress={() =>
            navigation.navigate("Login")
          }
        />
        <Button
          title="Cadastrar"
          buttonStyle={styles.homeButton}
          containerStyle={styles.width100}
          titleStyle={styles.grey}
          onPress={() => navigation.navigate("CadastroEmpresa")}
        />
      </View>
    </View>
  );
}
