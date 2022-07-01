import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Image } from "react-native-elements";
import styles from "../assets/styles/main";

export default function Login({ navigation }) {
  return (
    <View style={styles.principal}>
      <View>
        <Image
          source={require("../assets/logo.jpg")}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.groupHomeButtons}>
        <View style={styles.fRowSpaceAround}>
          <Button
            title="Entrar"
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
            title="Cadastrar"
            buttonStyle={styles.homeButton}
            containerStyle={styles.width100}
            titleStyle={styles.grey}
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </View>
  );
}
