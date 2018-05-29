/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Button,
  ActivityIndicator
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

let idCounter = 0;

export default class App extends Component {
  state = {
    data: [{ id: idCounter++ }, { id: idCounter++ }],
    isLoading: false
  };

  scrollY = new Animated.Value(0);

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
        onPress={() => null}
      >
        <Text style={styles.actionText} numberOfLines={1}>
          {swipeAction.label}
        </Text>
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
    <View style={styles.paymentMethodItemWrapper}>
      <Swipeable renderRightActions={this.createRenderRightActions(item)}>
        <View style={styles.paymentMethodItem}>
          <View style={styles.paymentMethodItemInfo}>
            <Text style={styles.paymentMethodItemName}>Terve {item.id}</Text>
          </View>
        </View>
      </Swipeable>
    </View>
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
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button title="Add More" onPress={this.addMore} />
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <AnimatedFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
              {
                useNativeDriver: true
              }
            )}
            scrollEventThrottle={1}
            keyExtractor={this.keyExtractor}
            style={styles.list}
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
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  list: {
    backgroundColor: "red"
  },
  container: {
    flex: 1,
    backgroundColor: "#ccc"
  },
  spinner: {
    marginTop: 100
  },
  paymentMethods: {
    paddingTop: 70
  },
  paymentMethodItemWrapper: {
    backgroundColor: "#ffffff"
  },
  paymentMethodItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15
  },
  paymentMethodItemLeftIcon: {
    marginRight: 15
  },
  paymentMethodItemInfo: {
    flex: 1
  },
  paymentMethodItemName: {
    fontSize: 14
  },
  separator: {
    backgroundColor: "#ccc",
    height: StyleSheet.hairlineWidth
  },
  noteAboutProvider: {
    fontSize: 10,
    textAlign: "center",
    padding: 12,
    color: "#ccc"
  },
  addPaymentMethodButton: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15
  },
  swipeActions: { width: rightActionsWidth, flexDirection: "row" },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  actionText: {
    backgroundColor: "transparent",
    padding: 12,
    color: "#000"
  },
  rightActionContainer: {
    flex: 1
  },
  emptyList: {
    textAlign: "center",
    paddingVertical: 15,
    backgroundColor: "#ffffff"
  }
});
