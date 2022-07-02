import React, { useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import { View } from "react-native";
import { Text, Input, Button, Image, Dialog } from "react-native-elements";
import styles from "../assets/styles/main";


const codigoDeCadastro = "_PL<MNBVCXZ1q2w3e!"

export default function CadastroEmpresa({ navigation }) {
    const [isOpenDialog, setDialogOpen] = useState(false);

    const [cod, setCod] = useState('');
    const [inputs, setInputs] = useState({
        cnpj: '',
        razao: '',
        telefone: '',
        email: '',
        cep: '',
        end: '',
        representante: '',
    });
    const [errors, setErrors] = React.useState({
        cnpj: '',
    });

    const toggleDialog = () => {
        setDialogOpen(!isOpenDialog);
    };

    const OnChangeInput = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))
    }

    const gerarError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    };

    const validar = (navigation) => {
        Keyboard.dismiss();
        let error = false;
        if(!cod){
            error = true
            gerarError('* Campo obrigatório', 'cod')
        }
        Object.keys(inputs).forEach(function (input) {
            if (!inputs[input]) {
                error = true;
                gerarError('* Campo obrigatório', input)
            }
        })
        if (!error) {
            if (codigoDeCadastro != cod) {
                setErrors({});
                toggleDialog();
            }
            //FETCH 
            // navigation.navigate("Home")
        }
    }

    return (
        <ScrollView>
            <View style={styles.principal}>
                <View style={{marginTop: 40}}>
                    <Image
                        source={require("../assets/logo.jpg")}
                        style={styles.logoImage}
                    />
                </View>
                <View style={[styles.formLogin]}>
                    <Input style={[styles.mt10, styles.white]} errorMessage={errors.cod} placeholder="Código de cadastro" secureTextEntry={true} onChangeText={(cod) => setCod(cod)} />
                    <Input style={[styles.mt10, styles.white]} errorMessage={errors.cnpj} placeholder="CNPJ" onChangeText={text => OnChangeInput(text, 'cnpj')} />
                    <Input style={[styles.mt10, styles.white]} errorMessage={errors.razao} placeholder="Razão Social" onChangeText={text => OnChangeInput(text, 'razao')} />
                    <Input style={[styles.mt10, styles.white]} errorMessage={errors.telefone} placeholder="Telefone" onChangeText={text => OnChangeInput(text, 'telefone')} />
                    <Input style={[styles.mt10, styles.white]} errorMessage={errors.email} placeholder="Email" onChangeText={text => OnChangeInput(text, 'email')} />
                    <Input style={[styles.mt10, styles.white]} errorMessage={errors.cep} placeholder="CEP" onChangeText={text => OnChangeInput(text, 'cep')} />
                    <Input style={[styles.mt10, styles.white]} errorMessage={errors.end} placeholder="Endereço" onChangeText={text => OnChangeInput(text, 'end')} />
                    <Input style={[styles.mt10, styles.white]} errorMessage={errors.representante} placeholder="Representante" onChangeText={text => OnChangeInput(text, 'representante')} />
                    <Dialog
                        isVisible={isOpenDialog}
                        onBackdropPress={toggleDialog}
                    >
                        <Dialog.Title title="Codigo de cadastro" />
                        <Text>É necessário um código válido para estar completando o cadastro, solicite o código a um administrador do sistema.</Text>
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
            </View >
        </ScrollView>
    );
}
