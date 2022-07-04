import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Input, Button, Image, Dialog } from "react-native-elements";
import styles from "../assets/styles/main";
import Axios from "axios";

function Login({ navigation }) {
    const [isOpenDialog, setDialogOpen] = useState(false);
    const [inputs, setInputs] = useState({
        login: '',
        pw: '',
    });
    const [errors, setErrors] = useState({});

    const OnChangeInput = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))
    }

    const gerarError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    };

    const toggleDialog = () => {
        setDialogOpen(!isOpenDialog);
    };

    const getAxiosConfig = () => {
        let axiosConfig = {
            headers: {
                'token': token,
            }
        };
        return axiosConfig;
    }

    async function CheckPw(inputs, navigation) {
        let error = false;
        Object.keys(inputs).forEach(function (input) {
            if (!inputs[input]) {
                error = true;
                gerarError('* Campo obrigatório', input)
            }
        })

        if (!error) {
            await Axios.post("http://localhost:8080/login", {
                login: inputs.login,
                password: inputs.pw,
            })
                .then((response) => {
                    //response = token (string igual a de baixo)
                    var token2 = "_PL<MNBVCXZ1q2w3e!";
                    navigation.navigate("ListaDeEventos", inputs.login, token2)
                })
                .catch((error) => {
                    toggleDialog();
                });
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
                <Input style={styles.white} errorMessage={errors.login} placeholder="E-mail" onChangeText={text => OnChangeInput(text, 'login')} />
                <Input
                    errorMessage={errors.pw}
                    style={[styles.mt10, styles.white]}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={text => OnChangeInput(text, 'pw')}
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
                        onPress={() => CheckPw(inputs, navigation)}
                    />
                </View>
            </View>
            <View style={{ backgroundColor: "aqua", alignItems: "center" }}></View>
        </View>
    );
}



export default Login;
