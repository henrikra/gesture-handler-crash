import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default class App extends Component {
  state = {
    isLoading: false
  };

  componentDidMount() {
    // this.setState({isLoading: true}) // uncomment this line to get the app crashing
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <Swipeable renderRightActions={() => null}>
            <Text>Terve</Text>
          </Swipeable>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:  50,
  },
});
