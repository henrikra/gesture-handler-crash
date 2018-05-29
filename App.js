import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  Animated
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

let idCounter = 0;

export default class App extends Component {
  state = {
    data: [{ id: idCounter++ }, { id: idCounter++ }],
    isLoading: false
  };

  componentDidMount() {
    // this.setState({isLoading: true}) // uncomment this line to get the app crashing
  }

  remove = id => {
    this.setState({ data: this.state.data.filter(lol => lol.id !== id) });
  };

  renderRightAction = (swipeAction, progress, index, paymentMethod) => (
    <Animated.View
      key={paymentMethod.id}
      style={[
        styles.rightActionContainer,
        {
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [rightActionsWidth - index * rightActionWidth, 0]
              })
            }
          ]
        }
      ]}
    >
      <RectButton
        style={[styles.rightAction, { backgroundColor: swipeAction.color }]}
        onPress={() => this.remove(paymentMethod.id)}
      >
        <Text>{swipeAction.label}</Text>
      </RectButton>
    </Animated.View>
  );

  renderRightActions = (progress, paymentMethod) => (
    <View style={styles.swipeActions}>
      {swipeActions.map((swipeAction, index) =>
        this.renderRightAction(swipeAction, progress, index, paymentMethod)
      )}
    </View>
  );

  createRenderRightActions = item => progress =>
    this.renderRightActions(progress, item);

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => (
    <Swipeable renderRightActions={this.createRenderRightActions(item)}>
      <Text>Terve {item.id}</Text>
    </Swipeable>
  );

  addMore = () => {
    this.setState({ isLoading: true });

    setTimeout(() => {
      this.setState({
        data: [...this.state.data, { id: idCounter++ }],
        isLoading: false
      });
    }, 500);
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Add More" onPress={this.addMore} />
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        )}
      </View>
    );
  }
}

const swipeActions = [{ label: "hello", color: "red" }];

const rightActionWidth = 80;
const rightActionsWidth = rightActionWidth * swipeActions.length;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  swipeActions: { width: rightActionsWidth, flexDirection: "row" },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  rightActionContainer: {
    flex: 1
  }
});
