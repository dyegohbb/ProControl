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
                    var token = response;
                    Axios.get("http://localhost:8080/getEmpresa", { login: inputs.login }, getAxiosConfig())
                        .then((res) => {
                            navigation.navigate("ListaDeEventos", res, token)
                        })
                })
                .catch((error) => {
                    //REMOVER COMENTÁRIO (APENAS MOCK)
                    // toggleDialog();
                    let response = {
                        cnpj: '74.473.067/0001-80',
                        razao: 'Top Taylor Industria e Comercio LTDA',
                        telefone: '1131336700',
                        email: 'mara@cbandeirantes.com.br',
                        cep: '06268110',
                        end: 'AV Lourenco Belloli N 901, Parque Industrial Mazzei, Osasco - SP ',
                        representante: 'RICARDO TETUYA FUJIHARA',
                    }
                    let token2 = "_PL<MNBVCXZ1q2w3e!"
                    navigation.navigate("ListaDeEventos", response, token2)
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
