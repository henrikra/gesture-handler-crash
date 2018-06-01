import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { PanGestureHandler } from "react-native-gesture-handler";

export default class App extends Component {
  scrollX = new Animated.Value(0);

  onPanGestureEvent = ({ nativeEvent }) => {
    this.scrollX.setValue(nativeEvent.translationX);
  };

  render() {
    return (
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={this.onPanGestureEvent}>
          <View>
            <Animated.Text
              style={{
                transform: [{ translateX: this.scrollX }],
                backgroundColor: "red"
              }}
            >
              Swipe this to right
            </Animated.Text>
          </View>
        </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  },
});
