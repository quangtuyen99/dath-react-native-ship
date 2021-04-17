import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import CartItem from "./CartItem";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import AuthGlobal from "../../Context/store/AuthGlobal";

var { width } = Dimensions.get("window");

import * as Font from "expo-font";

const Cart = (props) => {
  const context = useContext(AuthGlobal);

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }))();
  }, []);

  let total = 0;
  for (var i = 0; i < props.cartItems.length; i++) {
    total += props.cartItems[i].product.price;
  }

  return (
    //React Fragment

    <>
      {props.cartItems.length > 0 ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          <SwipeListView
            // listKey={+Math.floor(Math.random() * 1000)}
            data={props.cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => {
                    props.removeFromCart(data.item);
                  }}
                >
                  <Icon name="trash" color="white" size={30} />
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={75}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            tension={40}
            friction={1000}
            rightOpenValue={-75}
            stopLeftSwipe={75}
          />

          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>Total: ${total}</Text>
            </Left>

            <Right style={{ marginRight: 20 }}>
              <EasyButton medium danger onPress={() => props.clearCart()}>
                <Text style={{ color: "white" }}>Clear</Text>
              </EasyButton>
            </Right>

            <Right style={{ marginRight: 20 }}>
              {context.stateUser.isAuthenticated ? (
                <EasyButton
                  onPress={() => props.navigation.navigate("Checkout")}
                  medium
                  primary
                >
                  <Text style={{ color: "white" }}>Checkout</Text>
                </EasyButton>
              ) : (
                <EasyButton
                  onPress={() =>
                    props.navigation.navigate("User", { screen: "Cart" })
                  }
                  medium
                  secondary
                >
                  <Text style={{ color: "white" }}>Login</Text>
                </EasyButton>
              )}
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Your cart is empty</Text>
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  bottomContainer: {
    left: 10,
    bottom: 10,
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "white",
  },
  price: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (product) => dispatch(actions.removeFromCart(product)),
  };
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
