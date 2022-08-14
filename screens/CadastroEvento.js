import React, { useState, useEffect } from "react";
import { Keyboard, ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import { Text, Input, Button, Image, Dialog } from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../assets/styles/main";
import Axios from "axios";
import Toast from '../SimpleToast';
import axios from "axios";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const codigoDeCadastro = "abc";

export default function CadastroEvento({ route, navigation }) {
  const [isOpenDialog, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [login, setLogin] = useState({});
  const [isPromotorfetched, setPromotorFetched] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [eventoId, setEventoId] = useState("");
  const [promotores, setPromotores] = useState([
    { label: '', value: '' }
])
  const [inputs, setInputs] = useState({
    titulo: "",
    rua: "",
    numero: "",
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
    details: "",
    codigoPromotor: "",
  });
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const [dateView, setDateView] = useState(new Date());
  const[evento, setEvento] = useState({});
  const[promotor, setPromotor] = useState({});

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate)
    let dateFormatada = currentDate.getDate().toString().padStart(2, "0") + "/" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "/" + currentDate.getFullYear()
    setDateView(dateFormatada);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  let editar = false;
  useEffect(() => {
    if (route.params) {
        const { login } = route.params;
        const { edit } = route.params;
        const { evento } = route.params;

        let dateFormatada = dateView.getDate().toString().padStart(2, "0") + "/" + (dateView.getMonth() + 1).toString().padStart(2, "0") + "/" + dateView.getFullYear()
        
        setDateView(dateFormatada)
        setEvento(evento);
        setEdit(edit)
        setLogin(login);
        fetchPromotores(login.codigoEmpresa);
        if(edit){
          updateInputs(evento)
        }
       
      }
  }, [])
  
  const updateInputs = async (evento) => {
    let i = {};

    i.rua = evento.rua
    i.titulo = evento.titulo
    i.numero = evento.numero
    i.cep = evento.cep
    i.bairro = evento.bairro
    i.cidade = evento.cidade
    i.estado = evento.estado
    i.details = evento.details
    i.codigoPromotor = evento.codigoPromotor
    console.log(evento)
    setEventoId(evento.id)
    setInputs(i)
  }

  const fetchPromotores = async (codigo) =>{
    await axios.get("http://192.168.0.200:8080/api/v1/promotores/" + codigo).then(response => {
      let tempPromotores = [];
      response.data.forEach(promotor => {
        let tempPromotor = {
          label: promotor.nome,
          value: promotor.codigoPromotor
        }
        tempPromotores.push(tempPromotor);
      })
      
      setPromotores(tempPromotores)
      setPromotorFetched(true)
    })
  }

  const toggleDialog = () => {
    setDialogOpen(!isOpenDialog);
  };

  const OnChangeInput = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const gerarError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  async function validar(navigation) {
    Keyboard.dismiss();
    let error = false;
    Object.keys(inputs).forEach(function (input) {
      if (!inputs[input]) {
        error = true;
        gerarError("* Campo obrigatório", input);
      }
    });
    if (!error) {
      let endereco = {
        cep: inputs.cep,
        rua: inputs.rua,
        numero: inputs.numero,
        bairro: inputs.bairro,
        cidade: inputs.bairro,
        estado: inputs.estado,
      }
      
      let cadastro ={
        codigoEmpresa: login.codigoEmpresa,
        codigoPromotor: inputs.codigoPromotor,
        titulo: inputs.titulo,
        endereco: endereco,
        imgEmpresa: "url",
        data: dateView,
        detalhe: inputs.details
      }
      if(isEdit){
        await Axios.put("http://192.168.0.200:8080/api/v1/evento/empresa/" + eventoId, cadastro)
        .then((response) => {
          Toast.show("Evento cadastrado com sucesso", Toast.LONG);
          navigation.navigate("ListaDeEventos", { login: login, refresh: true });
        })
        .catch((error) => {
          Toast.show("Erro ao cadastrar evento", Toast.LONG);
          console.log(error);
        });
      }else{
        await Axios.post("http://192.168.0.200:8080/api/v1/evento/empresa", cadastro)
        .then((response) => {
          Toast.show("Evento cadastrado com sucesso", Toast.LONG);
          navigation.navigate("ListaDeEventos", { login: login, refresh: true });
        })
        .catch((error) => {
          Toast.show("Erro ao cadastrar evento", Toast.LONG);
          console.log(error);
        });
      }
      setErrors({})
    }
  }

  return (
    <View style={styles.principal}>
      <View style={[styles.alignItemsCenter, styles.mt25]}>
        <Image
          source={require("../assets/img/logo.jpg")}
          style={styles.logoImage}
        />
        <Text style={[styles.white, styles.logoText]}>Cadastro de evento</Text>
      </View>

      <ScrollView>
        <View>
          <View style={[styles.formLogin]}>
            <Input
              value={inputs.titulo}
              style={[styles.mt10, styles.white]}
              errorMessage={errors.titulo}
              placeholder="Titulo"
              onChangeText={(text) => OnChangeInput(text, "titulo")}
            />
            <Input
              value={inputs.cep}
              style={[styles.mt10, styles.white]}
              errorMessage={errors.cep}
              placeholder="CEP"
              onChangeText={(text) => OnChangeInput(text, "cep")}
            />
            <Input
            value={inputs.rua}
              style={[styles.mt10, styles.white]}
              errorMessage={errors.rua}
              placeholder="Rua"
              onChangeText={(text) => OnChangeInput(text, "rua")}
            />
            <Input
              value={inputs.numero}
              style={[styles.mt10, styles.white]}
              errorMessage={errors.numero}
              placeholder="Numero da casa"
              onChangeText={(text) => OnChangeInput(text, "numero")}
            />
            <Input
              value={inputs.bairro}
              style={[styles.mt10, styles.white]}
              errorMessage={errors.bairro}
              placeholder="Bairro"
              onChangeText={(text) => OnChangeInput(text, "bairro")}
            />
            <Input
              value={inputs.cidade}
              style={[styles.mt10, styles.white]}
              errorMessage={errors.cidade}
              placeholder="Cidade"
              onChangeText={(text) => OnChangeInput(text, "cidade")}
            />
            <Input
              value={inputs.estado}
              style={[styles.mt10, styles.white]}
              errorMessage={errors.estado}
              placeholder="Estado"
              onChangeText={(text) => OnChangeInput(text, "estado")}
            />
            <Input
              value={inputs.details}
              style={[styles.mt10, styles.white]}
              errorMessage={errors.details}
              placeholder="Detalhes do evento"
              onChangeText={(text) => OnChangeInput(text, "details")}
            />
            {isPromotorfetched &&
            <RNPickerSelect
            style={pickerSelectStyles}
            errorMessage={errors.codigoPromotor}
            placeholder={{ label: "Selecione o promotor", value: "" }}
            onValueChange={(text) => OnChangeInput(text, "codigoPromotor")}
            items={promotores}
            />}
            <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
              <Text style={{color: 'red'}}>selected: {dateView.toLocaleString()}</Text>
            </View>
           

            <Dialog isVisible={isOpenDialog} onBackdropPress={toggleDialog}>
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
                onPress={() => navigation.navigate("ListaDeEventos", {
                  login:login,
                  refresh: true,
                  type: "empresa"
                })}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
      marginTop: 0,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'grey',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
});
