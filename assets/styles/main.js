import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    principal: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#1f1c32",
        alignItems: "center",
        justifyContent: "center",
    },

    listaDeEventos:{
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#1f1c32",
    },

    logoText:{
        fontSize: 24,
        fontWeight: "600",
        marginTop: -8,
        marginBottom: 10,
    },

    noMarginBottom:{
        marginBottom: 0,
    },

    width100: {
        width: 100,
    },

    logoImage: {
        width: 300,
        height: 100,
    },

    eventoLogo: {
        width: 300,
        height: 130,
    },

    homeButton: {
        backgroundColor: "#f4f4f4",
        borderRadius: 3,
    },

    groupHomeButtons: {
        height: 150,
        width: 250,
        paddingTop: 10,
    },

    fRowSpaceAround: {
        flexDirection: "row",
        justifyContent: "space-around",
    },

    grey: {
        color: "grey",
    },

    white: {
        color: "white",
    },

    pb100: {
        paddingBottom: 100,
    },

    formLogin: {
        alignItems: "center",
        width: 300,
        paddingTop: 10,
    },

    mt10: {
        marginTop: 10,
    },

    mt25: {
        marginTop: 25,
    },

    loginError: {
        flexDirection: "column",
        backgroundColor: "#1f1c32",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        height: 40,
        backgroundColor: "red",
    },

    fontBold: {
        fontWeight: "500",
    },

    dNone: {
        display: "none",
    }
});

export default styles;
