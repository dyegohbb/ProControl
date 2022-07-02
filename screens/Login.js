import React, { useState } from "react";
import { Text, View } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import styles from "../assets/styles/main";

const users = [
    { login: "dyego", pw: "123" },
    { login: "root", pw: "root" },
];

function Login({ route, navigation }) {
    const { error } = route.params;
    const [login, setLogin] = useState("");
    const [pw, setPw] = useState("");

    return (
        <View style={[styles.principal, styles.pb100]}>
            <View style={error ? styles.loginError : styles.dNone}>
                {error == true ? (
                    <Text style={styles.fontBold}>ERRO DE LOGIN</Text>
                ) : (
                    <Text></Text>
                )}
            </View>
            <View>
                <Image
                    source={require("../assets/logo.jpg")}
                    style={styles.logoImage}
                />
            </View>
            <View style={styles.formLogin}>
                <Input style={styles.white} placeholder="E-mail" onChangeText={(login) => setLogin(login)} />
                <Input
                    style={[styles.mt10,styles.white]}
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
            navigation.navigate("Home");
        } else {

            navigation.navigate("Login", { error: true });
        }
    });
}

export default Login;
