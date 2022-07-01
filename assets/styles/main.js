import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1f1c32",
    alignItems: "center",
    justifyContent: "center",
  },

  width100: {
    width: 100,
  },

  logoImage: {
    width: 300,
    height: 100,
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

  pb100: {
    paddingBottom: 100,
  },

  formLogin: {
    height: 150,
    width: 300,
    paddingTop: 10,
  },
});

export default styles;
