import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import CadastroEmpresa from "./screens/CadastroEmpresa";
import CadastroPromotor from "./screens/CadastroPromotor.js";
import ListaDeEventos from "./screens/ListaDeEventos.js";
import Evento from "./screens/Evento"
import CadastroLoginSenha from "./screens/CadastroLoginSenha.js";
import CadastroEvento from "./screens/CadastroEvento.js"

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroEmpresa"
          component={CadastroEmpresa}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroPromotor"
          component={CadastroPromotor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListaDeEventos"
          component={ListaDeEventos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Evento"
          component={Evento}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroLoginSenha"
          component={CadastroLoginSenha}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroEvento"
          component={CadastroEvento}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
