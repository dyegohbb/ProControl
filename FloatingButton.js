import React, { Component } from 'react'
import { View, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Feather, MaterialIcons, AntDesign, Fontisto } from '@expo/vector-icons';



export default class FloatingButton extends Component {

  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 10,
      useNativeDriver: false
    }).start();

    this.open = !this.open;
  };

  render() {
    const usersStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -240]
          })
        }
      ]
    };

    const eventStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -180]
          })
        }
      ]
    };

    const refreshStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -120]
          })
        }
      ]
    };

    const logoutStyle = {
      transform: [
        {rotateY: '180deg'},
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -60]
          })
        }
      ]
    };

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 2],
            outputRange: ["0deg", "450deg"]
          })
        }
      ]
    };

    const opacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1]
    })

    return (
      <View style={[styles.container, this.props.position]}>
        <Animated.View style={[styles.button, styles.secondary, usersStyle, opacity]}>
          <TouchableOpacity onPress={this.props.onPressUsers}>
            <Feather name="users" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.button, styles.secondary, eventStyle, opacity]}>
          <TouchableOpacity onPress={this.props.onPressEvent}>
            <MaterialIcons name="event" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.button, styles.secondary, refreshStyle, opacity]}>
          <TouchableOpacity onPress={this.props.onPressRefresh}>
            <Fontisto name="spinner-refresh" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.button, styles.secondary, logoutStyle, opacity]}>
          <TouchableOpacity onPress={this.props.onPressLogout}>
            <AntDesign name="logout" size={20} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <AntDesign name="plus" size={24} color="#FFF" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: "absolute",
  },

  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#9262a3",
    shadowOpacity: 0.5,
    shadowOffset: { height: 10 }
  },

  menu: {
    backgroundColor: "#18093F",
  },

  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: "#18093F"
  }
});
