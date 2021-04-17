import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Text,
} from "react-native";
import { Left, Right, ListItem, Thumbnail, Body } from "native-base";

import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseURL";

import * as Font from "expo-font";

import AsyncStorage from "@react-native-async-storage/async-storage";

var { height, width } = Dimensions.get("window");

const Confirm = (props) => {
  const confirm = props.route.params;
  const [token, setToken] = useState();

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }))();
  }, []);

  const ConfirmOrder = () => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const order = confirm.order.order;
    console.log(order);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(`${baseURL}orders`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Place order success",
            text2: "",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
          }, 500);
        }
      })
      .catch((err) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>

        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            {/* Shipping detail */}
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {confirm.order.order.address}</Text>
              <Text>Phone: {confirm.order.order.phone}</Text>
              <Text>Time start: {confirm.order.order.timeStart}</Text>
              <Text>Time end: {confirm.order.order.timeEnd}</Text>
            </View>

            {/* Detail Cart */}
            <Text style={styles.title}>Items:</Text>
            {props.cartItems.map((e) => {
              return (
                <ListItem style={styles.listItem} key={e.product.name} avatar>
                  <Left>
                    <Thumbnail
                      source={{
                        uri: e.product.image
                          ? e.product.image
                          : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
                      }}
                    />
                  </Left>

                  <Body style={styles.body}>
                    <Left>
                      <Text>{e.product.name}</Text>
                    </Left>

                    <Right>
                      <Text>$ {e.product.price}</Text>
                    </Right>
                  </Body>
                </ListItem>
              );
            })}
          </View>
        ) : null}

        <View style={{ alignItems: "center", margin: 20 }}>
          <Button title="Place Order" onPress={ConfirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.25,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (product) => dispatch(actions.removeFromCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
