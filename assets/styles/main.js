import { Row } from "native-base";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({

    fontSize20: { fontSize: 20 },

    fontSize15: { fontSize: 15 },

    alignItemsCenter: { alignItems: "center" },

    zindex1: {zIndex: 1},

    noMarginBottom: { marginBottom: 0 },

    mb20: { marginBottom: 20 },

    mb4: { marginBottom: 4 },

    mEnd20: { marginEnd: 20 },

    mEnd10: { marginEnd: 10 },

    mEnd50: { marginEnd: 50 },

    mStart20: { marginStart: 20 },

    mStart10: { marginStart: 10 },

    mStart50: { marginStart: 50 },

    width100: { width: 100 },

    grey: { color: "grey" },

    greyInput: { color: "#6a7280" },

    white: { color: "white" },

    pb100: { paddingBottom: 100 },

    mt10: { marginTop: 10 },

    mt4: { marginTop: 4 },

    mt25: { marginTop: 25 },

    mt50: { marginTop: 50 },

    fontBold: { fontWeight: "500" },

    dNone: { display: "none" },

    maskedInput:{
        width: 283,
        fontSize: 17,
        borderBottomColor:  '#6a7280',
        borderBottomWidth: 1.5,
        marginBottom: 15
    },
    
    maskinput: {
        fontSize: 45
    },

    principal: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#1f1c32",
        alignItems: "center",
        justifyContent: "center",
    },

    listaDeEventos: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#1f1c32",
    },

    eventoPrincipal: {
        backgroundColor: "#1f1c32",
        flex: 1,
        flexDirection: "column"
      },

    logoText: {
        fontSize: 25,
        fontWeight: "600",
        marginTop: -8,
        marginBottom: 10,
    },

    logoImage: {
        width: 300,
        height: 100,
    },

    eventoLogo: {
        width: 300,
        height: 130,
    },

    eventoImage: {
        width: 350,
        height: 200,
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

    fRowSpaceBtw: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },

    fRowSpaceCenter: {
        flexDirection: "column",
        justifyContent: "center",
    },

    formLogin: {
        alignItems: "center",
        width: 300,
        paddingTop: 10,
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

    eventCard: {
        backgroundColor: "#292542",
        alignItems: "center",
        padding: 5,
        borderRadius: 15
    },

    eventScrollBody: {
        marginVertical: 10,
        marginHorizontal: 20,
        marginTop: 0
    },

    footer:{
        borderTopWidth: 1,
        paddingTop: 5,
        borderTopColor: "white",
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: "space-around"
    },

    iconsFooter:{
        flexDirection: 'column',
        alignItems: "center"
    }

});

export default styles;
