import React, { useState, useEffect } from "react";
import {
  Container,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from "native-base";
import { StyleSheet, Text } from "react-native";

import * as Font from "expo-font";

const CartItem = (props) => {
  const data = props.item.item;
  const [quantity, setQuantity] = useState(props.item.item.quantity);

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }))();
  }, []);

  return (
    <ListItem style={styles.listItem} key={Math.random()} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: data.product.image
              ? data.product.image
              : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
          }}
        />
      </Left>

      <Body style={styles.body}>
        <Left>
          <Text>{data.product.name}</Text>
        </Left>

        <Right>
          <Text>$ {data.product.price}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
});

export default CartItem;
