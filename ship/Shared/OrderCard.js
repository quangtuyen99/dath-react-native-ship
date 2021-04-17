import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";

import baseURL from "../assets/common/baseURL";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const codes = [
  {
    name: "Pending",
    code: "3",
  },
  {
    name: "Ship",
    code: "2",
  },
  {
    name: "Completed",
    code: "1",
  },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (props.status == "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("Pending");
      setCardColor("#E74C3C");
    } else if (props.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("Ship");
      setCardColor("#F1C40F");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("Completed");
      setCardColor("#2ECC71");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      phone: props.city,
      dateOrder: props.dateOrder,
      id: props._id,
      orderItems: props.orderItems,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props._id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order update Successfull",
            text2: "",
          });
          setTimeout(() => {
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
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      <View style={styles.container}>
        <Text>Order: #{props._id}</Text>
      </View>

      <View style={{ marginTop: 10, borderRadius: 50 }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>Address: {props.address}</Text>
        <Text>Phone: {props.phone}</Text>
        <Text>Time Start: {props.timeStart}</Text>
        <Text>Time End: {props.timeEnd}</Text>
        <Text>Date ordered: {props.dateOrder.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>${props.totalPrice}</Text>
        </View>

        {props.editMode ? (
          <View>
            <Picker
              mode="dropdown"
              iosIcon={<Icon color="#007aff" name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={statusChange}
              placeholder="Change status"
              placeholderIconColor={"#007aff"}
              onValueChange={(e) => {
                setStatusChange(e);
              }}
            >
              {codes.map((e) => {
                return (
                  <Picker.Item label={e.name} value={e.code} key={e.code} />
                );
              })}
            </Picker>
            <EasyButton secondary medium onPress={() => updateOrder()}>
              <Text style={{ color: "white" }}>Update</Text>
            </EasyButton>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 50,
  },
  title: {
    backgroundColor: "#62B16F",
    padding: 5,
  },
  priceContainer: {
    alignSelf: "flex-end",
    marginTop: 10,
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderCard;
