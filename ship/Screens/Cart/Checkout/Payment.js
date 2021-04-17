import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import {
  Container,
  Header,
  Content,
  ListItem,
  Radio,
  Right,
  Left,
  Picker,
  Icon,
  Body,
  Title,
} from "native-base";

import * as Font from "expo-font";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallets", value: 1 },
  { name: "Visa", value: 2 },
  { name: "Master Card", value: 3 },
  { name: "Others", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }))();
  }, []);

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <Container>
      <Header>
        <Body>
          <Title>Choose your Payment method</Title>
        </Body>
      </Header>

      <Content>
        {methods.map((item, index) => {
          return (
            <ListItem onPress={() => setSelected(item.value)} key={item.name}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected == item.value} />
              </Right>
            </ListItem>
          );
        })}

        {selected == 3 ? (
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            headerStyle={{
              backgroundColor: "orange",
            }}
            headerBackButtonTextStyle={{ color: "#fff" }}
            headerTitleStyle={{ color: "#fff" }}
            selectedValue={card}
            onValueChange={(e) => setCard(e)}
          >
            {paymentCards.map((item, index) => {
              return (
                <Picker.Item
                  label={item.name}
                  key={item.name}
                  value={item.name}
                />
              );
            })}
          </Picker>
        ) : null}

        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            title="Confirm"
            onPress={() => {
              props.navigation.navigate("Confirm", { order });
            }}
          />
        </View>
      </Content>
    </Container>
  );
};

export default Payment;
