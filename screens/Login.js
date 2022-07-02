import React, { useState } from "react";
import { Text, View } from "react-native";
import { Input, Button, Image, Dialog } from "react-native-elements";
import styles from "../assets/styles/main";

const users = [
    { login: "dyego", pw: "123" },
    { login: "root", pw: "root" },
];

function Login({navigation }) {
    const [isOpenDialog, setDialogOpen] = useState(false);
    const [login, setLogin] = useState("");
    const [pw, setPw] = useState("");

    const toggleDialog = () => {
        setDialogOpen(!isOpenDialog);
    };

    const CheckPw = (login, pw, navigation) => {
        if (users.some(u => u.login === login && u.pw == pw)) {
            navigation.navigate("Home");
        }else{
            toggleDialog();
        }
    }

    return (
        <View style={[styles.principal, styles.pb100]}>
            <View>
                <Image
                    source={require("../assets/logo.jpg")}
                    style={styles.logoImage}
                />
            </View>
            <View style={styles.formLogin}>
                <Input style={styles.white} placeholder="E-mail" onChangeText={(login) => setLogin(login)} />
                <Input
                    style={[styles.mt10, styles.white]}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={(pw) => setPw(pw)}
                />
                <Dialog
                    isVisible={isOpenDialog}
                    onBackdropPress={toggleDialog}
                >
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



export default Login;
