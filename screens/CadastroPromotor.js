import React, { useState } from "react";
import { Keyboard } from "react-native";
import { View } from "react-native";
import { Input, Button, Image, Dialog, Text } from "react-native-elements";
import styles from "../assets/styles/main";
import Axios from "axios";

export default function CadastroPromotor({ route, navigation }) {
    const [isOpenDialog, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogText, setDialogText] = useState('');
    const [inputs, setInputs] = useState({
        cpf: '',
        nome: '',
        telefone: '',
        email: '',
        cep: '',
        end: '',
    });
    const [errors, setErrors] = React.useState({});

    const toggleDialog = () => {
        setDialogOpen(!isOpenDialog);
    };

    const OnChangeInput = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))
    }

    const gerarError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    };

    async function validar(navigation) {
        Keyboard.dismiss();
        let error = false;
        Object.keys(inputs).forEach(function (input) {
            if (!inputs[input]) {
                error = true;
                gerarError('* Campo obrigatório', input)
            }
        })
        if (!error) {
            await Axios.post("http://localhost:8080/criarPromotor", inputs)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    setDialogTitle('Erro')
                    setDialogText('OOPS! Ocorreu algum erro ao cadastrar promotor, entre em contato com um administrador do sistema.')
                    toggleDialog();
                    console.log(error);
                });
        }
    }

    return (
        <View style={styles.principal}>
            <View>
                <Image
                    source={require("../assets/logo.jpg")}
                    style={styles.logoImage}
                />
            </View>
            <View style={[styles.formLogin]}>
                <Input style={[styles.mt10, styles.white]} errorMessage={errors.cpf} placeholder="CPF" onChangeText={text => OnChangeInput(text, 'cpf')} />
                <Input style={[styles.mt10, styles.white]} errorMessage={errors.nome} placeholder="Nome" onChangeText={text => OnChangeInput(text, 'nome')} />
                <Input style={[styles.mt10, styles.white]} errorMessage={errors.telefone} placeholder="Telefone" onChangeText={text => OnChangeInput(text, 'telefone')} />
                <Input style={[styles.mt10, styles.white]} errorMessage={errors.email} placeholder="Email" onChangeText={text => OnChangeInput(text, 'email')} />
                <Input style={[styles.mt10, styles.white]} errorMessage={errors.cep} placeholder="CEP" onChangeText={text => OnChangeInput(text, 'cep')} />
                <Input style={[styles.mt10, styles.white]} errorMessage={errors.end} placeholder="Endereço" onChangeText={text => OnChangeInput(text, 'end')} />
                <Dialog
                    isVisible={isOpenDialog}
                    onBackdropPress={toggleDialog}
                >
                    <Dialog.Title title={dialogTitle} />
                    <Text>{dialogText}</Text>
                </Dialog>
                <View style={[styles.groupHomeButtons, styles.fRowSpaceAround]}>
                    <Button
                        style={styles.mt25}
                        title="Cadastrar"
                        buttonStyle={{
                            borderColor: "#f4f4f4",
                            backgroundColor: "#f4f4f4",
                            borderRadius: 3,
                        }}
                        containerStyle={{
                            width: 100,
                        }}
                        titleStyle={{ color: "grey" }}
                        onPress={() => validar(navigation)}
                    />
                    <Button
                        style={styles.mt25}
                        title="Cancelar"
                        buttonStyle={{
                            borderColor: "#f4f4f4",
                            backgroundColor: "#f4f4f4",
                            borderRadius: 3,
                        }}
                        containerStyle={{
                            width: 100,
                        }}
                        titleStyle={{ color: "grey" }}
                        onPress={() => navigation.navigate("Home")}
                    />
                </View>
            </View>
        </View>
    );
}
